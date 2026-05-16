'use client';

import { useState } from 'react';
import { Edit, Eye, EyeOff, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminServicesPage() {
  const [services, setServices] = useState([
    { id: 1, name: 'Professional Website Design', status: 'Active', description: 'Custom, responsive websites that drive conversions and showcase your brand' },
    { id: 2, name: 'Company Registration Assistance', status: 'Active', description: 'Hassle-free business registration with expert guidance throughout the process' },
    { id: 3, name: 'Branding & Logo Design', status: 'Active', description: 'Memorable brand identities that tell your story and captivate your audience' },
    { id: 4, name: 'Social Media Management', status: 'Active', description: 'Strategic content and engagement to grow your online community' },
    { id: 5, name: 'Digital Marketing', status: 'Active', description: 'Data-driven campaigns that reach your target audience and drive growth' },
  ]);

  const editService = (service: any) => {
    toast.success(`Edit ${service.name} functionality coming soon!`);
  };

  const toggleStatus = (id: number) => {
    setServices(prev => prev.map(service => 
      service.id === id 
        ? { ...service, status: service.status === 'Active' ? 'Inactive' : 'Active' }
        : service
    ));
    toast.success('Service status updated');
  };

  return (
    <div className="container-custom">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary-navy">Services Management</h1>
        <p className="text-text-light mt-1">Manage your service offerings - prices are discussed per consultation</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition group">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-primary-blue to-primary-teal rounded-lg flex items-center justify-center group-hover:scale-110 transition">
                  <Sparkles size={24} className="text-white" />
                </div>
                <button
                  onClick={() => toggleStatus(service.id)}
                  className={`px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${
                    service.status === 'Active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {service.status === 'Active' ? <Eye size={12} /> : <EyeOff size={12} />}
                  {service.status}
                </button>
              </div>
              
              <h3 className="text-lg font-bold text-primary-navy mb-2">{service.name}</h3>
              <p className="text-text-light text-sm mb-4 line-clamp-2">{service.description}</p>
              
              <div className="flex justify-end">
                <button
                  onClick={() => editService(service)}
                  className="flex items-center gap-1 text-primary-blue hover:text-primary-teal text-sm font-medium transition"
                >
                  <Edit size={16} />
                  Edit Service
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <p className="text-sm text-center text-text-dark">
          💡 <span className="font-semibold">Note:</span> Prices are discussed per consultation based on client needs and project requirements.
        </p>
      </div>
    </div>
  );
}