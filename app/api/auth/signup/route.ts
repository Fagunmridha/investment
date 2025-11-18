import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { fullName, email, password, phoneNumber } = await request.json()

    // Validation
    if (!fullName || !email || !password || !phoneNumber) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // TODO: Hash password
    // TODO: Store in database
    // TODO: Create wallet entry
    // TODO: Send verification email

    return NextResponse.json(
      { 
        message: 'User created successfully',
        userId: 'placeholder-id'
      },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
