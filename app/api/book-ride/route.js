import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

// Define the path for the bookings log file
const bookingsFilePath = path.join(process.cwd(), 'bookings.log');

export async function POST(request) {
  try {
    const body = await request.json();
    console.log('Received booking request:', body);

    // Basic validation
    const { pickup, dropoff, date, time, vehicle, user } = body;
    if (!pickup || !dropoff || !date || !time || !vehicle) {
      return NextResponse.json({ message: 'Missing required booking information.' }, { status: 400 });
    }

    // Prepare the data to be logged
    const bookingData = {
      timestamp: new Date().toISOString(),
      user: user || { email: 'N/A', uid: 'N/A' }, // Include user info if available
      pickup: pickup,
      dropoff: dropoff,
      date: date,
      time: time,
      vehicle: vehicle,
    };

    // Log the booking data to a file (append mode)
    try {
      await fs.appendFile(bookingsFilePath, JSON.stringify(bookingData) + '\n');
      console.log('Booking data saved to:', bookingsFilePath);
    } catch (error) {
      console.error('Error saving booking data to file:', error);
      // Decide if this should be a server error or still proceed
      // For now, we log the error but still return success to the client
    }

    // Respond to the client
    return NextResponse.json({ message: 'Booking received successfully!', data: bookingData }, { status: 200 });

  } catch (error) {
    console.error('Error processing booking request:', error);
    return NextResponse.json({ message: 'Internal Server Error processing booking.' }, { status: 500 });
  }
}

