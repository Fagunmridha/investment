import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

const farmSchema = z.object({
  name: z.string().min(3),
  category: z.string().min(1),
  description: z.string().optional(),
  location: z.string().optional(),
  owner: z.string().optional(),
  roi: z.number().min(0).max(100),
  durationMonths: z.number().int().min(1),
  targetFunding: z.number().min(0),
  riskLevel: z.string().optional(),
  imageUrl: z.string().optional(),
})

export async function GET(request: NextRequest) {
  try {
    const maxRetries = 3
    let farms = null

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        farms = await prisma.farm.findMany({
          orderBy: { createdAt: 'desc' },
        })
        break
      } catch (error: any) {
        if (
          (error?.code === 'P1001' || error?.message?.includes("Can't reach database server")) &&
          attempt < maxRetries
        ) {
          console.warn(`Database connection attempt ${attempt} failed, retrying...`)
          await new Promise((resolve) => setTimeout(resolve, 1000 * attempt))
          continue
        }
        throw error
      }
    }

    if (!farms) {
      return NextResponse.json(
        { error: 'Failed to fetch farms' },
        { status: 500 }
      )
    }

    return NextResponse.json(farms, { status: 200 })
  } catch (error: any) {
    console.error('Error fetching farms:', error)
    
    if (error?.code === 'P1001') {
      return NextResponse.json(
        { error: 'Database connection failed. Please try again.' },
        { status: 503 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to fetch farms' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = farmSchema.safeParse(body)

    if (!parsed.success) {
      const errors = parsed.error.issues.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
      }))

      return NextResponse.json(
        { error: 'Invalid farm data', details: errors },
        { status: 400 }
      )
    }

    const farmData = parsed.data

    const maxRetries = 3
    let farm = null
    let lastError: any

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        farm = await prisma.farm.create({
          data: {
            name: farmData.name,
            category: farmData.category,
            description: farmData.description || null,
            location: farmData.location || null,
            owner: farmData.owner || null,
            roi: farmData.roi,
            durationMonths: farmData.durationMonths,
            targetFunding: farmData.targetFunding,
            collectedAmount: 0,
            riskLevel: farmData.riskLevel || null,
            imageUrl: farmData.imageUrl || null,
            status: 'active',
          },
        })
        break
      } catch (error: any) {
        lastError = error
        if (
          (error?.code === 'P1001' || error?.message?.includes("Can't reach database server")) &&
          attempt < maxRetries
        ) {
          console.warn(`Database connection attempt ${attempt} failed, retrying...`)
          await new Promise((resolve) => setTimeout(resolve, 1000 * attempt))
          continue
        }
        throw error
      }
    }

    if (!farm) {
      throw lastError || new Error('Failed to create farm')
    }

    return NextResponse.json(
      { message: 'Farm created successfully', farm },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Error creating farm:', error)
    
    if (error?.code === 'P1001') {
      return NextResponse.json(
        { error: 'Database connection failed. Please try again.' },
        { status: 503 }
      )
    }

    return NextResponse.json(
      { error: error?.message || 'Failed to create farm' },
      { status: 500 }
    )
  }
}
