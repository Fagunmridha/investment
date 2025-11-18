import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { userId, amount, bankAccountId } = await request.json()

    // Validation
    if (!userId || !amount || !bankAccountId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (amount < 100) {
      return NextResponse.json(
        { error: 'Minimum withdrawal is $100' },
        { status: 400 }
      )
    }

    // TODO: Check wallet balance
    // TODO: Create withdrawal request
    // TODO: Mark as pending
    // TODO: Send confirmation email

    return NextResponse.json(
      { message: 'Withdrawal request submitted', withdrawalId: 'placeholder-id' },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process withdrawal' },
      { status: 500 }
    )
  }
}
