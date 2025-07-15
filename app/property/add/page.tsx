"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Upload, MapPin, DollarSign, Ruler, Bed, Bath } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

const formatPrice = (price: string | number) => {
  const num = typeof price === 'string' ? parseFloat(price) : price;
  if (!num) return '৳0';
  return new Intl.NumberFormat('en-BD', {
    style: 'currency',
    currency: 'BDT',
    maximumFractionDigits: 0,
  }).format(num);
};

export default function AddPropertyPage() {
  const router = useRouter()
  const [images, setImages] = useState<string[]>([])
  const [propertyType, setPropertyType] = useState("house")
  const [listingType, setListingType] = useState("sell")
  // Remove static previewData as we'll use formData directly
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    price: string;
    listingType: string;
    propertyType: string;
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
    };
    details: {
      sqft: string;
      bedrooms: string;
      bathrooms: string;
      yearBuilt: string;
    };
    amenities: string[];
    contactInfo: {
      name: string;
      phone: string;
      email: string;
    };
  }>({
    title: "",
    description: "",
    price: "",
    listingType: "sell",
    propertyType: "house",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
    },
    details: {
      sqft: "",
      bedrooms: "",
      bathrooms: "",
      yearBuilt: "",
    },
    amenities: [],
    contactInfo: {
      name: "",
      phone: "",
      email: "",
    }
  })

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files)
      const formData = new FormData()
      files.forEach(file => formData.append('images', file))

      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })
        const data = await response.json()
        if (data.success) {
          setImages([...images, ...data.urls])
        }
      } catch (error) {
        console.error('Error uploading images:', error)
      }
    }
  }

  const handleInputChange = (field: string, value: string) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.')
      setFormData(prev => {
        const newData = { ...prev };
        if (parent === 'address') {
          newData.address = {
            ...newData.address,
            [child]: value
          };
        } else if (parent === 'details') {
          newData.details = {
            ...newData.details,
            [child]: value
          };
        } else if (parent === 'contactInfo') {
          newData.contactInfo = {
            ...newData.contactInfo,
            [child]: value
          };
        }
        return newData;
      });
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  }

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      amenities: checked
        ? [...prev.amenities, amenity]
        : prev.amenities.filter(a => a !== amenity)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const propertyData = {
        ...formData,
        price: parseFloat(formData.price),
        details: {
          ...formData.details,
          sqft: parseFloat(formData.details.sqft),
          bedrooms: parseInt(formData.details.bedrooms),
          bathrooms: parseInt(formData.details.bathrooms),
          yearBuilt: formData.details.yearBuilt ? parseInt(formData.details.yearBuilt) : undefined,
        },
        images,
        listingType,
        propertyType,
      }

      const response = await fetch('/api/property/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(propertyData),
      })

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.message || 'Failed to add property')
      }

      router.push('/')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <div className="bg-emerald-50/50 py-10">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold text-navy-800 mb-6">Add New Property</h1>
            <p className="text-gray-600 mb-8">
              Fill out the form below to list your property on PropFind. All fields marked with * are required.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <form onSubmit={handleSubmit}>
                  <Card className="mb-8">
                    <CardHeader>
                      <CardTitle>Basic Information</CardTitle>
                      <CardDescription>Provide the basic details about your property</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <Label htmlFor="title">Property Title *</Label>
                        <Input
                          id="title"
                          placeholder="e.g. 3 Bedroom Apartment"
                          required
                          className="mt-1"
                          value={formData.title}
                          onChange={(e) => handleInputChange("title", e.target.value)}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="price">Price *</Label>
                          <div className="relative mt-1">
                            <Input
                              id="price"
                              type="number"
                              placeholder="e.g. BDT 250,000"
                              className="pl-10"
                              required
                              value={formData.price}
                              onChange={(e) => handleInputChange("price", e.target.value)}
                            />
                          </div>
                        </div>

                        <div>
                          <Label>Listing Type *</Label>
                          <Tabs defaultValue="sell" className="mt-1" value={listingType} onValueChange={setListingType}>
                            <TabsList className="grid w-full grid-cols-2">
                              <TabsTrigger value="sell">For Sell</TabsTrigger>
                              <TabsTrigger value="rent">For Rent</TabsTrigger>
                            </TabsList>
                          </Tabs>
                        </div>
                      </div>

                      <div>
                        <Label>Property Type *</Label>
                        <Select
                          value={propertyType}
                          onValueChange={(value) => {
                            setPropertyType(value)
                            handleInputChange("propertyType", value)
                          }}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select property type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="apartment">Apartment</SelectItem>
                            <SelectItem value="villa">Villa</SelectItem>
                            <SelectItem value="house">House</SelectItem>
                            <SelectItem value="office">Office</SelectItem>
                            <SelectItem value="building">Building</SelectItem>
                            <SelectItem value="townhouse">Townhouse</SelectItem>
                            <SelectItem value="shop">Shop</SelectItem>
                            <SelectItem value="garage">Garage</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="description">Description *</Label>
                        <Textarea
                          id="description"
                          placeholder="Describe your property..."
                          className="mt-1 min-h-[150px]"
                          required
                          value={formData.description}
                          onChange={(e) => handleInputChange("description", e.target.value)}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="mb-8">
                    <CardHeader>
                      <CardTitle>Location</CardTitle>
                      <CardDescription>Where is your property located?</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <Label htmlFor="address">Address *</Label>
                        <div className="relative mt-1">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
                          <Input
                            id="address"
                            placeholder="e.g. 123, Kazla, Rajshahi"
                            className="pl-10"
                            required
                            value={formData.address.street}
                            onChange={(e) => handleInputChange("address.street", e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <Label htmlFor="city">City *</Label>
                          <Input id="city" placeholder="e.g. Rajshahi" className="mt-1" required value={formData.address.city} onChange={(e) => handleInputChange("address.city", e.target.value)} />
                        </div>
                        <div>
                          <Label htmlFor="state">Division *</Label>
                          <Input id="state" placeholder="e.g. RJH" className="mt-1" required value={formData.address.state} onChange={(e) => handleInputChange("address.state", e.target.value)} />
                        </div>
                        <div>
                          <Label htmlFor="zip">ZIP Code *</Label>
                          <Input id="zip" placeholder="e.g. 6200" className="mt-1" required value={formData.address.zipCode} onChange={(e) => handleInputChange("address.zipCode", e.target.value)} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="mb-8">
                    <CardHeader>
                      <CardTitle>Property Details</CardTitle>
                      <CardDescription>Provide specific details about your property</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <Label htmlFor="sqft">Square Feet *</Label>
                          <div className="relative mt-1">
                            <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
                            <Input
                              id="sqft"
                              type="number"
                              placeholder="e.g. 1500"
                              className="pl-10"
                              required
                              value={formData.details.sqft}
                              onChange={(e) => handleInputChange("details.sqft", e.target.value)}
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="bedrooms">Bedrooms *</Label>
                          <div className="relative mt-1">
                            <Bed className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
                            <Input
                              id="bedrooms"
                              type="number"
                              placeholder="e.g. 3"
                              className="pl-10"
                              required
                              value={formData.details.bedrooms}
                              onChange={(e) => handleInputChange("details.bedrooms", e.target.value)}
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="bathrooms">Bathrooms *</Label>
                          <div className="relative mt-1">
                            <Bath className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
                            <Input
                              id="bathrooms"
                              type="number"
                              placeholder="e.g. 2"
                              className="pl-10"
                              required
                              value={formData.details.bathrooms}
                              onChange={(e) => handleInputChange("details.bathrooms", e.target.value)}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="year">Year Built</Label>
                          <Input id="year" type="number" placeholder="e.g. 2010" className="mt-1" value={formData.details.yearBuilt} onChange={(e) => handleInputChange("details.yearBuilt", e.target.value)} />
                        </div>
                        <div>
                          <Label htmlFor="garage">Garage Spaces</Label>
                          <Input id="garage" type="number" placeholder="e.g. 2" className="mt-1" />
                        </div>
                      </div>

                      <div>
                        <Label className="mb-3 block">Amenities</Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {[
                            "Air Conditioning",
                            "Swimming Pool",
                            "Central Heating",
                            "Garden",
                            "Gym",
                            "Elevator",
                            "Balcony",
                            "Parking",
                            "Security System",
                          ].map((amenity) => (
                            <div key={amenity} className="flex items-center space-x-2">
                              <Checkbox 
                                id={`amenity-${amenity}`}
                                checked={formData.amenities.includes(amenity)}
                                onCheckedChange={(checked) => handleAmenityChange(amenity, checked as boolean)}
                              />
                              <label
                                htmlFor={`amenity-${amenity}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {amenity}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="mb-8">
                    <CardHeader>
                      <CardTitle>Property Images</CardTitle>
                      <CardDescription>Upload images of your property (max 10 images)</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        {images.map((image, index) => (
                          <div key={index} className="relative aspect-square rounded-md overflow-hidden bg-gray-100">
                            <Image
                              src={image || "/placeholder.svg"}
                              alt={`Property image ${index + 1}`}
                              fill
                              className="object-cover"
                            />
                            <button
                              type="button"
                              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                              onClick={() => setImages(images.filter((_, i) => i !== index))}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                              </svg>
                            </button>
                          </div>
                        ))}
                        {images.length < 10 && (
                          <label className="cursor-pointer border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center aspect-square hover:border-emerald-500 transition-colors">
                            <Upload className="h-8 w-8 text-gray-400" />
                            <span className="mt-2 text-sm text-gray-500">Upload Image</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleImageUpload}
                              multiple
                            />
                          </label>
                        )}
                      </div>
                      <p className="text-xs text-gray-500">
                        Supported formats: JPG, PNG, GIF. Maximum file size: 5MB per image.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="mb-8">
                    <CardHeader>
                      <CardTitle>Contact Information</CardTitle>
                      <CardDescription>How potential buyers/renters can reach you</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="contact-name">Contact Name *</Label>
                          <Input id="contact-name" placeholder="Your name" className="mt-1" required value={formData.contactInfo.name} onChange={(e) => handleInputChange("contactInfo.name", e.target.value)} />
                        </div>
                        <div>
                          <Label htmlFor="contact-phone">Phone Number *</Label>
                          <Input id="contact-phone" placeholder="Your phone number" className="mt-1" required value={formData.contactInfo.phone} onChange={(e) => handleInputChange("contactInfo.phone", e.target.value)} />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="contact-email">Email *</Label>
                        <Input id="contact-email" type="email" placeholder="Your email" className="mt-1" required value={formData.contactInfo.email} onChange={(e) => handleInputChange("contactInfo.email", e.target.value)} />
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex justify-end space-x-4">
                    <Button variant="outline" type="button" onClick={() => router.back()}>
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-emerald-500 hover:bg-emerald-600" disabled={isLoading}>
                      {isLoading ? "Adding Property..." : "Submit Property"}
                    </Button>
                  </div>
                </form>
              </div>

              {/* Preview Card */}
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <h3 className="text-lg font-semibold text-navy-800 mb-4">Property Preview</h3>
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <div className="relative">
                      <div className="absolute top-4 left-4 z-10">
                        <span
                          className={`px-3 py-1 text-sm font-medium text-white rounded-md ${
                            listingType === "sell" ? "bg-emerald-500" : "bg-emerald-500"
                          }`}
                        >
                          For {listingType === "sell" ? "Sell" : "Rent"}
                        </span>
                      </div>
                      <div className="absolute bottom-4 left-4 z-10">
                        <span className="px-3 py-1 text-sm font-medium text-emerald-500 bg-white rounded-md">
                          {propertyType.charAt(0).toUpperCase() + propertyType.slice(1)}
                        </span>
                      </div>
                      <div className="h-64 w-full bg-gray-200 flex items-center justify-center">
                        {images.length > 0 ? (
                          <div className="relative h-full w-full">
                            <Image
                              src={images[0] || "/placeholder.svg"}
                              alt="Property preview"
                              fill
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="text-gray-400 flex flex-col items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="48"
                              height="48"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                              <circle cx="8.5" cy="8.5" r="1.5"></circle>
                              <polyline points="21 15 16 10 5 21"></polyline>
                            </svg>
                            <span className="mt-2">No image uploaded</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="mb-2">
                        <span className="text-2xl font-bold text-emerald-500">
                          {formatPrice(formData.price)}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-navy-800 mb-2">
                        {formData.title || "Property Title"}
                      </h3>
                      <div className="flex items-center text-gray-500 mb-4">
                        <MapPin className="w-4 h-4 mr-1 text-emerald-500" />
                        <span className="text-sm">
                          {formData.address.street && formData.address.city 
                            ? `${formData.address.street}, ${formData.address.city}`
                            : "Address"}
                        </span>
                      </div>
                      <div className="grid grid-cols-3 border-t border-gray-200 pt-4">
                        <div className="flex items-center justify-center">
                          <Ruler className="w-4 h-4 mr-1 text-emerald-500" />
                          <span className="text-sm">{formData.details.sqft || "0"} Sqft</span>
                        </div>
                        <div className="flex items-center justify-center">
                          <Bed className="w-4 h-4 mr-1 text-emerald-500" />
                          <span className="text-sm">{formData.details.bedrooms || "0"} Bed</span>
                        </div>
                        <div className="flex items-center justify-center">
                          <Bath className="w-4 h-4 mr-1 text-emerald-500" />
                          <span className="text-sm">{formData.details.bathrooms || "0"} Bath</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
