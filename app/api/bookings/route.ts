import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Booking from '@/lib/models/Booking';
import { sendAdminNotification, sendClientConfirmation } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    
    const booking = await Booking.create(body);
    
    // Send email notifications
    await Promise.all([
      sendAdminNotification(booking),
      sendClientConfirmation(booking),
    ]);
    
    return NextResponse.json(
      { success: true, data: booking, message: 'Booking created successfully' },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const bookings = await Booking.find({}).sort({ createdAt: -1 });
    
    return NextResponse.json(
      { success: true, data: bookings },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}