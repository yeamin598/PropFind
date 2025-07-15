import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import Property from '@/app/models/property.model';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, message: 'Not authenticated' }, { status: 401 });
    }
    await dbConnect();
    const propertyId = params.id;
    const body = await request.json();
    // Find property and check ownership
    const property = await Property.findById(propertyId);
    if (!property) {
      return NextResponse.json({ success: false, message: 'Property not found' }, { status: 404 });
    }
    if (property.owner && property.owner.toString() !== session.user.id) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 403 });
    }
    // Update fields
    if (body.title !== undefined) property.title = body.title;
    if (body.price !== undefined) property.price = body.price;
    if (body.description !== undefined) property.description = body.description;
    // Add more fields as needed
    await property.save();
    return NextResponse.json({ success: true, property });
  } catch (error) {
    console.error('Update property error:', error);
    return NextResponse.json({ success: false, message: 'Failed to update property' }, { status: 500 });
  }
} 