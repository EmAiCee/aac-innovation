import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('adminToken')?.value;
    
    if (!token) {
      return NextResponse.json(
        { valid: false, error: 'No token found' },
        { status: 401 }
      );
    }
    
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    return NextResponse.json({ 
      valid: true, 
      user: decoded 
    });
    
  } catch (error) {
    return NextResponse.json(
      { valid: false, error: 'Invalid token' },
      { status: 401 }
    );
  }
}