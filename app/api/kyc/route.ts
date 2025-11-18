import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { Buffer } from 'node:buffer'

const kycSchema = z.object({
  userId: z.string().cuid(),
  nid: z.string().min(6),
  address: z.string().min(6),
})

export async function POST(request: Request) {
  try {
    const formData = await request.formData()

    const rawData = {
      userId: formData.get('userId'),
      nid: formData.get('nid'),
      address: formData.get('address'),
    }

    const parsed = kycSchema.safeParse(rawData)

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid KYC payload' }, { status: 400 })
    }

    const file = formData.get('kycDocument') as File | null

    if (!file) {
      return NextResponse.json({ error: 'KYC document required' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const kycDocumentUrl = `data:${file.type};base64,${buffer.toString('base64')}`

    await prisma.user.update({
      where: { id: parsed.data.userId },
      data: {
        nid: parsed.data.nid,
        address: parsed.data.address,
        kycDocumentUrl,
        kycStatus: 'VERIFIED',
      },
    })

    return NextResponse.json({ message: 'KYC verified' }, { status: 200 })
  } catch (error) {
    console.error('KYC error', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

