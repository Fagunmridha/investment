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
    const body = await request.json()
    const parsed = signupSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid signup data' }, { status: 400 })
    }

    const { fullName, email, password, phoneNumber } = parsed.data

    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    })

    if (existingUser) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 409 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        fullName,
        email: email.toLowerCase(),
        password: hashedPassword,
        phoneNumber,
      },
    })

    return NextResponse.json(
      {
        userId: user.id,
        message: 'Signup step completed',
      },
      { status: 201 },
    )
  } catch (error) {
    console.error('Signup error', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

