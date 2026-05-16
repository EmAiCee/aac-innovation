'use client';

import { useState } from 'react';

export default function TestPage() {
  const [result, setResult] = useState('');

  const testBooking = async () => {
    setResult('Testing...');
    
    const testData = {
      fullName: 'Test User',
      email: 'test@email.com',
      phone: '1234567890',
      service: 'Web Design',
      preferredDate: '2025-01-15',
      message: 'This is a test'
    };

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testData)
      });
      
      const data = await res.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (error) {
      setResult('Error: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen p-8 pt-32">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Test Booking System</h1>
        <button 
          onClick={testBooking}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Test Booking
        </button>
        
        {result && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg">
            <pre className="whitespace-pre-wrap">{result}</pre>
          </div>
        )}
      </div>
    </div>
  );
}