const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://algonimusa202_db_user:vGFq5mBnzda260w8@cluster0.4byeyis.mongodb.net/aacinnovations?';

const services = [
  {
    title: 'Professional Website Design',
    description: 'Custom, responsive websites that drive conversions and showcase your brand.',
    icon: 'Globe',
    gradient: 'from-blue-500 to-cyan-500',
    features: ['Responsive Design', 'SEO Optimized', 'Fast Loading'],
    isActive: true,
    order: 0,
  },
  {
    title: 'Company Registration Assistance',
    description: 'Hassle-free business registration with expert guidance throughout the process.',
    icon: 'FileText',
    gradient: 'from-emerald-500 to-teal-500',
    features: ['Business Structure Advice', 'Document Preparation', 'Compliance Check'],
    isActive: true,
    order: 1,
  },
  {
    title: 'Branding & Logo Design',
    description: 'Memorable brand identities that tell your story and captivate your audience.',
    icon: 'Palette',
    gradient: 'from-purple-500 to-pink-500',
    features: ['Logo Creation', 'Color Strategy', 'Brand Guidelines'],
    isActive: true,
    order: 2,
  },
  {
    title: 'Social Media Management',
    description: 'Strategic content and engagement to grow your online community.',
    icon: 'Share2',
    gradient: 'from-orange-500 to-red-500',
    features: ['Content Calendar', 'Engagement Tracking', 'Analytics Reports'],
    isActive: true,
    order: 3,
  },
  {
    title: 'Digital Marketing',
    description: 'Data-driven campaigns that reach your target audience and drive growth.',
    icon: 'Megaphone',
    gradient: 'from-indigo-500 to-violet-500',
    features: ['SEO/SEM', 'Email Marketing', 'PPC Campaigns'],
    isActive: true,
    order: 4,
  },
];

async function seedServices() {
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db('aacinnovations');
    const servicesCollection = db.collection('services');
    
    // Clear existing services
    await servicesCollection.deleteMany({});
    console.log('Cleared existing services');
    
    // Insert new services
    const result = await servicesCollection.insertMany(services);
    console.log(`✅ Inserted ${result.insertedCount} services`);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
  }
}

seedServices();