import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Service from '@/lib/models/Service';

// GET all services
export async function GET() {
  try {
    await connectDB();
    const services = await Service.find({}).sort({ order: 1, createdAt: 1 });
    return NextResponse.json({ success: true, data: services });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

// POST new service
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    
    // Get highest order number
    const lastService = await Service.findOne().sort({ order: -1 });
    const newOrder = lastService ? lastService.order + 1 : 0;
    
    const service = await Service.create({ ...body, order: newOrder });
    
    return NextResponse.json({ success: true, data: service }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}