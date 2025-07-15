"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import {
  MapPin,
  Calendar,
  Ruler,
  Bed,
  Bath,
  Car,
  CheckCircle,
  Phone,
  Mail,
  ChevronLeft,
  ChevronRight,
  Share2,
  Heart,
  MessageSquare,
  DollarSign,
  Home,
  Building,
  Trash2,
} from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useAuth } from "@/lib/auth-context"
import { deleteProperty } from "@/app/actions/property"

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

export default function PropertyDetailClient({ property }: { property: PropertyType }) {
  const router = useRouter()
  const { user } = useAuth()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [activeTab, setActiveTab] = useState("description")
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      maximumFractionDigits: 0,
    }).format(price)
  }
  
  const formatAddress = (address: PropertyType['address']) => {
    if (!address) return 'Address not available';
    const { street = '', city = '', state = '', zipCode = '' } = address;
    return `${street}${city ? `, ${city}` : ''}${state ? `, ${state}` : ''}${zipCode ? ` ${zipCode}` : ''}`;
  }

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % property.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + property.images.length) % property.images.length)
  }

  const handleSubmitContactForm = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    alert("Your message has been sent to the agent!")
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this property? This action cannot be undone.')) {
      return;
    }

    try {
      const result = await deleteProperty(property._id);
      
      if (!result.success) {
        alert(result.message || 'Failed to delete property');
        return;
      }

      // Redirect to properties page after successful deletion
      router.push('/properties');
    } catch (error) {
      console.error('Error deleting property:', error);
      alert('Failed to delete property. Please try again.');
    }
  };

  return (
    <>
      <Navbar />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex justify-between items-center">
            <Link href="/" className="text-emerald-600 hover:text-emerald-800 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Properties
            </Link>
            {user && property.owner && property.owner._id && user.id === property.owner._id && (
              <Button
                variant="destructive"
                onClick={handleDelete}
                className="flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete Property
              </Button>
            )}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
                <div className="relative h-96">
                  <Image
                    src={property.images?.[currentImageIndex] || '/placeholder.svg'}
                    alt={property.title || 'Property Image'}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-emerald-600 text-white px-4 py-2 rounded-full text-lg font-semibold">
                    {formatPrice(property.price || 0)}
                  </div>
                  <div className="absolute top-4 right-4 flex space-x-2">
                    {property.images.map((image: string, index: number) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full ${
                          index === currentImageIndex ? "bg-emerald-500" : "bg-white/70"
                        }`}
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="p-6">
                  <h1 className="text-3xl font-bold mb-4">{property.title || 'Untitled Property'}</h1>
                  <p className="text-gray-600 mb-6 flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-emerald-500" />
                    {formatAddress(property.address)}
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <Bed className="w-6 h-6 mx-auto mb-2 text-emerald-600" />
                      <p className="font-semibold">{property.details?.bedrooms || 0}</p>
                      <p className="text-sm text-gray-600">Bedrooms</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <Bath className="w-6 h-6 mx-auto mb-2 text-emerald-600" />
                      <p className="font-semibold">{property.details?.bathrooms || 0}</p>
                      <p className="text-sm text-gray-600">Bathrooms</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <Ruler className="w-6 h-6 mx-auto mb-2 text-emerald-600" />
                      <p className="font-semibold">{property.details?.sqft || 0}</p>
                      <p className="text-sm text-gray-600">Square Feet</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <Calendar className="w-6 h-6 mx-auto mb-2 text-emerald-600" />
                      <p className="font-semibold">{property.details?.yearBuilt || 'N/A'}</p>
                      <p className="text-sm text-gray-600">Year Built</p>
                    </div>
                  </div>
                  
                  <Tabs defaultValue="description" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="description">Description</TabsTrigger>
                      <TabsTrigger value="details">Details</TabsTrigger>
                      <TabsTrigger value="location">Location</TabsTrigger>
                    </TabsList>
                    <TabsContent value="description" className="mt-6">
                      <p className="text-gray-700">{property.description || 'No description available.'}</p>
                    </TabsContent>
                    <TabsContent value="details" className="mt-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between border-b pb-2">
                          <span className="text-gray-600">Property Price:</span>
                          <span className="font-medium">{formatPrice(property.price || 0)}</span>
                        </div>
                        <div className="flex items-center justify-between border-b pb-2">
                          <span className="text-gray-600">Property Type:</span>
                          <span className="font-medium capitalize">{property.propertyType || 'N/A'}</span>
                        </div>
                        <div className="flex items-center justify-between border-b pb-2">
                          <span className="text-gray-600">Listing Type:</span>
                          <span className="font-medium capitalize">{property.listingType || 'N/A'}</span>
                        </div>
                        <div className="flex items-center justify-between border-b pb-2">
                          <span className="text-gray-600">Status:</span>
                          <span className="font-medium capitalize">{property.status || 'Active'}</span>
                        </div>
                        <div className="flex items-center justify-between border-b pb-2">
                          <span className="text-gray-600">Bedrooms:</span>
                          <span className="font-medium">{property.details?.bedrooms || 0}</span>
                        </div>
                        <div className="flex items-center justify-between border-b pb-2">
                          <span className="text-gray-600">Bathrooms:</span>
                          <span className="font-medium">{property.details?.bathrooms || 0}</span>
                        </div>
                        <div className="flex items-center justify-between border-b pb-2">
                          <span className="text-gray-600">Square Feet:</span>
                          <span className="font-medium">{property.details?.sqft || 0}</span>
                        </div>
                        <div className="flex items-center justify-between border-b pb-2">
                          <span className="text-gray-600">Year Built:</span>
                          <span className="font-medium">{property.details?.yearBuilt || 'N/A'}</span>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="location" className="mt-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between border-b pb-2">
                          <span className="text-gray-600">Street:</span>
                          <span className="font-medium">{property.address?.street || 'N/A'}</span>
                        </div>
                        <div className="flex items-center justify-between border-b pb-2">
                          <span className="text-gray-600">City:</span>
                          <span className="font-medium">{property.address?.city || 'N/A'}</span>
                        </div>
                        <div className="flex items-center justify-between border-b pb-2">
                          <span className="text-gray-600">State:</span>
                          <span className="font-medium">{property.address?.state || 'N/A'}</span>
                        </div>
                        <div className="flex items-center justify-between border-b pb-2">
                          <span className="text-gray-600">Zip Code:</span>
                          <span className="font-medium">{property.address?.zipCode || 'N/A'}</span>
                        </div>
                      </div>

                    </TabsContent>
                  </Tabs>
                  
                  {property.amenities && property.amenities.length > 0 && (
                    <div className="mt-8">
                      <h2 className="text-2xl font-semibold mb-4">Amenities</h2>
                      <div className="flex flex-wrap gap-2">
                        {property.amenities.map((amenity: string, index: number) => (
                          <span key={index} className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm">
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Image Gallery */}
              {property.images && property.images.length > 1 && (
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                  <h2 className="text-2xl font-semibold mb-4">Image Gallery</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {property.images.slice(1).map((image: string, index: number) => (
                      <div key={index} className="relative h-48 rounded-lg overflow-hidden">
                        <Image
                          src={image || '/placeholder.svg'}
                          alt={`Property Image ${index + 2}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              

            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
                
                {property.contactInfo ? (
                  <div className="space-y-4">
                    <div>
                      <p className="text-gray-600">Name</p>
                      <p className="font-medium">{property.contactInfo.name}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Phone</p>
                      <p className="font-medium">{property.contactInfo.phone}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Email</p>
                      <p className="font-medium">{property.contactInfo.email}</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-600">Contact information not available.</p>
                )}
                
                <div className="mt-8">
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                    Contact Agent
                  </Button>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold mb-2">Property Owner</h3>
                  {property.owner ? (
                    <div>
                      <p className="font-medium">{property.owner.name}</p>
                      <p className="text-gray-600">{property.owner.email}</p>
                    </div>
                  ) : (
                    <p className="text-gray-600">Owner information not available.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
} 