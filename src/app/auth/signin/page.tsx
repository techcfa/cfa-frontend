"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { authService } from '../../services/authService';
import { Eye, EyeOff, Phone, Mail, Lock, ArrowLeft, Shield, CheckCircle, AlertCircle } from 'lucide-react';
import StyledInput from '../../Components/StyledInput';
import StyledButton from '../../Components/StyledButton';

const SignInPage = () => {
  const router = useRouter();
  const { login } = useAuth();
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Form data
  const [loginMethod, setLoginMethod] = useState<'mobile' | 'email'>('mobile');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (loginMethod === 'mobile' && (!mobileNumber || mobileNumber.length !== 10)) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }

    if (loginMethod === 'email' && (!email || !email.includes('@'))) {
      setError('Please enter a valid email address');
      return;
    }

    if (!password) {
      setError('Please enter your password');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const loginData = loginMethod === 'mobile' 
        ? { mobileNumber, password }
        : { email, password };

      const response = await authService.login(loginData);
      
      login(response.user, response.token);
      setSuccess('Login successful! Redirecting...');
      
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background with same styling as home page */}
      <div className="absolute inset-0">
        <img 
          src="/BG.png" 
          alt="Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>
      
      {/* Additional background patterns for depth */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          {/* Back Button */}
          <Link 
            href="/" 
            className="inline-flex items-center text-white/90 hover:text-white mb-6 transition-colors group"
          >
            <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium font-['Lato']">Back to Home</span>
          </Link>

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20"
          >
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
                <Shield className="text-white" size={28} />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 font-['Montserrat']">Welcome Back</h1>
              <p className="text-gray-600 font-['Lato']">Sign in to your CFA Protection account</p>
            </div>

            {/* Error/Success Messages */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 flex items-center"
              >
                <AlertCircle size={20} className="mr-3 text-red-500" />
                {error}
              </motion.div>
            )}

            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl mb-6 flex items-center"
              >
                <CheckCircle size={20} className="mr-3 text-green-500" />
                {success}
              </motion.div>
            )}

            {/* Login Method Toggle */}
            <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
              <button
                onClick={() => setLoginMethod('mobile')}
                className={`flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  loginMethod === 'mobile'
                    ? 'bg-white text-blue-600 shadow-sm transform scale-105'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <div className="flex items-center justify-center">
                  <Phone size={16} className="mr-2" />
                  Mobile Number
                </div>
              </button>
              <button
                onClick={() => setLoginMethod('email')}
                className={`flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  loginMethod === 'email'
                    ? 'bg-white text-blue-600 shadow-sm transform scale-105'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <div className="flex items-center justify-center">
                  <Mail size={16} className="mr-2" />
                  Email Address
                </div>
              </button>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSignIn} className="space-y-6">
              {/* Mobile Number or Email Input */}
              <StyledInput
                type={loginMethod === 'mobile' ? 'tel' : 'email'}
                label={loginMethod === 'mobile' ? 'Mobile Number' : 'Email Address'}
                value={loginMethod === 'mobile' ? mobileNumber : email}
                onChange={(e) => {
                  if (loginMethod === 'mobile') {
                    setMobileNumber(e.target.value.replace(/\D/g, '').slice(0, 10));
                  } else {
                    setEmail(e.target.value);
                  }
                }}
                placeholder={loginMethod === 'mobile' ? 'Enter your mobile number' : 'Enter your email address'}
                icon={loginMethod === 'mobile' ? Phone : Mail}
                maxLength={loginMethod === 'mobile' ? 10 : undefined}
                autoComplete={loginMethod === 'mobile' ? 'tel' : 'email'}
              />

              {/* Password Input */}
              <StyledInput
                type={showPassword ? 'text' : 'password'}
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                icon={Lock}
                rightIcon={showPassword ? EyeOff : Eye}
                onRightIconClick={() => setShowPassword(!showPassword)}
                autoComplete="current-password"
              />

              {/* Forgot Password Link */}
              <div className="text-right">
                <Link 
                  href="/auth/forgot-password" 
                  className="text-sm text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                >
                  Forgot your password?
                </Link>
              </div>

              {/* Sign In Button */}
              <StyledButton
                type="submit"
                loading={isLoading}
                loadingText="Signing In..."
                fullWidth
              >
                Sign In
              </StyledButton>
            </form>

            {/* Demo Credentials */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100"
            >
              <h3 className="text-sm font-semibold text-blue-900 mb-3 flex items-center">
                <Shield size={16} className="mr-2" />
                Demo Credentials
              </h3>
              <div className="text-xs text-blue-700 space-y-2">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  <span className="font-medium">Mobile:</span> 8707711852
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  <span className="font-medium">Password:</span> (any password works in demo mode)
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  <span className="font-medium">Demo OTP:</span> 123456
                </div>
              </div>
            </motion.div>

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-gray-600 font-['Lato']">
                Don't have an account?{' '}
                <Link href="/auth/signup" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
                  Sign Up
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
