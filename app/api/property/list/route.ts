import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Property from '@/app/models/property.model';

export async function GET(request: Request) {
  try {
    await dbConnect();
    
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const type = searchParams.get('type');
    const limitParam = searchParams.get('limit');
    const limit = limitParam ? parseInt(limitParam) : undefined;
    
    // Build query
    const query: any = {};
    if (status && status !== 'featured') {
      query.listingType = status;
    }
    if (type) {
      query.propertyType = type;
    }
    
    // Fetch properties
    let propertyQuery = Property.find(query).sort({ createdAt: -1 }).populate('owner', 'name email');
    if (limit) {
      propertyQuery = propertyQuery.limit(limit);
    }
    const properties = await propertyQuery;
    
    console.log(`Found ${properties.length} properties`);
    
    // Log property types for debugging
    if (properties.length > 0) {
      console.log('Property types in database:');
      properties.forEach((prop, index) => {
        console.log(`  ${index + 1}. ${prop.title} - Type: ${prop.propertyType || 'MISSING'}`);
      });
    }
    
    // If no properties found with the filter, try without the type filter to see what exists
    if (properties.length === 0 && query.propertyType) {
      console.log('No properties found with type filter, checking all properties...');
      const allProperties = await Property.find({}).populate('owner', 'name email');
      console.log(`Total properties in database: ${allProperties.length}`);
      allProperties.forEach((prop, index) => {
        console.log(`  ${index + 1}. ${prop.title} - Type: ${prop.propertyType || 'MISSING'}`);
      });
    }
    
    return NextResponse.json({
      success: true,
      properties
    });
  } catch (error) {
    console.error('Fetch properties error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch properties', error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
} 