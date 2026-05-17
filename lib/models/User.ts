import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  name: {
    type: String,
    default: 'Admin',
  },
  role: {
    type: String,
    enum: ['admin', 'manager'],
    default: 'admin',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Compare password method - ONLY THIS, NO pre-save
UserSchema.methods.comparePassword = async function(candidatePassword: string) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.models.User || mongoose.model('User', UserSchema);