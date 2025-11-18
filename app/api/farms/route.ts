import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // TODO: Query all farms from database
    const farms = [
      {
        id: 1,
        name: 'Green Valley Rice Farm',
        category: 'Crops',
        roi: 18.5,
        duration: '12 months',
        status: 'active',
      },
    ]

    return NextResponse.json(farms, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch farms' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const farmData = await request.json()

    // TODO: Validate farm data
    // TODO: Insert into database
    // TODO: Store farm images

    return NextResponse.json(
      { message: 'Farm created successfully', farmId: 'placeholder-id' },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create farm' },
      { status: 500 }
    )
  }
}
