'use server'

import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import dbConnect from '@/lib/mongodb'
import Property, { IProperty } from '@/app/models/property.model'
import { Types } from 'mongoose'

export async function deleteProperty(propertyId: string) {
  try {
    // Get the session using NextAuth.js
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      console.error('No authenticated user found')
      return { success: false, message: 'Not authenticated' }
    }

    await dbConnect()

    // Convert propertyId to ObjectId
    let propertyObjectId: Types.ObjectId
    try {
      propertyObjectId = new Types.ObjectId(propertyId)
    } catch (error) {
      console.error('Invalid property ID format:', error)
      return { success: false, message: 'Invalid property ID format' }
    }

    const property = await Property.findById(propertyObjectId).lean() as IProperty | null

    if (!property) {
      return { success: false, message: 'Property not found' }
    }

    // Convert both IDs to strings for comparison
    const propertyOwnerId = property.owner?.toString()
    const userId = session.user.id

    if (!propertyOwnerId || propertyOwnerId !== userId) {
      return { success: false, message: 'Unauthorized to delete this property' }
    }

    await Property.findByIdAndDelete(propertyObjectId)

    return { success: true, message: 'Property deleted successfully' }
  } catch (error) {
    console.error('Delete property error:', error)
    return { success: false, message: 'Failed to delete property' }
  }
} 