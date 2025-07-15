"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, Ruler, Bed, Bath, Search } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useSearchParams } from "next/navigation"

type Property = {
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
    yearBuilt?: number
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
  createdAt: string
}

export default function PropertiesPage() {
  const searchParams = useSearchParams();
  const typeParam = searchParams.get("type") || "all";
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterListingType, setFilterListingType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // Fetch properties from API
  const fetchProperties = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/property/list')
      const data = await response.json()
      if (data.success) {
        setProperties(data.properties)
      } else {
        console.error('Failed to fetch properties:', data.message)
      }
    } catch (error) {
      console.error('Error fetching properties:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProperties()
  }, [])

  // Only filter by type from URL and filter bar
  const filteredProperties = properties.filter((property) => {
    if (typeParam !== "all" && property.propertyType !== typeParam) return false
    if (filterType && property.propertyType !== filterType) return false
    if (filterListingType && property.listingType !== filterListingType) return false
    if (minPrice && property.price < parseInt(minPrice)) return false
    if (maxPrice && property.price > parseInt(maxPrice)) return false
    if (search && !property.title.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const formatPrice = (price: number) => {
    return '৳' + price.toLocaleString('en-BD');
  }

  const formatAddress = (address: Property['address']) => {
    if (!address) return 'Address not available';
    const { street = '', city = '', state = '', zipCode = '' } = address;
    return `${street}${city ? `, ${city}` : ''}${state ? `, ${state}` : ''}${zipCode ? ` ${zipCode}` : ''}`;
  }

  // Get unique property types for dropdown
  const propertyTypes = Array.from(new Set(properties.map(p => p.propertyType).filter(Boolean)));

  return (
    <>
      <Navbar />
      <div className="bg-emerald-50/50 py-10">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-navy-800 mb-4">Property Listings</h1>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Explore our wide range of properties for sale and rent. Select a property type to filter.
            </p>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            {/* Property Type Dropdown */}
            <select
              value={filterType}
              onChange={e => setFilterType(e.target.value)}
              className="px-3 py-2 rounded border border-gray-300 bg-white text-gray-800"
            >
              <option value="">All Types</option>
              {propertyTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            {/* Listing Type Dropdown */}
            <select
              value={filterListingType}
              onChange={e => setFilterListingType(e.target.value)}
              className="px-3 py-2 rounded border border-gray-300 bg-white text-gray-800"
            >
              <option value="">All Listings</option>
              <option value="sell">Sell</option>
              <option value="rent">Rent</option>
            </select>
            {/* Price Range Inputs */}
            <input
              type="number"
              min="0"
              placeholder="Min Price"
              value={minPrice}
              onChange={e => setMinPrice(e.target.value)}
              className="px-3 py-2 rounded border border-gray-300 bg-white text-gray-800 w-28"
            />
            <input
              type="number"
              min="0"
              placeholder="Max Price"
              value={maxPrice}
              onChange={e => setMaxPrice(e.target.value)}
              className="px-3 py-2 rounded border border-gray-300 bg-white text-gray-800 w-28"
            />
                    </div>

          {/* Search Bar */}
          <div className="flex justify-center mb-8">
            <Input
              type="text"
              placeholder="Search by property name..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full max-w-md bg-white text-gray-800"
            />
          </div>

          {/* Results Count */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">
              Showing <span className="font-semibold">{filteredProperties.length}</span> properties
            </p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading properties...</p>
            </div>
          )}

          {/* Property Grid */}
          {!loading && filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map((property) => (
                <Link href={`/property/${property._id}`} key={property._id}>
                  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative h-48">
                        <Image
                        src={property.images?.[0] || "/placeholder.svg"}
                          alt={property.title}
                          fill
                          className="object-cover"
                        />
                      <div className="absolute top-4 left-4 bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {formatPrice(property.price)}
                      </div>
                      <div className="absolute top-4 right-4 bg-white text-emerald-600 px-3 py-1 rounded-full text-sm font-semibold">
                        For {property.listingType === "sell" ? "Sell" : "Rent"}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-navy-800 mb-2 line-clamp-2">
                        {property.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 flex items-center">
                        <MapPin className="w-4 h-4 mr-1 text-emerald-500" />
                        {formatAddress(property.address)}
                      </p>
                      <div className="flex justify-between text-sm text-gray-500">
                        <span className="flex items-center">
                          <Bed className="w-4 h-4 mr-1 text-emerald-500" />
                          {property.details.bedrooms} Beds
                        </span>
                        <span className="flex items-center">
                          <Bath className="w-4 h-4 mr-1 text-emerald-500" />
                          {property.details.bathrooms} Baths
                        </span>
                        <span className="flex items-center">
                          <Ruler className="w-4 h-4 mr-1 text-emerald-500" />
                          {property.details.sqft} sqft
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : !loading && filteredProperties.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No properties found</h3>
              <p className="text-gray-600">Try another property type or check back later for new listings.</p>
            </div>
          ) : null}
        </div>
      </div>
      <Footer />
    </>
  )
}
