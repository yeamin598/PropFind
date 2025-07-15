import { notFound } from "next/navigation"
import dbConnect from "@/lib/mongodb"
import Property from "@/app/models/property.model"
import PropertyDetailClient from "./PropertyDetailClient"
import { useRouter } from "next/navigation"

// Define types for our data
type PropertyType = {
  _id: string
  title: string
  description: string
  price: number
  address: {
    street: string
    city: string
    state: string
    zipCode: string
  }
  propertyType: string
  listingType: "sell" | "rent"
  status: string
  images: string[]
  details: {
    sqft: number
    bedrooms: number
    bathrooms: number
    yearBuilt: number
  }
  amenities: string[]
  contactInfo: {
    name: string
    phone: string
    email: string
  }
  owner: {
    _id: string
    name: string
    email: string
  }
}

async function getProperty(id: string): Promise<PropertyType | null> {
  await dbConnect()
  const property = await Property.findById(id).populate('owner', 'name email')
  
  if (!property) {
    return null
  }
  
  return JSON.parse(JSON.stringify(property))
}

export default async function PropertyDetailPage({ params }: { params: { id: string } }) {
  const property = await getProperty(params.id)
  
  if (!property) {
    notFound()
  }
  
  return <PropertyDetailClient property={property} />
} 