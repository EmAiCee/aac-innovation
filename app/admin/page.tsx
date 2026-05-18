'use client';

import { useEffect, useState, useCallback } from 'react';
import { Calendar, Clock, CheckCircle, Star, Filter, Search, Download, RefreshCw, X, MessageSquare, Eye } from 'lucide-react';
import toast from 'react-hot-toast';

// Define the Booking interface
interface Booking {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  service: string;
  preferredDate: string;
  createdAt: string;
  status: string;
  message?: string;
}

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);
  const [selectedBookingName, setSelectedBookingName] = useState('');

  const fetchBookings = useCallback(async () => {
    try {
      const res = await fetch('/api/bookings');
      const data = await res.json();
      if (data.success) {
        setBookings(data.data);
        setFilteredBookings(data.data);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast.error('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  }, []);

  const applyFilters = useCallback(() => {
    let filtered = [...bookings];
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter((b: Booking) => b.status === statusFilter);
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter((b: Booking) => 
        b.fullName.toLowerCase().includes(term) ||
        b.email.toLowerCase().includes(term) ||
        b.phone.includes(term) ||
        b.service.toLowerCase().includes(term) ||
        (b.message && b.message.toLowerCase().includes(term))
      );
    }
    
    setFilteredBookings(filtered);
  }, [bookings, statusFilter, searchTerm]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      
      if (res.ok) {
        setBookings(prev => prev.map((b: Booking) => 
          b._id === id ? { ...b, status } : b
        ));
        toast.success(`Booking marked as ${status}`);
      }
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const deleteBooking = async (id: string) => {
    if (confirm('Are you sure you want to delete this booking?')) {
      try {
        const res = await fetch(`/api/bookings/${id}`, {
          method: 'DELETE',
        });
        
        if (res.ok) {
          setBookings(prev => prev.filter((b: Booking) => b._id !== id));
          toast.success('Booking deleted successfully');
        }
      } catch (error) {
        toast.error('Failed to delete booking');
      }
    }
  };

  const exportToCSV = () => {
    const headers = ['Full Name', 'Email', 'Phone', 'Service', 'Preferred Date', 'Status', 'Message', 'Created At'];
    
    const rows = filteredBookings.map((booking: Booking) => [
      booking.fullName,
      booking.email,
      booking.phone,
      booking.service,
      new Date(booking.preferredDate).toLocaleDateString(),
      booking.status,
      booking.message || '',
      new Date(booking.createdAt).toLocaleDateString()
    ]);
    
    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bookings_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success('Export complete!');
  };

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
  };

  const viewFullMessage = (message: string, name: string) => {
    setSelectedMessage(message);
    setSelectedBookingName(name);
  };

  const stats = {
    total: bookings.length,
    pending: bookings.filter((b: Booking) => b.status === 'pending').length,
    confirmed: bookings.filter((b: Booking) => b.status === 'confirmed').length,
    completed: bookings.filter((b: Booking) => b.status === 'completed').length,
    cancelled: bookings.filter((b: Booking) => b.status === 'cancelled').length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-blue mx-auto"></div>
          <p className="mt-6 text-text-light font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom">
      <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary-navy">Dashboard Overview</h1>
          <p className="text-text-light mt-1">Manage your consultations and bookings</p>
        </div>
        <button
          onClick={exportToCSV}
          disabled={filteredBookings.length === 0}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50"
        >
          <Download size={16} />
          Export to CSV
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition cursor-pointer" onClick={() => setStatusFilter('all')}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-light text-sm">Total Bookings</p>
              <p className="text-2xl font-bold text-primary-navy">{stats.total}</p>
            </div>
            <Calendar className="text-primary-blue" size={32} />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition cursor-pointer" onClick={() => setStatusFilter('pending')}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-light text-sm">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
            </div>
            <Clock className="text-yellow-600" size={32} />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition cursor-pointer" onClick={() => setStatusFilter('confirmed')}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-light text-sm">Confirmed</p>
              <p className="text-2xl font-bold text-green-600">{stats.confirmed}</p>
            </div>
            <CheckCircle className="text-green-600" size={32} />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition cursor-pointer" onClick={() => setStatusFilter('completed')}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-light text-sm">Completed</p>
              <p className="text-2xl font-bold text-blue-600">{stats.completed}</p>
            </div>
            <Star className="text-blue-600" size={32} />
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition cursor-pointer" onClick={() => setStatusFilter('cancelled')}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-light text-sm">Cancelled</p>
              <p className="text-2xl font-bold text-red-600">{stats.cancelled || 0}</p>
            </div>
            <X className="text-red-600" size={32} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
        <div className="p-4 border-b border-gray-100">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-text-dark hover:text-primary-blue transition"
          >
            <Filter size={18} />
            <span className="font-medium">Filters & Search</span>
          </button>
        </div>
        
        {showFilters && (
          <div className="p-4 bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-dark mb-2">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Search by name, email, phone, service, or message..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-dark mb-2">Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
            
            {(statusFilter !== 'all' || searchTerm) && (
              <div className="mt-4 flex justify-end">
                <button
                  onClick={clearFilters}
                  className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1"
                >
                  <X size={14} />
                  Clear filters
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mb-4 flex justify-between items-center">
        <p className="text-sm text-text-light">
          Showing {filteredBookings.length} of {bookings.length} bookings
        </p>
        <button
          onClick={() => fetchBookings()}
          className="flex items-center gap-1 text-sm text-primary-blue hover:text-primary-teal transition"
        >
          <RefreshCw size={14} />
          Refresh
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50">
          <h2 className="text-xl font-bold text-primary-navy">Consultations</h2>
          <p className="text-text-light text-sm mt-1">View and manage all booking requests</p>
        </div>
        
        {filteredBookings.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-text-light font-medium">No bookings found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-light uppercase">Client</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-light uppercase">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-light uppercase">Service</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-light uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-light uppercase">Message</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-light uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-light uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredBookings.map((booking: Booking) => (
                  <tr key={booking._id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <div className="font-medium text-text-dark">{booking.fullName}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">{booking.email}</div>
                      <div className="text-xs text-text-light">{booking.phone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">{booking.service}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">{new Date(booking.preferredDate).toLocaleDateString()}</div>
                    </td>
                    <td className="px-6 py-4">
                      {booking.message ? (
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{booking.message.substring(0, 40)}...</span>
                          <button
                            onClick={() => viewFullMessage(booking.message!, booking.fullName)}
                            className="text-primary-blue text-xs"
                          >
                            View Full
                          </button>
                        </div>
                      ) : (
                        <span className="text-text-light italic">No message</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={booking.status}
                        onChange={(e) => updateStatus(booking._id, e.target.value)}
                        className="px-2 py-1 rounded text-xs"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => deleteBooking(booking._id)}
                        className="text-red-600 text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selectedMessage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Message from {selectedBookingName}</h3>
              <button onClick={() => setSelectedMessage(null)}>✕</button>
            </div>
            <p className="text-text-dark whitespace-pre-wrap">{selectedMessage}</p>
            <button
              onClick={() => setSelectedMessage(null)}
              className="mt-4 px-4 py-2 bg-primary-blue text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}