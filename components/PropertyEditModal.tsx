import { useState } from 'react';

type PropertyType = {
  _id: string
  title: string
  price: number
  propertyType?: string
  listingType?: string
  status?: string
  images?: string[]
  details?: {
    sqft?: number
    bedrooms?: number
    bathrooms?: number
    yearBuilt?: number
  }
  amenities?: string[]
  contactInfo?: {
    name?: string
    phone?: string
    email?: string
  }
  owner?: {
    _id: string
    name?: string
    email?: string
  }
}

type PropertyEditModalProps = {
  property: PropertyType
  onClose: () => void
  onSave: (property: PropertyType) => Promise<void>
}

export default function PropertyEditModal({ property, onClose, onSave }: PropertyEditModalProps) {
  const [formData, setFormData] = useState({
    title: property.title || '',
    price: property.price || '',
    // image: property.images?.[0] || '', // Remove image field
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await onSave({ 
        ...property,
        ...formData, 
        _id: property._id,
        price: Number(formData.price)
      });
      onClose();
    } catch (err) {
      setError('Failed to update property.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600" onClick={onClose}>&times;</button>
        <h2 className="text-xl font-bold mb-4">Edit Property</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              value={formData.price}
              onChange={e => setFormData({ ...formData, price: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
              required
            />
          </div>
          {/* Removed Image URL field */}
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button
            type="submit"
            className="w-full bg-emerald-500 text-white py-2 rounded hover:bg-emerald-600"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
} 