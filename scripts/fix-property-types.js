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

// Property Schema (same as in the model)
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

async function checkAndFixPropertyTypes() {
  try {
    await connectDB();
    
    // Get all properties
    const properties = await Property.find({});
    console.log(`Found ${properties.length} properties`);
    
    // Check each property's type
    for (const property of properties) {
      console.log(`Property: ${property.title}`);
      console.log(`  Current propertyType: ${property.propertyType}`);
      
      // If propertyType is not in the expected enum, set it to 'house' as default
      const validTypes = ['apartment', 'villa', 'house', 'office', 'building', 'townhouse', 'shop', 'garage'];
      
      if (!validTypes.includes(property.propertyType)) {
        console.log(`  ❌ Invalid propertyType: ${property.propertyType}`);
        console.log(`  🔧 Setting to 'house' as default`);
        
        // Update the property
        await Property.findByIdAndUpdate(property._id, {
          propertyType: 'house',
          updatedAt: new Date()
        });
        
        console.log(`  ✅ Updated propertyType to 'house'`);
      } else {
        console.log(`  ✅ Valid propertyType: ${property.propertyType}`);
      }
      console.log('---');
    }
    
    console.log('Property type check and fix completed!');
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run the script
checkAndFixPropertyTypes(); 