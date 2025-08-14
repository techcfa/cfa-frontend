"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, ArrowLeft, Shield, User, Mail, Phone } from "lucide-react";
import { authService } from "../../services/authService";
import { useAuth } from "../../contexts/AuthContext";
import subscriptionService, { SubscriptionPlan } from "../../services/subscriptionService";
import * as S from "./SignUpStyles";

// Email-only signup with two steps: details -> OTP verification

const SignUpPage: React.FC = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [step, setStep] = useState<"details" | "otp" | "subscription">("details");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [pwd, setPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [otp, setOtp] = useState("");
  const [count, setCount] = useState(0);
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  
  const startCount = () => {
    setCount(60);
    const iv = setInterval(() => {
      setCount((c) => {
        if (c <= 1) {
          clearInterval(iv);
          return 0;
        }
        return c - 1;
      });
    }, 1000);
  };

  const sendSignupOTP = async () => {
    setError(""); setSuccess("");
    if (!name.trim()) return setError("Full name is required");
    if (!email.trim()) return setError("Email is required");
    if (!mobile.trim()) return setError("Mobile number is required");
    if (!pwd.trim()) return setError("Password is required");
    if (pwd !== confirmPwd) return setError("Passwords do not match");
    
    // Basic mobile validation
    const mobileRegex = /^[\+]?[0-9\s\-\(\)]{10,15}$/;
    if (!mobileRegex.test(mobile.trim())) {
      return setError("Please enter a valid mobile number (10-15 digits)");
    }
    
    try {
      setLoading(true);
      await authService.signupSendOtp({ 
        fullName: name.trim(), 
        email: email.trim(), 
        mobile: mobile.trim(),
        password: pwd 
      });
      setSuccess("Verification code sent to your email");
      setStep("otp");
      startCount();
    } catch (e: any) {
      setError(e.response?.data?.message || "Failed to send verification code.");
    } finally {
      setLoading(false);
    }
  };

  const verifySignupOTP = async () => {
    setError(""); setSuccess("");
    if (otp.length !== 6) return setError("Enter valid 6-digit OTP");
    try {
      setLoading(true);
      const resp = await authService.signupVerifyOtp({ email: email.trim(), otp });
      setSuccess("Account verified! Choose your protection plan...");
      login(resp.user, resp.token);
      
      // Load subscription plans
      const plansData = await subscriptionService.getPlans();
      setPlans(plansData);
      setStep("subscription");
    } catch (e: any) {
      setError(e.response?.data?.message || "Invalid or expired OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async (planId: string) => {
    try {
      setLoading(true);
      const orderData = await subscriptionService.createOrder({ planId });
      
      // For demo purposes, auto-verify payment
      const paymentData = {
        orderId: orderData.orderId,
        paymentId: 'pay_demo_' + Date.now(),
        signature: 'sig_demo_' + Date.now(),
      };
      
      await subscriptionService.verifyPayment(paymentData);
      setSuccess("Subscription activated! Redirecting to dashboard...");
      setTimeout(() => router.push("/dashboard"), 1500);
    } catch (error) {
      console.error('Subscription error:', error);
      setError('Subscription failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <S.PageContainer>
      <S.Background />
      <S.GlowBlue /><S.GlowPurple />
      <S.Content>
        <S.BackLink href="/">
          <ArrowLeft size={18} /> Back to Home
        </S.BackLink>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <S.Card>

            <S.Header>
              <S.IconCircle><Shield size={24} /></S.IconCircle>
              <h1>Join CFA Protection</h1>
              <p>Secure your digital life with cyber fraud protection</p>
            </S.Header>

            {error && <S.Alert type="error">{error}</S.Alert>}
            {success && <S.Alert type="success">{success}</S.Alert>}

            {step === "details" && (
              <S.Form>
                <S.Field>
                  <label>Full Name</label>
                  <S.InputIcon>
                    <User size={18} />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter full name"
                    />
                  </S.InputIcon>
                </S.Field>

                <S.Field>
                  <label>Email</label>
                  <S.InputIcon>
                    <Mail size={18} />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter email"
                    />
                  </S.InputIcon>
                </S.Field>

                <S.Field>
                  <label>Mobile Number</label>
                  <S.InputIcon>
                    <Phone size={18} />
                                         <input
                       type="tel"
                       value={mobile}
                       onChange={(e) => setMobile(e.target.value)}
                       placeholder="+91 "
                     />
                  </S.InputIcon>
                </S.Field>

                <S.Field>
                  <label>Password</label>
                  <S.InputIcon>
                    <Lock size={18} />
                    <input
                      type={showPwd ? "text" : "password"}
                      value={pwd}
                      onChange={(e) => setPwd(e.target.value)}
                      placeholder="Create a password"
                    />
                    <span onClick={() => setShowPwd(!showPwd)}>
                      {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
                    </span>
                  </S.InputIcon>
                </S.Field>

                <S.Field>
                  <label>Confirm Password</label>
                  <S.InputIcon>
                    <Lock size={18} />
                    <input
                      type={showConfirm ? "text" : "password"}
                      value={confirmPwd}
                      onChange={(e) => setConfirmPwd(e.target.value)}
                      placeholder="Confirm password"
                    />
                    <span onClick={() => setShowConfirm(!showConfirm)}>
                      {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                    </span>
                  </S.InputIcon>
                </S.Field>

                <S.Button disabled={loading} onClick={sendSignupOTP}>
                  {loading ? "Sending..." : "Send Verification Code"}
                </S.Button>
              </S.Form>
            )}

            {step === "otp" && (
              <S.Form>
                <S.Field>
                  <label>Enter OTP</label>
                  <S.InputIcon>
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                      placeholder="6-digit code"
                      maxLength={6}
                    />
                  </S.InputIcon>
                </S.Field>
                <S.Row>
                  <S.Button disabled={otp.length !== 6 || loading} onClick={verifySignupOTP}>
                    Verify
                  </S.Button>
                  <S.Button variant="outline" disabled={count > 0} onClick={sendSignupOTP}>
                    {count > 0 ? `${count}s` : "Resend"}
                  </S.Button>
                </S.Row>
                <S.Button variant="ghost" onClick={() => setStep("details")}>
                  ← Back
                </S.Button>
              </S.Form>
            )}

            {step === "subscription" && (
              <div style={{ width: '100%' }}>
                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                  <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px' }}>
                    Choose Your Protection Plan
                  </h2>
                  <p style={{ color: '#6b7280' }}>
                    Special launch offer - Get premium protection for free!
                  </p>
                </div>

                <div style={{ display: 'grid', gap: '16px', marginBottom: '24px' }}>
                  {plans.map((plan) => (
                    <div
                      key={plan._id}
                      style={{
                        border: '1px solid #e5e7eb',
                        borderRadius: '12px',
                        padding: '20px',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        backgroundColor: selectedPlan === plan._id ? '#eff6ff' : 'white',
                        borderColor: selectedPlan === plan._id ? '#3b82f6' : '#e5e7eb'
                      }}
                      onClick={() => setSelectedPlan(plan._id)}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                        <div>
                          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '4px' }}>
                            {plan.planName}
                          </h3>
                          <p style={{ fontSize: '14px', color: '#6b7280' }}>
                            {plan.description}
                          </p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#ef4444', textDecoration: 'line-through' }}>
                              ₹500
                            </span>
                            <span style={{ fontSize: '28px', fontWeight: 'bold', color: '#10b981' }}>
                              ₹0
                            </span>
                          </div>
                          <p style={{ fontSize: '12px', color: '#6b7280' }}>
                            Free for {plan.duration} months!
                          </p>
                        </div>
                      </div>

                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {plan.features.slice(0, 3).map((feature, index) => (
                          <span
                            key={index}
                            style={{
                              fontSize: '12px',
                              color: '#059669',
                              backgroundColor: '#d1fae5',
                              padding: '4px 8px',
                              borderRadius: '4px'
                            }}
                          >
                            ✓ {feature}
                          </span>
                        ))}
                        {plan.features.length > 3 && (
                          <span style={{ fontSize: '12px', color: '#6b7280' }}>
                            +{plan.features.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <S.Button 
                  disabled={!selectedPlan || loading} 
                  onClick={() => handleSubscribe(selectedPlan)}
                  style={{ width: '100%' }}
                >
                  {loading ? "Processing..." : "Get Protected Now - FREE"}
                </S.Button>
              </div>
            )}

            <S.FootNote>
              Already have an account?{" "}
              <Link href="/auth/signin">
                <span>Sign In</span>
              </Link>
            </S.FootNote>
          </S.Card>
        </motion.div>
      </S.Content>
    </S.PageContainer>
  );
};

export default SignUpPage;
