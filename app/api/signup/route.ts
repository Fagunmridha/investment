import { NextResponse } from 'next/server'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'

const signupSchema = z.object({
  fullName: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
  phoneNumber: z.string().min(8),
})

export async function POST(request: Request) {
  try {
    let body
    try {
      body = await request.json()
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      )
    }

    const parsed = signupSchema.safeParse(body)

    if (!parsed.success && parsed.error) {
     
      const errors = parsed.error.issues.map((err) => ({
        field: err.path.join('.') || 'unknown',
        message: err.message || 'Validation failed',
      }))

      
      const errorMessages = errors.map((e) => {
        const fieldName = e.field === 'fullName' ? 'Full name' : 
                         e.field === 'phoneNumber' ? 'Phone number' : 
                         e.field === 'email' ? 'Email' :
                         e.field === 'password' ? 'Password' :
                         e.field.charAt(0).toUpperCase() + e.field.slice(1)
        return `${fieldName}: ${e.message}`
      })

      return NextResponse.json(
        { 
          error: errorMessages.length > 0 ? errorMessages.join('. ') : 'Invalid signup data',
          details: errors 
        },
        { status: 400 }
      )
    }

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid signup data' },
        { status: 400 }
      )
    }

    const { fullName, email, password, phoneNumber } = parsed.data

   
    const maxRetries = 3
    let lastError: any
    let existingUser = null
    let user = null

    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        existingUser = await prisma.user.findUnique({
          where: { email: email.toLowerCase() },
        })
        break
      } catch (error: any) {
        lastError = error
        if (
          (error?.code === 'P1001' || error?.message?.includes("Can't reach database server")) &&
          attempt < maxRetries
        ) {
          console.warn(`Database connection attempt ${attempt} failed, retrying... (${attempt}/${maxRetries})`)
          await new Promise((resolve) => setTimeout(resolve, 1000 * attempt))
          continue
        }
        throw error
      }
    }

    if (existingUser) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 409 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

   
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        user = await prisma.user.create({
          data: {
            fullName,
            email: email.toLowerCase(),
            password: hashedPassword,
            phoneNumber,
          },
        })
        break
      } catch (error: any) {
        lastError = error
        if (
          (error?.code === 'P1001' || error?.message?.includes("Can't reach database server")) &&
          attempt < maxRetries
        ) {
          console.warn(`Database connection attempt ${attempt} failed, retrying... (${attempt}/${maxRetries})`)
          await new Promise((resolve) => setTimeout(resolve, 1000 * attempt))
          continue
        }
        throw error
      }
    }

    if (!user) {
      throw lastError || new Error('Failed to create user')
    }

    return NextResponse.json(
      {
        userId: user.id,
        message: 'Signup step completed',
      },
      { status: 201 },
    )
  } catch (error: any) {
    console.error('Signup error', error)
    
   
    if (error?.code === 'P1001' || error?.message?.includes("Can't reach database server")) {
      return NextResponse.json(
        { 
          error: 'Database connection failed. The database may be paused. Please try again in a few moments.' 
        },
        { status: 503 }
      )
    }

   
    if (error?.code?.startsWith('P')) {
      return NextResponse.json(
        { error: 'Database error occurred. Please try again.' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { error: error?.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

