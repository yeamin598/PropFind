'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ProfileEditModal from '@/components/ProfileEditModal';
import PropertyAddModal from '@/components/PropertyAddModal';
import PropertyEditModal from '@/components/PropertyEditModal';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { Camera, Edit, Trash2, Plus, MapPin, DollarSign, Calendar, User, Mail, Phone } from 'lucide-react';
import { toast } from 'sonner';

interface User {
  name: string;
  email: string;
  phone?: string;
  profilePhoto?: string;
  coverPhoto?: string;
}

interface Property {
  _id: string;
  title: string;
  description?: string;
  price: number;
  images: string[];
  createdAt?: string;
  location?: string;
  listingType?: 'sale' | 'rent'; // Added listingType
}

interface ProfileFormData {
  name: string;
  phone?: string;
}

interface PropertyFormData {
  _id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  [key: string]: any;
}

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [properties, setProperties] = useState<Property[]>([]);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showAddProperty, setShowAddProperty] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (session?.user) {
      fetchUserData();
      fetchUserProperties();
    }
  }, [session, status, router]);

  const fetchUserData = async () => {
    try {
      const response = await fetch('/api/user/profile');
      const data = await response.json();
      console.log('Fetched user data:', data); // Debug log
      if (data.success) {
        console.log('User profile photo:', data.user.profilePhoto); // Debug log
        console.log('User cover photo:', data.user.coverPhoto); // Debug log
        setUser(data.user);
      } else {
        toast.error('Failed to fetch user data');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      toast.error('Error fetching user data');
    } finally {
      setLoading(false);
    }
  };

  const fetchUserProperties = async () => {
    try {
      const response = await fetch('/api/property/user');
      const data = await response.json();
      if (data.success) {
        setProperties(data.properties);
      } else {
        toast.error('Failed to fetch properties');
      }
    } catch (error) {
      console.error('Error fetching user properties:', error);
      toast.error('Error fetching properties');
    }
  };

  const handleProfileSave = async (formData: ProfileFormData) => {
    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        setUser(data.user);
        setShowEditProfile(false);
        toast.success('Profile updated successfully');
      } else {
        toast.error(data.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Error updating profile');
    }
  };

  const handleAddProperty = async (formData: PropertyFormData) => {
    try {
      await fetchUserProperties();
      setShowAddProperty(false);
      toast.success('Property added successfully');
    } catch (error) {
      console.error('Error adding property:', error);
      toast.error('Error adding property');
    }
  };

  const handleEditProperty = async (property: any) => {
    try {
      const response = await fetch(`/api/property/update/${property._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(property),
      });
      const data = await response.json();
      if (data.success) {
        await fetchUserProperties();
        setEditingProperty(null);
        toast.success('Property updated successfully');
      } else {
        toast.error(data.message || 'Failed to update property');
      }
    } catch (error) {
      console.error('Error editing property:', error);
      toast.error('Error editing property');
    }
  };

  const handleDeleteProperty = async (propertyId: string) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      try {
        const response = await fetch(`/api/property/delete/${propertyId}`, { 
          method: 'DELETE' 
        });
        const data = await response.json();
        if (data.success) {
          setProperties(properties.filter((p) => p._id !== propertyId));
          toast.success('Property deleted successfully');
        } else {
          toast.error(data.message || 'Failed to delete property');
        }
      } catch (error) {
        console.error('Error deleting property:', error);
        toast.error('Error deleting property');
      }
    }
  };

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>, type: 'profile' | 'cover') => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (type === 'profile') {
      setUploadingPhoto(true);
    } else {
      setUploadingCover(true);
    }

    try {
      const formData = new FormData();
      formData.append('photo', file);
      formData.append('type', type);
      
      const response = await fetch('/api/user/upload-photo', { 
        method: 'POST', 
        body: formData 
      });
      const data = await response.json();
      
      console.log('Upload response:', data); // Debug log
      
      if (data.success) {
        console.log('Upload successful, received user data:', data.user);
        
        // Update user state immediately with the response from server
        if (user && data.user) {
          const updatedUser = {
            ...user,
            profilePhoto: data.user.profilePhoto || user.profilePhoto,
            coverPhoto: data.user.coverPhoto || user.coverPhoto
          };
          console.log('Updating user state:', updatedUser);
          setUser(updatedUser);
        }
        
        // Also fetch fresh data from server after a short delay to ensure consistency
        setTimeout(async () => {
          console.log('Fetching fresh user data from server...');
          await fetchUserData();
        }, 1000);
        
        toast.success(`${type === 'profile' ? 'Profile' : 'Cover'} photo updated successfully`);
      } else {
        toast.error(data.message || `Failed to upload ${type} photo`);
      }
    } catch (error) {
      console.error(`Error uploading ${type} photo:`, error);
      toast.error(`Error uploading ${type} photo`);
    } finally {
      if (type === 'profile') {
        setUploadingPhoto(false);
      } else {
        setUploadingCover(false);
      }
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Failed to load profile data.</p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Cover Photo Section */}
      <section className="relative">
                 <div className="relative h-80 bg-gradient-to-r from-emerald-500 to-emerald-600 overflow-hidden">
           {user.coverPhoto ? (
             <img
               key={user.coverPhoto}
               src={user.coverPhoto}
               alt="Cover Photo"
               className="absolute inset-0 w-full h-full object-cover"
               onError={(e) => {
                 console.error('Cover photo load error:', user.coverPhoto);
                 e.currentTarget.style.display = 'none';
               }}
             />
           ) : (
             <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-emerald-600" />
           )}
          
          {/* Cover Photo Upload Button */}
          <label className="absolute top-4 right-4 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-3 cursor-pointer shadow-lg transition-all group">
            <Camera className="w-5 h-5 text-emerald-600 group-hover:scale-110 transition-transform" />
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={(e) => handlePhotoChange(e, 'cover')} 
              disabled={uploadingCover} 
            />
          </label>
          
          {uploadingCover && (
            <div className="absolute top-4 left-4 bg-white bg-opacity-90 px-4 py-2 rounded-full shadow-lg">
              <p className="text-emerald-600 text-sm font-medium">Uploading cover...</p>
            </div>
          )}
        </div>

        {/* Profile Photo */}
        <div className="absolute -bottom-16 left-8">
          <div className="relative">
                         <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-200">
               {user.profilePhoto ? (
                 <img
                   key={user.profilePhoto}
                   src={user.profilePhoto}
                   alt="Profile Photo"
                   className="w-full h-full object-cover"
                   onError={(e) => {
                     console.error('Profile photo load error:', user.profilePhoto);
                     e.currentTarget.style.display = 'none';
                   }}
                 />
               ) : (
                 <div className="w-full h-full flex items-center justify-center">
                   <User className="w-12 h-12 text-gray-400" />
                 </div>
               )}
             </div>
            
            {/* Profile Photo Upload Button */}
            <label className="absolute bottom-0 right-0 bg-emerald-500 hover:bg-emerald-600 rounded-full p-2 cursor-pointer shadow-lg transition-all group">
              <Camera className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={(e) => handlePhotoChange(e, 'profile')} 
                disabled={uploadingPhoto} 
              />
            </label>
            
            {uploadingPhoto && (
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded shadow-lg">
                <p className="text-emerald-600 text-xs font-medium">Uploading...</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Profile Content */}
      <div className="container mx-auto px-4 pt-20 pb-16">
        {/* User Info Card */}
        <Card className="mb-8">
          <CardHeader className="pb-4">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                  {user.name}
                </CardTitle>
                <div className="space-y-2">
                  <div className="flex items-center text-gray-600">
                    <Mail className="w-4 h-4 mr-2" />
                    {user.email}
                  </div>
                  {user.phone && (
                    <div className="flex items-center text-gray-600">
                      <Phone className="w-4 h-4 mr-2" />
                      {user.phone}
                    </div>
                  )}
                </div>
              </div>
              <Button
                onClick={() => setShowEditProfile(true)}
                variant="outline"
                className="border-emerald-500 text-emerald-600 hover:bg-emerald-50"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* Properties Section */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">My Properties</h2>
            {/* Removed Add Property button */}
          </div>

          {properties.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <div className="max-w-md mx-auto">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No Properties Yet</h3>
                  <p className="text-gray-600 mb-6">Start building your property portfolio by adding your first listing.</p>
                  <Button
                    onClick={() => setShowAddProperty(true)}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Your First Property
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <Card key={property._id} className="group hover:shadow-lg transition-shadow">
                  <div className="relative h-48 overflow-hidden">
                                         {property.images && property.images.length > 0 ? (
                       <img
                         src={property.images[0]}
                         alt={property.title}
                         className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                         onError={(e) => {
                           console.error('Property image load error:', property.images[0]);
                           e.currentTarget.style.display = 'none';
                         }}
                       />
                     ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <MapPin className="w-12 h-12 text-gray-400" />
                      </div>
                    )}
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-emerald-500">
                        {property.listingType === 'rent' ? 'For Rent' : 'For Sale'}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-1">{property.title}</h3>
                    {property.description && (
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{property.description}</p>
                    )}
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center text-emerald-600 font-bold">
                        {'BDT '}{property.price?.toLocaleString()}
                      </div>
                      {property.createdAt && (
                        <div className="flex items-center text-gray-500 text-xs">
                          <Calendar className="w-3 h-3 mr-1" />
                          {new Date(property.createdAt).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-blue-200 text-blue-600 hover:bg-blue-50"
                        onClick={() => setEditingProperty(property)}
                      >
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-red-200 text-red-600 hover:bg-red-50"
                        onClick={() => handleDeleteProperty(property._id)}
                      >
                        <Trash2 className="w-3 h-3 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {showEditProfile && user && (
        <ProfileEditModal
          user={user}
          onClose={() => setShowEditProfile(false)}
          onSave={handleProfileSave}
        />
      )}
      
      {showAddProperty && (
        <PropertyAddModal
          onClose={() => setShowAddProperty(false)}
          onSave={handleAddProperty}
        />
      )}
      
      {editingProperty && (
        <PropertyEditModal
          property={editingProperty}
          onClose={() => setEditingProperty(null)}
          onSave={handleEditProperty}
        />
      )}

      <Footer />
    </main>
  );
} 