"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, ArrowLeft, Shield, User, Mail } from "lucide-react";
import { authService } from "../../services/authService";
import { useAuth } from "../../contexts/AuthContext";
import * as S from "./SignUpStyles";

// Email-only signup with two steps: details -> OTP verification

const SignUpPage: React.FC = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [step, setStep] = useState<"details" | "otp">("details");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [otp, setOtp] = useState("");
  const [count, setCount] = useState(0);
  
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
    if (!pwd.trim()) return setError("Password is required");
    if (pwd !== confirmPwd) return setError("Passwords do not match");
    try {
      setLoading(true);
      await authService.signupSendOtp({ fullName: name.trim(), email: email.trim(), password: pwd });
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
      setSuccess("Account verified! Redirecting...");
      login(resp.user, resp.token);
      setTimeout(() => router.push("/dashboard"), 1200);
    } catch (e: any) {
      setError(e.response?.data?.message || "Invalid or expired OTP.");
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
