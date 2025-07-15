"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"

type PropertyTypeProps = {
   icon: string
   title: string
   count: string
}

const PropertyTypeCard = ({ icon, title, count }: PropertyTypeProps) => {
   // Convert title to lowercase for URL parameter to match database schema
   const typeParam = title.toLowerCase()
   
   return (
      <Link href={`/properties?type=${encodeURIComponent(typeParam)}`}>
         <div className="border border-dashed border-emerald-200 bg-emerald-50/50 rounded-lg p-6 flex flex-col items-center justify-center hover:shadow-md transition-shadow">
            <div className="relative w-24 h-24 mb-4">
               <div className="absolute inset-0 rounded-full border-2 border-dashed border-emerald-400"></div>
               <div className="absolute inset-2 flex items-center justify-center">
                  <Image src={icon || "/placeholder.svg"} alt={title} width={48} height={48} className="text-emerald-500" />
               </div>
            </div>
            <h3 className="text-lg font-bold text-navy-800 mb-1">{title}</h3>
            <p className="text-emerald-500">{count} Properties</p>
         </div>
      </Link>
   )
}

export default function PropertyTypes() {
   const [propertyCounts, setPropertyCounts] = useState<{[key: string]: number}>({})
   const [loading, setLoading] = useState(true)

   const propertyTypes = [
      {
         icon: "/images/icon-apartment.png",
         title: "Apartment",
         type: "apartment",
      },
      {
         icon: "/images/icon-villa.png",
         title: "Villa",
         type: "villa",
      },
      {
         icon: "/images/icon-house.png",
         title: "House",
         type: "house",
      },
      {
         icon: "/images/icon-luxury.png",
         title: "Office",
         type: "office",
      },
      {
         icon: "/images/icon-building.png",
         title: "Building",
         type: "building",
      },
      {
         icon: "/images/icon-neighborhood.png",
         title: "Townhouse",
         type: "townhouse",
      },
      {
         icon: "/images/icon-condominium.png",
         title: "Shop",
         type: "shop",
      },
      {
         icon: "/images/icon-search.png",
         title: "Garage",
         type: "garage",
      },
   ]

   // Fetch property counts for each type
   const fetchPropertyCounts = async () => {
      try {
         setLoading(true)
         const counts: {[key: string]: number} = {}
         
         // Fetch counts for each property type
         for (const propertyType of propertyTypes) {
            const response = await fetch(`/api/property/list?type=${propertyType.type}`)
            const data = await response.json()
            counts[propertyType.title] = data.success ? data.properties.length : 0
         }
         
         setPropertyCounts(counts)
      } catch (error) {
         console.error('Error fetching property counts:', error)
         // Set default counts if API fails
         const defaultCounts: {[key: string]: number} = {}
         propertyTypes.forEach(type => {
            defaultCounts[type.title] = 0
         })
         setPropertyCounts(defaultCounts)
      } finally {
         setLoading(false)
      }
   }

   useEffect(() => {
      fetchPropertyCounts()
   }, [])

   return (
      <section className="py-16 bg-emerald-50/50">
         <div className="container mx-auto px-4">
            <div className="text-center mb-12">
               <h2 className="text-4xl font-bold text-navy-800 mb-4">Property Types</h2>
               <p className="text-gray-600 max-w-3xl mx-auto">
               Discover a place where comfort meets convenience. Whether you're looking for a spacious house in a peaceful neighborhood or a modern apartment close to top schools and amenities, we help you find the ideal home tailored to your family's needs. Start your journey to a better living space today!
               </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
               {propertyTypes.map((type, index) => (
                  <PropertyTypeCard 
                     key={index} 
                     icon={type.icon} 
                     title={type.title} 
                     count={loading ? "..." : propertyCounts[type.title]?.toString() || "0"} 
                  />
               ))}
            </div>
         </div>
      </section>
   )
}
