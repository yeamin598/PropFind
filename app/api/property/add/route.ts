import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import Property from '@/app/models/property.model';
import User from '@/app/models/user.model';

export async function POST(request: Request) {
  try {
    // Get the session using NextAuth.js
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Get user from database
    await dbConnect();
    const user = await User.findById(session.user.id);

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    // Get request body
    const body = await request.json();

    // Create new property
    const property = new Property({
      ...body,
      owner: user._id,
    });

    // Save property
    await property.save();

    return NextResponse.json({
      success: true,
      property,
      message: 'Property added successfully'
    });
  } catch (error) {
    console.error('Add property error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to add property' },
      { status: 500 }
    );
  }
} 