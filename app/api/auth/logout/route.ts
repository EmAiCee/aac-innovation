import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ 
    success: true, 
    message: 'Logged out successfully' 
  });
  
  // Delete the cookie
  response.cookies.delete('adminToken');
  
  return response;
}