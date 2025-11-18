import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID required' },
        { status: 400 }
      )
    }

    // TODO: Query wallet from database
    const wallet = {
      balance: 12500,
      totalEarnings: 9880,
    }

    return NextResponse.json(wallet, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch wallet' },
      { status: 500 }
    )
  }
}
