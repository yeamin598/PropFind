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

async function setPropertyTypes() {
  try {
    await connectDB();
    
    // Get all properties
    const properties = await Property.find({});
    console.log(`Found ${properties.length} properties in database`);
    
    if (properties.length === 0) {
      console.log('No properties found in database');
      return;
    }
    
    // Update each property to have a valid propertyType
    for (const property of properties) {
      console.log(`\nChecking property: ${property.title}`);
      console.log(`  Current propertyType: ${property.propertyType}`);
      
      // If propertyType is missing or invalid, set it to 'house'
      if (!property.propertyType || !['apartment', 'villa', 'house', 'office', 'building', 'townhouse', 'shop', 'garage'].includes(property.propertyType)) {
        console.log(`  Setting propertyType to 'house'`);
        
        await Property.findByIdAndUpdate(property._id, {
          propertyType: 'house',
          updatedAt: new Date()
        });
        
        console.log(`  ✅ Updated propertyType to 'house'`);
      } else {
        console.log(`  ✅ PropertyType is valid: ${property.propertyType}`);
      }
    }
    
    console.log('\nProperty type update completed!');
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\nDisconnected from MongoDB');
  }
}

// Run the script
setPropertyTypes(); 