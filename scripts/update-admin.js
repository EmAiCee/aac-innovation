const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

const uri = 'mongodb+srv://algonimusa202_db_user:vGFq5mBnzda260w8@cluster0.4byeyis.mongodb.net/aacinnovations?';

async function changeAdminCredentials() {
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    const db = client.db('aacinnovations');
    const users = db.collection('users');
    
    // 👇👇👇 CHANGE THESE TO YOUR CREDENTIALS 👇👇👇
    const MY_EMAIL = 'algonimusa202@gmail.com';      // Your email
    const MY_PASSWORD = 'Mic2002.';  // Your password
    const MY_NAME = 'EmAiCee';            // Your name
    
    // Remove old admin
    await users.deleteMany({ email: 'admin@aacinnovations.com' });
    
    // Create new admin with your credentials
    const hashedPassword = await bcrypt.hash(MY_PASSWORD, 10);
    await users.insertOne({
      email: MY_EMAIL,
      password: hashedPassword,
      name: MY_NAME,
      role: 'admin',
      createdAt: new Date(),
    });
    
    console.log('✅ Admin updated!');
    console.log('Email:', MY_EMAIL);
    console.log('Password:', MY_PASSWORD);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
  }
}

changeAdminCredentials();