import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

const sendSchema = z.object({
  userId: z.string().cuid(),
})

const verifySchema = z.object({
  userId: z.string().cuid(),
  otp: z.string().length(6),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = sendSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }

    const { userId } = parsed.data

    const user = await prisma.user.findUnique({ where: { id: userId } })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000)

    await prisma.user.update({
      where: { id: userId },
      data: {
        otp,
        otpExpiresAt,
      },
    })

    // TODO: Integrate email/SMS provider to deliver OTP

    return NextResponse.json({ message: 'OTP generated', otpPreview: otp }, { status: 200 })
  } catch (error) {
    console.error('OTP send error', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json()
    const parsed = verifySchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }

    const { userId, otp } = parsed.data

    const user = await prisma.user.findUnique({ where: { id: userId } })

    if (!user || !user.otp || !user.otpExpiresAt) {
      return NextResponse.json({ error: 'OTP not found' }, { status: 404 })
    }

    if (user.otpExpiresAt.getTime() < Date.now()) {
      return NextResponse.json({ error: 'OTP expired' }, { status: 410 })
    }

    if (user.otp !== otp) {
      return NextResponse.json({ error: 'Invalid OTP' }, { status: 401 })
    }

    await prisma.user.update({
      where: { id: userId },
      data: {
        otp: null,
        otpExpiresAt: null,
      },
    })

    return NextResponse.json({ message: 'OTP verified' }, { status: 200 })
  } catch (error) {
    console.error('OTP verify error', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

