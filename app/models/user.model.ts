import mongoose, { Document, Model } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role: 'user' | 'admin';
  profilePhoto?: string;
  coverPhoto?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: [true, 'Please provide a name']
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: [true, 'Please provide a password']
  },
  phone: {
    type: String,
  },
  profilePhoto: {
    type: String,
  },
  coverPhoto: {
    type: String,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  }
}, {
  timestamps: true
});

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User; 