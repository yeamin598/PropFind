import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import User from '@/app/models/user.model';
import path from 'path';
import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, message: 'Not authenticated' }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get('photo') as File;
    const type = formData.get('type');
    
    if (!file || !(file instanceof Blob)) {
      return NextResponse.json({ success: false, message: 'No file uploaded' }, { status: 400 });
    }
    if (type !== 'profile' && type !== 'cover') {
      return NextResponse.json({ success: false, message: 'Invalid type' }, { status: 400 });
    }

    // Create uploads directory if it doesn't exist
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');

    console.log('Current working directory:', process.cwd());
    console.log('Calculated upload directory:', uploadDir);

    try {
      await fs.access(uploadDir);
    } catch {
      await fs.mkdir(uploadDir, { recursive: true });
    }

    // Generate unique filename
    const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    const filename = `${uuidv4()}.${ext}`;
    const filePath = path.join(uploadDir, filename);

    // Save file
    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(filePath, buffer);

    console.log('File saved to path:', filePath);

    // Update user in database
    await connectDB();
    const url = `/uploads/${filename}`;

    console.log('Generated URL:', url);
    console.log('User ID from session:', session.user.id);
    console.log('Update type:', type);

    const update = type === 'profile' ? { profilePhoto: url } : { coverPhoto: url };
    console.log('Database update object:', update);
    
    const user = await User.findByIdAndUpdate(
      session.user.id,
      { $set: update },
      { new: true }
    ).select('-password');

    console.log('Updated user from database:', {
      id: user?._id,
      profilePhoto: user?.profilePhoto,
      coverPhoto: user?.coverPhoto
    });

    if (!user) {
      // If user not found, delete the uploaded file
      await fs.unlink(filePath).catch(console.error);
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ 
      success: true, 
      url,
      user: {
        profilePhoto: user.profilePhoto,
        coverPhoto: user.coverPhoto
      }
    });
  } catch (error) {
    console.error('Error uploading photo:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to upload photo' },
      { status: 500 }
    );
  }
} 
