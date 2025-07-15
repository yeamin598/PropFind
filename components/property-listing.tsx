"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MapPin, Ruler, Bed, Bath, Trash2 } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { deleteProperty } from "@/app/actions/property"

type Property = {
  _id: string
  title: string
  price: number
  address: {
    street: string
    city: string
    state: string
    zipCode: string
  }
  propertyType: string
  listingType: "sell" | "rent"
  images: string[]
  details: {
    sqft: number
    bedrooms: number
    bathrooms: number
  }
  owner?: {
    _id: string
    name: string
    email: string
  }
}

export default function PropertyListing() {
  const { user, isLoading: authLoading } = useAuth()
  const [activeFilter, setActiveFilter] = useState<"featured" | "sell" | "rent">("featured")
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch(`/api/property/list?status=${activeFilter}`)
        if (!response.ok) {
          throw new Error("Failed to fetch properties")
        }
        const data = await response.json()
        if (!data.success) {
          throw new Error(data.message || "Failed to fetch properties")
        }
        setProperties(data.properties)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    if (!authLoading) {
      fetchProperties()
    }
  }, [activeFilter, authLoading])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      maximumFractionDigits: 0,
    }).format(price)
  }

  const formatAddress = (address?: Property['address']) => {
    if (!address) return 'Address not available';
    const { street = '', city = '', state = '', zipCode = '' } = address;
    return `${street}${city ? `, ${city}` : ''}${state ? `, ${state}` : ''}${zipCode ? ` ${zipCode}` : ''}`;
  }

  const handleDelete = async (propertyId: string, e: React.MouseEvent) => {
    e.preventDefault() // Prevent navigation when clicking delete
    if (!user) {
      alert('You must be logged in to delete a property')
      return
    }
    if (!confirm('Are you sure you want to delete this property?')) return

    try {
      setDeletingId(propertyId)
      const result = await deleteProperty(propertyId)

      if (!result.success) {
        // Show more specific error messages
        if (result.message === 'Not authenticated') {
          alert('Your session has expired. Please log in again.')
          return
        }
        if (result.message === 'Unauthorized to delete this property') {
          alert('You are not authorized to delete this property.')
          return
        }
        alert(result.message || 'Failed to delete property')
        return
      }

      // Remove the deleted property from the state
      setProperties(prevProperties => prevProperties.filter(p => p._id !== propertyId))
      
      // Refresh the properties list to ensure UI is in sync with the database
      const response = await fetch(`/api/property/list?status=${activeFilter}`)
      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          setProperties(data.properties)
        } else {
          console.error('Failed to refresh properties:', data.message)
        }
      } else {
        console.error('Failed to refresh properties:', response.statusText)
      }
    } catch (err) {
      console.error('Delete error:', err)
      alert('An unexpected error occurred. Please try again.')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Properties</h2>
          <p className="text-gray-600">Discover your dream property from our curated selection</p>
          </div>

        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                activeFilter === "featured"
                  ? "bg-emerald-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setActiveFilter("featured")}
            >
              Featured
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium ${
                activeFilter === "sell"
                  ? "bg-emerald-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setActiveFilter("sell")}
            >
              For Sale
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                activeFilter === "rent"
                  ? "bg-emerald-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setActiveFilter("rent")}
            >
              For Rent
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
                  </div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <div key={property._id} className="relative group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                <Link href={`/property/${property._id}`}>
                  <div className="relative h-48">
                    <Image
                      src={property.images?.[0] || '/placeholder.svg'}
                      alt={property.title || 'Property Image'}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                      {formatPrice(property.price || 0)}
                    </div>
                    </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                      {property.title || 'Untitled Property'}
                    </h3>
                    <p className="text-gray-600 mb-4">{formatAddress(property.address)}</p>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>{property.details?.bedrooms || 0} Beds</span>
                      <span>{property.details?.bathrooms || 0} Baths</span>
                      <span>{property.details?.sqft || 0} sqft</span>
                    </div>
                  </div>
                </Link>
                {user && property.owner && property.owner._id && user.id === property.owner._id && (
                  <button
                    onClick={(e) => handleDelete(property._id, e)}
                    disabled={deletingId === property._id}
                    className="absolute top-4 right-4 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed z-10"
                    title="Delete property"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
          ))}
        </div>
        )}
      </div>
    </section>
  )
}
