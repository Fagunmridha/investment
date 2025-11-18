import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const status = request.nextUrl.searchParams.get('status') || 'pending'

    // TODO: Query withdrawal requests by status
    const withdrawals = []

    return NextResponse.json(withdrawals, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch withdrawals' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { withdrawalId, action } = await request.json()

    if (!withdrawalId || !action) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (!['approve', 'reject'].includes(action)) {
      return NextResponse.json(
        { error: 'Invalid action' },
        { status: 400 }
      )
    }

    // TODO: Update withdrawal status
    // TODO: If approve: process payment, update wallet
    // TODO: If reject: send notification
    // TODO: Create transaction log

    return NextResponse.json(
      { message: `Withdrawal ${action}ed successfully` },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process withdrawal' },
      { status: 500 }
    )
  }
}
