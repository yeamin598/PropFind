import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import User from '@/app/models/user.model';

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
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
    const user = await User.findByIdAndDelete(params.id);
    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Admin delete user error:', error);
    return NextResponse.json({ success: false, message: 'Failed to delete user' }, { status: 500 });
  }
} 