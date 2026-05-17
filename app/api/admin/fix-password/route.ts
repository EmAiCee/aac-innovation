import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import User from '@/lib/models/User';
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    await connectDB();
    
    // Find admin user
    const admin = await User.findOne({ email: 'algonimusa202@gmail.com' });
    
    if (!admin) {
      return NextResponse.json({ error: 'Admin not found' }, { status: 404 });
    }
    
    // Hash password directly
    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash('Mic2002.', salt);
    await admin.save();
    
    return NextResponse.json({ 
      success: true, 
      message: 'Admin password fixed successfully',
      email: admin.email 
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}