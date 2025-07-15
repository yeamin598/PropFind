import mongoose from 'mongoose';

// Hardcoded MongoDB URI for testing
const MONGODB_URI = "mongodb+srv://real_estate:ucI0ABE4j5fgKtgJ@realestate.77czgsj.mongodb.net/real_estate";

console.log('MongoDB URI:', MONGODB_URI);

interface CachedConnection {
  conn: mongoose.Connection | null;
  promise: Promise<mongoose.Connection> | null;
}

declare global {
  var mongoose: CachedConnection | undefined;
}

let cached: CachedConnection = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

async function dbConnect(): Promise<mongoose.Connection> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    console.log('Connecting to MongoDB...');
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('MongoDB connected successfully');
      return mongoose.connection;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    console.error('MongoDB connection error:', e);
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect; 