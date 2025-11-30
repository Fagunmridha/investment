import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

const farmUpdateSchema = z.object({
  name: z.string().min(3).optional(),
  category: z.string().min(1).optional(),
  description: z.string().optional(),
  location: z.string().optional(),
  owner: z.string().optional(),
  roi: z.number().min(0).max(100).optional(),
  durationMonths: z.number().int().min(1).optional(),
  targetFunding: z.number().min(0).optional(),
  riskLevel: z.string().optional(),
  imageUrl: z.string().optional(),
  status: z.string().optional(),
})

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const maxRetries = 3
    let farm = null

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        farm = await prisma.farm.findUnique({
          where: { id },
        })
        break
      } catch (error: any) {
        if (
          (error?.code === 'P1001' || error?.message?.includes("Can't reach database server")) &&
          attempt < maxRetries
        ) {
          await new Promise((resolve) => setTimeout(resolve, 1000 * attempt))
          continue
        }
        throw error
      }
    }

    if (!farm) {
      return NextResponse.json(
        { error: 'Farm not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(farm, { status: 200 })
  } catch (error: any) {
    console.error('Error fetching farm:', error)
    return NextResponse.json(
      { error: 'Failed to fetch farm' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const parsed = farmUpdateSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid farm data', details: parsed.error.issues },
        { status: 400 }
      )
    }

    const maxRetries = 3
    let farm = null
    let lastError: any

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        farm = await prisma.farm.update({
          where: { id },
          data: parsed.data,
        })
        break
      } catch (error: any) {
        lastError = error
        if (error?.code === 'P2025') {
          return NextResponse.json(
            { error: 'Farm not found' },
            { status: 404 }
          )
        }
        if (
          (error?.code === 'P1001' || error?.message?.includes("Can't reach database server")) &&
          attempt < maxRetries
        ) {
          await new Promise((resolve) => setTimeout(resolve, 1000 * attempt))
          continue
        }
        throw error
      }
    }

    if (!farm) {
      throw lastError || new Error('Failed to update farm')
    }

    return NextResponse.json(
      { message: 'Farm updated successfully', farm },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Error updating farm:', error)
    
    if (error?.code === 'P1001') {
      return NextResponse.json(
        { error: 'Database connection failed. Please try again.' },
        { status: 503 }
      )
    }

    return NextResponse.json(
      { error: error?.message || 'Failed to update farm' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const maxRetries = 3
    let farm = null
    let lastError: any

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        farm = await prisma.farm.delete({
          where: { id },
        })
        break
      } catch (error: any) {
        lastError = error
        if (error?.code === 'P2025') {
          return NextResponse.json(
            { error: 'Farm not found' },
            { status: 404 }
          )
        }
        if (
          (error?.code === 'P1001' || error?.message?.includes("Can't reach database server")) &&
          attempt < maxRetries
        ) {
          await new Promise((resolve) => setTimeout(resolve, 1000 * attempt))
          continue
        }
        throw error
      }
    }

    if (!farm) {
      throw lastError || new Error('Failed to delete farm')
    }

    return NextResponse.json(
      { message: 'Farm deleted successfully' },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Error deleting farm:', error)
    
    if (error?.code === 'P1001') {
      return NextResponse.json(
        { error: 'Database connection failed. Please try again.' },
        { status: 503 }
      )
    }

    return NextResponse.json(
      { error: error?.message || 'Failed to delete farm' },
      { status: 500 }
    )
  }
}

