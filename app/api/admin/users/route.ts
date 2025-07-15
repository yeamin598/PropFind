import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import User from '@/app/models/user.model';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, message: 'Not authenticated' }, { status: 401 });
    }
    await dbConnect();
    const adminUser = await User.findById(session.user.id);
    if (!(adminUser as any)?.isAdmin) {
      return NextResponse.json({ success: false, message: 'Not authorized' }, { status: 403 });
    }
    const users = await User.find({}, '-password');
    return NextResponse.json({ success: true, users });
  } catch (error) {
    console.error('Admin list users error:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch users' }, { status: 500 });
  }
} 