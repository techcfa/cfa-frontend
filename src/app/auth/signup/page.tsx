"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { authService } from '../../services/authService';
import { Eye, EyeOff, Phone, Mail, User, Lock, ArrowLeft, Shield, CheckCircle } from 'lucide-react';
import StyledInput from '../../Components/StyledInput';
import StyledButton from '../../Components/StyledButton';

const SignUpPage = () => {
  const router = useRouter();
  const { login } = useAuth();
  
  const [step, setStep] = useState<'phone' | 'otp' | 'details'>('phone');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Form data
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // OTP countdown
  const [otpCountdown, setOtpCountdown] = useState(0);

  const startOtpCountdown = () => {
    setOtpCountdown(60);
    const interval = setInterval(() => {
      setOtpCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSendOTP = async () => {
    if (!mobileNumber || mobileNumber.length !== 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      await authService.sendOTP({ mobileNumber });
      setSuccess('OTP sent successfully!');
      setStep('otp');
      startOtpCountdown();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await authService.verifyOTP({
        mobileNumber,
        otp,
        fullName: '',
        email: '',
        password: ''
      });
      setStep('details');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!fullName.trim()) {
      setError('Please enter your full name');
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await authService.verifyOTP({
        mobileNumber,
        otp,
        fullName,
        email,
        password
      });

      login(response.user, response.token);
      setSuccess('Registration successful! Redirecting...');
      
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resendOTP = async () => {
    if (otpCountdown > 0) return;
    
    setIsLoading(true);
    setError('');

    try {
      await authService.sendOTP({ mobileNumber });
      setSuccess('OTP resent successfully!');
      startOtpCountdown();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to resend OTP. Please try again.');
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2 font-['Montserrat']">Join CFA Protection</h1>
              <p className="text-gray-600 font-['Lato']">Secure your digital life with cyber fraud protection</p>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  step === 'phone' 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                    : step === 'otp' || step === 'details'
                    ? 'bg-green-500 text-white shadow-lg'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {step === 'phone' ? '1' : <CheckCircle size={16} />}
                </div>
                <div className={`w-16 h-1 mx-3 transition-all duration-300 ${
                  step !== 'phone' ? 'bg-gradient-to-r from-green-500 to-blue-500' : 'bg-gray-200'
                }`}></div>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  step === 'otp' 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                    : step === 'details'
                    ? 'bg-green-500 text-white shadow-lg'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {step === 'otp' ? '2' : step === 'details' ? <CheckCircle size={16} /> : '2'}
                </div>
                <div className={`w-16 h-1 mx-3 transition-all duration-300 ${
                  step === 'details' ? 'bg-gradient-to-r from-green-500 to-blue-500' : 'bg-gray-200'
                }`}></div>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  step === 'details' 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  3
                </div>
              </div>
            </div>

            {/* Error/Success Messages */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 flex items-center"
              >
                <div className="w-2 h-2 bg-red-500 rounded-full mr-3 animate-pulse"></div>
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

            {/* Step 1: Phone Number */}
            {step === 'phone' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <StyledInput
                  type="tel"
                  label="Mobile Number"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="Enter your mobile number"
                  icon={Phone}
                  maxLength={10}
                  autoComplete="tel"
                />

                <StyledButton
                  onClick={handleSendOTP}
                  disabled={mobileNumber.length !== 10}
                  loading={isLoading}
                  loadingText="Sending OTP..."
                  fullWidth
                >
                  Send OTP
                </StyledButton>
              </motion.div>
            )}

            {/* Step 2: OTP Verification */}
            {step === 'otp' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <StyledInput
                  type="text"
                  label={`Enter OTP sent to ${mobileNumber}`}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="Enter 6-digit OTP"
                  maxLength={6}
                  autoComplete="one-time-code"
                />

                <div className="flex space-x-4">
                  <StyledButton
                    onClick={handleVerifyOTP}
                    disabled={otp.length !== 6}
                    loading={isLoading}
                    loadingText="Verifying..."
                    variant="primary"
                    className="flex-1"
                  >
                    Verify OTP
                  </StyledButton>
                  <StyledButton
                    onClick={resendOTP}
                    disabled={otpCountdown > 0}
                    variant="outline"
                    size="md"
                  >
                    {otpCountdown > 0 ? `${otpCountdown}s` : 'Resend'}
                  </StyledButton>
                </div>

                <StyledButton
                  onClick={() => setStep('phone')}
                  variant="ghost"
                  fullWidth
                >
                  ← Back to phone number
                </StyledButton>
              </motion.div>
            )}

            {/* Step 3: User Details */}
            {step === 'details' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <StyledInput
                  type="text"
                  label="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                  icon={User}
                  autoComplete="name"
                />

                <StyledInput
                  type="email"
                  label="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  icon={Mail}
                  autoComplete="email"
                />

                <StyledInput
                  type={showPassword ? 'text' : 'password'}
                  label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  icon={Lock}
                  rightIcon={showPassword ? EyeOff : Eye}
                  onRightIconClick={() => setShowPassword(!showPassword)}
                  autoComplete="new-password"
                />

                <StyledInput
                  type={showConfirmPassword ? 'text' : 'password'}
                  label="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  icon={Lock}
                  rightIcon={showConfirmPassword ? EyeOff : Eye}
                  onRightIconClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  autoComplete="new-password"
                />

                <StyledButton
                  onClick={handleRegister}
                  loading={isLoading}
                  loadingText="Creating Account..."
                  fullWidth
                >
                  Create Account
                </StyledButton>

                <StyledButton
                  onClick={() => setStep('otp')}
                  variant="ghost"
                  fullWidth
                >
                  ← Back to OTP verification
                </StyledButton>
              </motion.div>
            )}

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-gray-600 font-['Lato']">
                Already have an account?{' '}
                <Link href="/auth/signin" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
                  Sign In
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
