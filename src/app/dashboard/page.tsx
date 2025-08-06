"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { User, Shield, CreditCard, FileText } from 'lucide-react';

const DashboardPage = () => {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth/signin');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect to sign in
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome, {user?.fullName}!</h1>
          <p className="text-xl text-gray-600">Your Cyber Fraud Protection Dashboard</p>
        </motion.div>

        {/* User Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8"
        >
          <div className="flex items-center mb-6">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <User className="text-blue-600" size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Account Information</h2>
              <p className="text-gray-600">Your profile details</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <p className="text-lg text-gray-900">{user?.fullName}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Customer ID</label>
              <p className="text-lg text-gray-900">{user?.customerId}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <p className="text-lg text-gray-900">{user?.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
              <p className="text-lg text-gray-900">{user?.mobileNumber}</p>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-3 gap-6 mb-8"
        >
          <div className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow cursor-pointer">
            <div className="flex items-center mb-4">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <Shield className="text-green-600" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Protection Status</h3>
            </div>
            <p className="text-gray-600 mb-4">Check your current protection status and coverage details.</p>
            <button className="text-blue-600 hover:text-blue-700 font-medium">
              View Details →
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow cursor-pointer">
            <div className="flex items-center mb-4">
              <div className="bg-purple-100 p-3 rounded-full mr-4">
                <CreditCard className="text-purple-600" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Subscription</h3>
            </div>
            <p className="text-gray-600 mb-4">Manage your subscription plans and payment information.</p>
            <button className="text-blue-600 hover:text-blue-700 font-medium">
              Manage Plan →
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow cursor-pointer">
            <div className="flex items-center mb-4">
              <div className="bg-orange-100 p-3 rounded-full mr-4">
                <FileText className="text-orange-600" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Reports</h3>
            </div>
            <p className="text-gray-600 mb-4">View your security reports and incident history.</p>
            <button className="text-blue-600 hover:text-blue-700 font-medium">
              View Reports →
            </button>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <div className="bg-blue-100 p-2 rounded-full mr-4">
                <Shield className="text-blue-600" size={16} />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Account Created</p>
                <p className="text-sm text-gray-600">Welcome to Cyber Fraud Protection</p>
              </div>
              <span className="text-sm text-gray-500">Just now</span>
            </div>
            
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <div className="bg-green-100 p-2 rounded-full mr-4">
                <User className="text-green-600" size={16} />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Profile Updated</p>
                <p className="text-sm text-gray-600">Your account information has been verified</p>
              </div>
              <span className="text-sm text-gray-500">Just now</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardPage; 