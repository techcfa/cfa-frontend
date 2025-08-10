"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Phone, Mail, Lock, ArrowLeft, Shield, CheckCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { authService } from '../../services/authService';
import * as S from './SignInStyles';

const SignInPage: React.FC = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loginMethod, setLoginMethod] = useState<'mobile' | 'email'>('mobile');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(''); setSuccess('');
    try {
      const loginData = loginMethod === 'mobile' ? { mobileNumber, password } : { email, password };
      const resp = await authService.login(loginData);
      login(resp.user, resp.token);
      setSuccess('Login successful! Redirecting...');
      setTimeout(() => router.push('/dashboard'), 1500);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <S.PageContainer>
      <S.BackgroundImage />
      <S.GlowBlue />
      <S.GlowPurple />
      <S.ContentWrapper>
        <S.BackLink href="/" passHref>
          <ArrowLeft size={18} />
          Back to Home
        </S.BackLink>

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <S.Card>
            <S.Header>
              <S.IconCircle><Shield size={24} /></S.IconCircle>
              <h1>Welcome Back</h1>
              <p>Sign in to your CFA Protection account</p>
            </S.Header>

            {error && <S.Alert type="error">{error}</S.Alert>}
            {success && <S.Alert type="success">{success}</S.Alert>}

            <S.ToggleWrapper>
              <button onClick={() => setLoginMethod('mobile')} className={loginMethod === 'mobile' ? 'active' : ''}>
                <Phone size={14} /> Mobile
              </button>
              <button onClick={() => setLoginMethod('email')} className={loginMethod === 'email' ? 'active' : ''}>
                <Mail size={14} /> Email
              </button>
            </S.ToggleWrapper>

            <form onSubmit={handleSignIn}>
              <S.InputWrapper>
                <label>
                  {loginMethod === 'mobile' ? 'Mobile Number' : 'Email'}
                </label>
                <div className="input-icon">
                  {loginMethod === 'mobile' ? <Phone size={18} /> : <Mail size={18} />}
                  <input
                    type={loginMethod === 'mobile' ? 'tel' : 'email'}
                    value={loginMethod === 'mobile' ? mobileNumber : email}
                    onChange={(e) => {
                      loginMethod === 'mobile'
                        ? setMobileNumber(e.target.value.replace(/\D/g, '').slice(0, 10))
                        : setEmail(e.target.value);
                    }}
                    placeholder={loginMethod === 'mobile' ? 'Enter mobile number' : 'Enter email'}
                  />
                </div>
              </S.InputWrapper>

              <S.InputWrapper>
                <label>Password</label>
                <div className="input-icon">
                  <Lock size={18} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                  />
                  <span onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </span>
                </div>
              </S.InputWrapper>

              <S.ForgotLink href="/auth/forgot-password">Forgot your password?</S.ForgotLink>

              <S.Button type="submit" disabled={isLoading}>
                {isLoading ? 'Signing in...' : 'Sign In'}
              </S.Button>
            </form>

            <S.DemoBox>
              <h4><CheckCircle size={16} /> Demo Credentials</h4>
              <p>Mobile: 8707711852<br />Password: any<br />OTP: 123456</p>
            </S.DemoBox>

            <S.FooterText>
              Don't have an account? <Link href="/auth/signup"><span>Sign Up</span></Link>
            </S.FooterText>
          </S.Card>
        </motion.div>
      </S.ContentWrapper>
    </S.PageContainer>
  );
};

export default SignInPage;
