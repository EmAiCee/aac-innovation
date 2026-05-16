import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Portfolio from '@/lib/models/Portfolio';

// GET all portfolio items
export async function GET() {
  try {
    await connectDB();
    const items = await Portfolio.find({}).sort({ order: 1, createdAt: -1 });
    return NextResponse.json({ success: true, data: items });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

// POST new portfolio item
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    
    // Get highest order number
    const lastItem = await Portfolio.findOne().sort({ order: -1 });
    const newOrder = lastItem ? lastItem.order + 1 : 0;
    
    const item = await Portfolio.create({ ...body, order: newOrder });
    
    return NextResponse.json({ success: true, data: item }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}