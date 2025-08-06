"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { authService } from '../../services/authService';
import { Eye, EyeOff, Phone, Lock, ArrowLeft, Shield, CheckCircle, AlertCircle } from 'lucide-react';
import StyledInput from '../../Components/StyledInput';
import StyledButton from '../../Components/StyledButton';

const ForgotPasswordPage = () => {
  const router = useRouter();
  
  const [step, setStep] = useState<'mobile' | 'otp' | 'reset'>('mobile');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Form data
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
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
      await authService.forgotPassword({ mobileNumber });
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
      // For demo purposes, we'll just move to the reset step
      // In a real implementation, you might want to verify the OTP first
      setStep('reset');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await authService.resetPassword({
        mobileNumber,
        otp,
        newPassword
      });

      setSuccess('Password reset successfully! Redirecting to login...');
      
      setTimeout(() => {
        router.push('/auth/signin');
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Password reset failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resendOTP = async () => {
    if (otpCountdown > 0) return;
    
    setIsLoading(true);
    setError('');

    try {
      await authService.forgotPassword({ mobileNumber });
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
            href="/auth/signin" 
            className="inline-flex items-center text-white/90 hover:text-white mb-6 transition-colors group"
          >
            <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium font-['Lato']">Back to Sign In</span>
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2 font-['Montserrat']">Reset Password</h1>
              <p className="text-gray-600 font-['Lato']">
                {step === 'mobile' && 'Enter your mobile number to receive a reset code'}
                {step === 'otp' && 'Enter the OTP sent to your mobile'}
                {step === 'reset' && 'Create your new password'}
              </p>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  step === 'mobile' 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                    : step === 'otp' || step === 'reset'
                    ? 'bg-green-500 text-white shadow-lg'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {step === 'mobile' ? '1' : <CheckCircle size={16} />}
                </div>
                <div className={`w-16 h-1 mx-3 transition-all duration-300 ${
                  step !== 'mobile' ? 'bg-gradient-to-r from-green-500 to-blue-500' : 'bg-gray-200'
                }`}></div>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  step === 'otp' 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                    : step === 'reset'
                    ? 'bg-green-500 text-white shadow-lg'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {step === 'otp' ? '2' : step === 'reset' ? <CheckCircle size={16} /> : '2'}
                </div>
                <div className={`w-16 h-1 mx-3 transition-all duration-300 ${
                  step === 'reset' ? 'bg-gradient-to-r from-green-500 to-blue-500' : 'bg-gray-200'
                }`}></div>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  step === 'reset' 
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

            {/* Step 1: Mobile Number */}
            {step === 'mobile' && (
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
                  Send Reset Code
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
                  onClick={() => setStep('mobile')}
                  variant="ghost"
                  fullWidth
                >
                  ← Back to mobile number
                </StyledButton>
              </motion.div>
            )}

            {/* Step 3: Reset Password */}
            {step === 'reset' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <StyledInput
                  type={showPassword ? 'text' : 'password'}
                  label="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  icon={Lock}
                  rightIcon={showPassword ? EyeOff : Eye}
                  onRightIconClick={() => setShowPassword(!showPassword)}
                  autoComplete="new-password"
                />

                <StyledInput
                  type={showConfirmPassword ? 'text' : 'password'}
                  label="Confirm New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  icon={Lock}
                  rightIcon={showConfirmPassword ? EyeOff : Eye}
                  onRightIconClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  autoComplete="new-password"
                />

                <StyledButton
                  onClick={handleResetPassword}
                  loading={isLoading}
                  loadingText="Resetting Password..."
                  fullWidth
                >
                  Reset Password
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
                Remember your password?{' '}
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

export default ForgotPasswordPage; 