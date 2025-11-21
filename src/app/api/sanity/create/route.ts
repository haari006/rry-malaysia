import { writeClient } from '@/sanity/lib/client'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { _type, ...data } = body

    if (!_type) {
      return NextResponse.json(
        { error: 'Document type (_type) is required' },
        { status: 400 }
      )
    }

    // Create document in Sanity
    const result = await writeClient.create({
      _type,
      ...data,
    })

    return NextResponse.json({
      success: true,
      document: result,
    })
  } catch (error) {
    console.error('Error creating document:', error)
    return NextResponse.json(
      { error: 'Failed to create document', details: error },
      { status: 500 }
    )
  }
}
