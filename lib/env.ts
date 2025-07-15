// This file ensures environment variables are loaded correctly
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

// Export environment variables
export const MONGODB_URI = process.env.MONGODB_URI;
export const JWT_SECRET = process.env.JWT_SECRET;
export const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET;
export const NEXTAUTH_URL = process.env.NEXTAUTH_URL;

// Log environment variables (without sensitive information)
console.log('Environment variables loaded:');
console.log('MONGODB_URI:', MONGODB_URI ? 'Set' : 'Not set');
console.log('JWT_SECRET:', JWT_SECRET ? 'Set' : 'Not set');
console.log('NEXTAUTH_SECRET:', NEXTAUTH_SECRET ? 'Set' : 'Not set');
console.log('NEXTAUTH_URL:', NEXTAUTH_URL); 