import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('images') as File[];
    
    if (!files || files.length === 0) {
      return NextResponse.json(
        { success: false, message: 'No files uploaded' },
        { status: 400 }
      );
    }

    const uploadDir = join(process.cwd(), 'public', 'uploads');
    const urls = await Promise.all(
      files.map(async (file) => {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        
        // Generate unique filename
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        const filename = `${uniqueSuffix}-${file.name}`;
        const filepath = join(uploadDir, filename);
        
        // Save file
        await writeFile(filepath, buffer);
        
        // Return public URL
        return `/uploads/${filename}`;
      })
    );

    return NextResponse.json({
      success: true,
      urls,
      message: 'Files uploaded successfully'
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to upload files' },
      { status: 500 }
    );
  }
} 