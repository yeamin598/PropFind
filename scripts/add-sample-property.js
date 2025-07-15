const mongoose = require('mongoose');

// MongoDB connection string
const MONGODB_URI = 'mongodb+srv://real_estate:ucI0ABE4j5fgKtgJ@realestate.77czgsj.mongodb.net/real_estate';

// Define the Property schema
const propertySchema = new mongoose.Schema({
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
    type: mongoose.Schema.Types.ObjectId,
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

// Create sample properties
const sampleProperties = [
  {
    title: "Modern Apartment in Downtown",
    description: "A beautiful modern apartment in the heart of downtown with stunning city views.",
    price: 350000,
    listingType: "sell",
    propertyType: "apartment",
    address: {
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
    },
    details: {
      sqft: 1200,
      bedrooms: 2,
      bathrooms: 2,
      yearBuilt: 2015,
    },
    amenities: ["Parking", "Gym", "Pool", "Security"],
    images: ["/placeholder.svg"],
    contactInfo: {
      name: "John Doe",
      phone: "123-456-7890",
      email: "john@example.com",
    },
    status: "active",
  },
  {
    title: "Luxury Villa with Pool",
    description: "A stunning luxury villa with a private pool and beautiful garden.",
    price: 850000,
    listingType: "sell",
    propertyType: "villa",
    address: {
      street: "456 Oak Ave",
      city: "Los Angeles",
      state: "CA",
      zipCode: "90001",
    },
    details: {
      sqft: 3500,
      bedrooms: 4,
      bathrooms: 3,
      yearBuilt: 2018,
    },
    amenities: ["Pool", "Garden", "Garage", "Security System"],
    images: ["/placeholder.svg"],
    contactInfo: {
      name: "Jane Smith",
      phone: "987-654-3210",
      email: "jane@example.com",
    },
    status: "active",
  },
  {
    title: "Cozy House in Suburbs",
    description: "A cozy family house in a quiet suburban neighborhood.",
    price: 450000,
    listingType: "sell",
    propertyType: "house",
    address: {
      street: "789 Pine St",
      city: "Chicago",
      state: "IL",
      zipCode: "60601",
    },
    details: {
      sqft: 2200,
      bedrooms: 3,
      bathrooms: 2,
      yearBuilt: 2010,
    },
    amenities: ["Garage", "Garden", "Basement"],
    images: ["/placeholder.svg"],
    contactInfo: {
      name: "Bob Johnson",
      phone: "555-123-4567",
      email: "bob@example.com",
    },
    status: "active",
  },
  {
    title: "Downtown Office Space",
    description: "Prime office space in the heart of downtown.",
    price: 2500,
    listingType: "rent",
    propertyType: "office",
    address: {
      street: "321 Business Ave",
      city: "San Francisco",
      state: "CA",
      zipCode: "94101",
    },
    details: {
      sqft: 1500,
      bedrooms: 0,
      bathrooms: 2,
      yearBuilt: 2020,
    },
    amenities: ["Parking", "Security", "High-Speed Internet"],
    images: ["/placeholder.svg"],
    contactInfo: {
      name: "Alice Brown",
      phone: "444-555-6666",
      email: "alice@example.com",
    },
    status: "active",
  },
];

// Connect to MongoDB and add sample properties
async function addSampleProperties() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Create a dummy user ID for the owner field
    const dummyUserId = new mongoose.Types.ObjectId();

    // Add owner ID to each property
    const propertiesWithOwner = sampleProperties.map(property => ({
      ...property,
      owner: dummyUserId,
    }));

    // Insert properties
    const Property = mongoose.model('Property', propertySchema);
    const result = await Property.insertMany(propertiesWithOwner);
    console.log(`Added ${result.length} sample properties to the database`);
    
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error adding sample properties:', error);
  }
}

addSampleProperties(); 