const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

// Your MongoDB connection string from .env.local
const uri = 'mongodb+srv://algonimusa202_db_user:vGFq5mBnzda260w8@cluster0.4byeyis.mongodb.net/aacinnovations?';

async function createAdmin() {
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db('aacinnovations');
    const users = db.collection('users');
    
    // Check if admin exists
    const existingAdmin = await users.findOne({ email: 'admin@aacinnovations.com' });
    
    if (existingAdmin) {
      console.log('Admin already exists!');
      console.log('Email:', existingAdmin.email);
      return;
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    // Create admin
    const result = await users.insertOne({
      email: 'admin@aacinnovations.com',
      password: hashedPassword,
      name: 'Super Admin',
      role: 'admin',
      createdAt: new Date(),
    });
    
    console.log('✅ Admin user created successfully!');
    console.log('Email: admin@aacinnovations.com');
    console.log('Password: admin123');
    console.log('User ID:', result.insertedId);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
  }
}

createAdmin();