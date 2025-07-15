import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import Property from '@/lib/models/property';
import { Types } from 'mongoose';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      );
    }

    await connectDB();
    
    // Try to create an ObjectId from the user ID if it's a valid hex string
    // let userIdQuery: any = session.user.id;
    // if (Types.ObjectId.isValid(session.user.id)) {
    //     userIdQuery = new Types.ObjectId(session.user.id);
    // }

    const properties = await Property.find({
      owner: session.user.id
    })
      .sort({ createdAt: -1 });

    return NextResponse.json({ success: true, properties });
  } catch (error) {
    console.error('Error fetching user properties:', error);
    // Check if the error is a CastError and provide a more specific message
    if (error instanceof Error && error.name === 'CastError') {
       return NextResponse.json(
          { success: false, message: 'Database query failed due to incorrect ID format.', error: error.message },
          { status: 500 }
        );
    }
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
} 