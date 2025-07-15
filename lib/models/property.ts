import mongoose from 'mongoose';

export interface IProperty {
  title: string;
  description: string;
  price: number;
  location: string;
  type: 'sale' | 'rent';
  status: 'available' | 'sold' | 'rented' | 'featured';
  bedrooms: number;
  bathrooms: number;
  area: number;
  images: string[];
  owner: string;
  createdAt: Date;
  updatedAt: Date;
}

const propertySchema = new mongoose.Schema<IProperty>(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
    },
    price: {
      type: Number,
      required: [true, 'Please provide a price'],
    },
    location: {
      type: String,
      required: [true, 'Please provide a location'],
    },
    type: {
      type: String,
      enum: ['sale', 'rent'],
      required: [true, 'Please specify if this is for sale or rent'],
    },
    status: {
      type: String,
      enum: ['available', 'sold', 'rented', 'featured'],
      default: 'available',
    },
    bedrooms: {
      type: Number,
      required: [true, 'Please specify the number of bedrooms'],
    },
    bathrooms: {
      type: Number,
      required: [true, 'Please specify the number of bathrooms'],
    },
    area: {
      type: Number,
      required: [true, 'Please specify the area'],
    },
    images: [{
      type: String,
    }],
    owner: {
      type: String,
      required: [true, 'Please provide the owner email'],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Property || mongoose.model<IProperty>('Property', propertySchema); 