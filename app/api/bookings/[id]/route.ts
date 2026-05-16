import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Booking from '@/lib/models/Booking';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const body = await request.json();
    const { id } = await params; // IMPORTANT: await the params Promise
    
    const booking = await Booking.findByIdAndUpdate(
      id,
      { ...body, updatedAt: new Date() },
      { new: true, returnDocument: 'after' } // Fixed mongoose warning
    );
    
    if (!booking) {
      return NextResponse.json({ success: false, error: 'Booking not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: booking });
  } catch (error: any) {
    console.error('Error updating booking:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params; // IMPORTANT: await the params Promise
    
    const booking = await Booking.findByIdAndDelete(id);
    
    if (!booking) {
      return NextResponse.json({ success: false, error: 'Booking not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, message: 'Booking deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting booking:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params; // IMPORTANT: await the params Promise
    
    const booking = await Booking.findById(id);
    
    if (!booking) {
      return NextResponse.json({ success: false, error: 'Booking not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: booking });
  } catch (error: any) {
    console.error('Error fetching booking:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}