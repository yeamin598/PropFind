const mongoose = require('mongoose');

// Connect to MongoDB
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/real-estate');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

// Property Schema
const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  listingType: { type: String, enum: ['sell', 'rent'], required: true },
  propertyType: { 
    type: String, 
    enum: ['apartment', 'villa', 'house', 'office', 'building', 'townhouse', 'shop', 'garage'],
    required: true 
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
  amenities: [{ type: String }],
  images: [{ type: String }],
  contactInfo: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
  },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['active', 'pending', 'sold', 'rented'], default: 'active' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Property = mongoose.model('Property', propertySchema);

async function checkProperties() {
  try {
    await connectDB();
    
    // Get all properties
    const properties = await Property.find({});
    console.log(`Found ${properties.length} properties in database`);
    
    if (properties.length === 0) {
      console.log('No properties found in database');
      return;
    }
    
    // Check each property
    properties.forEach((property, index) => {
      console.log(`\nProperty ${index + 1}:`);
      console.log(`  Title: ${property.title}`);
      console.log(`  Property Type: ${property.propertyType}`);
      console.log(`  Listing Type: ${property.listingType}`);
      console.log(`  Price: ${property.price}`);
      console.log(`  Address: ${property.address.street}, ${property.address.city}`);
      console.log(`  Details: ${property.details.bedrooms} beds, ${property.details.bathrooms} baths, ${property.details.sqft} sqft`);
    });
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\nDisconnected from MongoDB');
  }
}

// Run the script
checkProperties(); 