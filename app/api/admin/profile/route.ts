import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import User from '@/lib/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this';

// GET - Get current admin profile
export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('adminToken')?.value;
    
    if (!token) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }
    
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    await connectDB();
    
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: user });
  } catch (error: any) {
    console.error('GET Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

// PUT - Update admin profile
export async function PUT(request: NextRequest) {
  try {
    const token = request.cookies.get('adminToken')?.value;
    
    if (!token) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }
    
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const body = await request.json();
    const { name, email, currentPassword, newPassword } = body;
    
    await connectDB();
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }
    
    // Update name and email
    if (name) user.name = name;
    if (email) user.email = email;
    
    // Update password if provided
    if (currentPassword && newPassword) {
      // Verify current password
      const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
      if (!isPasswordValid) {
        return NextResponse.json({ success: false, error: 'Current password is incorrect' }, { status: 400 });
      }
      
      // Hash new password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
    }
    
    // Save user
    await user.save();
    
    // Remove password from response
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    
    // Create new token with updated info
    const newToken = jwt.sign(
      { userId: user._id.toString(), email: user.email, role: user.role, name: user.name },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    const response = NextResponse.json({ success: true, data: userResponse });
    
    // Update cookie with new token
    response.cookies.set({
      name: 'adminToken',
      value: newToken,
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });
    
    return response;
  } catch (error: any) {
    console.error('PUT Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}