'use client';

import { useState } from 'react';
import { Plus, Edit, Trash2, ImageIcon } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminPortfolioPage() {
  const [portfolioItems, setPortfolioItems] = useState([
    { id: 1, title: 'E-Commerce Platform', category: 'Web Design', image: '/placeholder.jpg' },
    { id: 2, title: 'Corporate Branding', category: 'Branding', image: '/placeholder.jpg' },
    { id: 3, title: 'Social Media Campaign', category: 'Marketing', image: '/placeholder.jpg' },
  ]);

  const addNew = () => {
    toast.success('Add portfolio functionality coming soon!');
  };

  const editItem = () => {
    toast.success('Edit functionality coming soon!');
  };

  const deleteItem = (id: number) => {
    if (confirm('Are you sure you want to delete this item?')) {
      setPortfolioItems(prev => prev.filter(item => item.id !== id));
      toast.success('Portfolio item deleted');
    }
  };

  return (
    <div className="container-custom">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-primary-navy">Portfolio Management</h1>
          <p className="text-text-light mt-1">Add, edit, or remove portfolio items</p>
        </div>
        <button
          onClick={addNew}
          className="flex items-center gap-2 bg-gradient-to-r from-primary-blue to-primary-teal text-white px-4 py-2 rounded-lg hover:shadow-lg transition"
        >
          <Plus size={18} />
          Add New Project
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-light uppercase">Image</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-light uppercase">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-light uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-light uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {portfolioItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                      <ImageIcon size={20} className="text-gray-400" />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-text-dark">{item.title}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button 
                        onClick={editItem}
                        className="text-blue-600 hover:text-blue-800 transition"
                      >
                        <Edit size={18} />
                      </button>
                      <button 
                        onClick={() => deleteItem(item.id)}
                        className="text-red-600 hover:text-red-800 transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}