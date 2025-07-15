import mongoose, { Document, Model, Schema } from 'mongoose';
import { IUser } from './user.model';

export interface IProperty extends Document {
  title: string;
  description: string;
  price: number;
  listingType: 'sell' | 'rent';
  propertyType: 'apartment' | 'villa' | 'house' | 'office' | 'building' | 'townhouse' | 'shop' | 'garage';
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  details: {
    sqft: number;
    bedrooms: number;
    bathrooms: number;
    yearBuilt?: number;
  };
  amenities: string[];
  images: string[];
  contactInfo: {
    name: string;
    phone: string;
    email: string;
  };
  owner: IUser['_id'];
  status: 'active' | 'pending' | 'sold' | 'rented';
  createdAt: Date;
  updatedAt: Date;
}

const propertySchema = new Schema<IProperty>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  listingType: {
    type: String,
    enum: ['sell', 'rent'],
    required: true,
  },
  propertyType: {
    type: String,
    enum: ['apartment', 'villa', 'house', 'office', 'building', 'townhouse', 'shop', 'garage'],
    required: true,
  },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
  },
  details: {
    sqft: { type: Number, required: true },
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    yearBuilt: { type: Number },
  },
  amenities: [{
    type: String,
  }],
  images: [{
    type: String,
  }],
  contactInfo: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'pending', 'sold', 'rented'],
    default: 'active',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Property: Model<IProperty> = mongoose.models.Property || mongoose.model<IProperty>('Property', propertySchema);

export default Property; 