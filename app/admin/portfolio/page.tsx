'use client';

import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, ImageIcon, Star, X, Upload, GripVertical } from 'lucide-react';
import toast from 'react-hot-toast';
import Image from 'next/image';

interface PortfolioItem {
  _id: string;
  title: string;
  category: string;
  description: string;
  clientName: string;
  year: string;
  results: string;
  image: string;
  featured: boolean;
  order: number;
}

export default function AdminPortfolioPage() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Web Design',
    description: '',
    clientName: '',
    year: new Date().getFullYear().toString(),
    results: '',
    image: '',
    featured: false,
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await fetch('/api/portfolio');
      const data = await res.json();
      if (data.success) {
        setItems(data.data);
      }
    } catch (error) {
      toast.error('Failed to load portfolio items');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = editingItem ? `/api/portfolio/${editingItem._id}` : '/api/portfolio';
      const method = editingItem ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      const data = await res.json();
      
      if (data.success) {
        toast.success(editingItem ? 'Item updated successfully' : 'Item added successfully');
        setShowModal(false);
        setEditingItem(null);
        resetForm();
        fetchItems();
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      toast.error('Failed to save item');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this portfolio item?')) {
      try {
        const res = await fetch(`/api/portfolio/${id}`, { method: 'DELETE' });
        const data = await res.json();
        
        if (data.success) {
          toast.success('Item deleted successfully');
          fetchItems();
        } else {
          toast.error(data.error);
        }
      } catch (error) {
        toast.error('Failed to delete item');
      }
    }
  };

  const handleEdit = (item: PortfolioItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      category: item.category,
      description: item.description,
      clientName: item.clientName || '',
      year: item.year || new Date().getFullYear().toString(),
      results: item.results || '',
      image: item.image || '',
      featured: item.featured,
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      category: 'Web Design',
      description: '',
      clientName: '',
      year: new Date().getFullYear().toString(),
      results: '',
      image: '',
      featured: false,
    });
  };

  const toggleFeatured = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch(`/api/portfolio/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ featured: !currentStatus }),
      });
      
      if (res.ok) {
        fetchItems();
        toast.success(currentStatus ? 'Removed from featured' : 'Added to featured');
      }
    } catch (error) {
      toast.error('Failed to update featured status');
    }
  };

  const categories = ['Web Design', 'Branding', 'Marketing', 'Consulting', 'Other'];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-blue"></div>
      </div>
    );
  }

  return (
    <div className="container-custom">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-primary-navy">Portfolio Management</h1>
          <p className="text-text-light mt-1">Manage your portfolio projects</p>
        </div>
        <button
          onClick={() => {
            setEditingItem(null);
            resetForm();
            setShowModal(true);
          }}
          className="flex items-center gap-2 bg-gradient-to-r from-primary-blue to-primary-teal text-white px-4 py-2 rounded-lg hover:shadow-lg transition"
        >
          <Plus size={18} />
          Add New Project
        </button>
      </div>

      {/* Portfolio Grid */}
      {items.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center">
          <div className="text-6xl mb-4">🎨</div>
          <h3 className="text-xl font-semibold text-primary-navy mb-2">No portfolio items yet</h3>
          <p className="text-text-light">Click "Add New Project" to showcase your work</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition group">
              {/* Image */}
              <div className="relative h-48 bg-gray-200">
                {item.image && item.image !== '/placeholder.jpg' ? (
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <ImageIcon size={48} className="text-gray-400" />
                  </div>
                )}
                {item.featured && (
                  <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                    <Star size={12} />
                    Featured
                  </div>
                )}
              </div>
              
              {/* Content */}
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs text-primary-blue font-semibold">{item.category}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleFeatured(item._id, item.featured)}
                      className={`p-1 rounded ${item.featured ? 'text-yellow-500' : 'text-gray-400'} hover:text-yellow-500 transition`}
                      title={item.featured ? 'Remove from featured' : 'Add to featured'}
                    >
                      <Star size={16} />
                    </button>
                    <button
                      onClick={() => handleEdit(item)}
                      className="p-1 text-blue-600 hover:text-blue-800 transition"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="p-1 text-red-600 hover:text-red-800 transition"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <h3 className="font-bold text-primary-navy mb-1">{item.title}</h3>
                <p className="text-text-light text-sm line-clamp-2">{item.description}</p>
                {item.clientName && (
                  <p className="text-xs text-text-light mt-2">Client: {item.clientName}</p>
                )}
                {item.results && (
                  <p className="text-xs text-primary-teal mt-1 font-semibold">{item.results}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-xl font-bold text-primary-navy">
                {editingItem ? 'Edit Portfolio Item' : 'Add New Portfolio Item'}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-dark mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-dark mb-1">Category *</label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-dark mb-1">Description *</label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-dark mb-1">Client Name</label>
                  <input
                    type="text"
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-dark mb-1">Year</label>
                  <input
                    type="text"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-dark mb-1">Results/Achievement</label>
                <input
                  type="text"
                  placeholder="e.g., 150% increase in sales"
                  value={formData.results}
                  onChange={(e) => setFormData({ ...formData, results: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-dark mb-1">Image URL</label>
                <input
                  type="text"
                  placeholder="https://images.unsplash.com/..."
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                />
                <p className="text-xs text-text-light mt-1">Enter an image URL (Unsplash, Cloudinary, etc.)</p>
              </div>
              
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 text-primary-blue rounded"
                />
                <label htmlFor="featured" className="text-sm font-medium text-text-dark">
                  Feature this project on homepage
                </label>
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-primary-blue to-primary-teal text-white rounded-lg hover:shadow-lg transition"
                >
                  {editingItem ? 'Update' : 'Create'} Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}