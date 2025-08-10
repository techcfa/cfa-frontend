"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, EyeOff, Phone, Lock, ArrowLeft, Shield, User, Mail } from "lucide-react";
import { authService } from "../../services/authService";
import { useAuth } from "../../contexts/AuthContext";
import * as S from "./SignUpStyles";

const StepIndicator = ({ current }: { current: "phone" | "otp" | "details" }) => {
  const steps = [
    { key: "phone", label: "Phone" },
    { key: "otp", label: "OTP" },
    { key: "details", label: "Details" },
  ];
  const activeIndex = steps.findIndex((s) => s.key === current);

  return (
    <S.StepWrapper>
      {steps.map((s, idx) => (
        <React.Fragment key={s.key}>
          <S.StepCircle active={idx <= activeIndex}>{idx + 1}</S.StepCircle>
          <S.StepLabel active={idx <= activeIndex}>{s.label}</S.StepLabel>
          {idx < steps.length - 1 && <S.StepLine active={activeIndex > idx} />}
        </React.Fragment>
      ))}
    </S.StepWrapper>
  );
};

const SignUpPage: React.FC = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [step, setStep] = useState<"phone" | "otp" | "details">("phone");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [count, setCount] = useState(0);

  const startCount = () => {
    setCount(60);
    const iv = setInterval(() => setCount((c) => (c <= 1 ? (clearInterval(iv), 0) : c - 1)), 1000);
  };

  const sendOTP = async () => {
    if (mobile.length !== 10) return setError("Enter a valid 10-digit mobile");
    // ...
  };
  const verifyOTP = async () => { /* ... */ };
  const handleRegister = async () => { /* ... */ };
  const resend = async () => { /* ... */ };

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
            <StepIndicator current={step} />

            <S.Header>
              <S.IconCircle><Shield size={24} /></S.IconCircle>
              <h1>Join CFA Protection</h1>
              <p>Secure your digital life with cyber fraud protection</p>
            </S.Header>

            {error && <S.Alert type="error">{error}</S.Alert>}
            {success && <S.Alert type="success">{success}</S.Alert>}

            {step === "phone" && (
              <S.Form>
                <S.Field>
                  <label>Mobile Number</label>
                  <S.InputIcon>
                    <Phone size={18} />
                    <input
                      type="tel"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
                      placeholder="Enter mobile number"
                      maxLength={10}
                    />
                  </S.InputIcon>
                </S.Field>
                <S.Button disabled={mobile.length !== 10 || loading} onClick={sendOTP}>
                  {loading ? "Sending..." : "Send OTP"}
                </S.Button>
              </S.Form>
            )}

            {step === "otp" && (
              <S.Form>
                <S.Field>
                  <label>OTP Verification</label>
                  <S.InputIcon>
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                      placeholder="Enter 6-digit OTP"
                      maxLength={6}
                    />
                  </S.InputIcon>
                </S.Field>

                <S.Row>
                  <S.Button disabled={otp.length !== 6 || loading} onClick={verifyOTP}>
                    Verify
                  </S.Button>
                  <S.Button variant="outline" disabled={count > 0} onClick={resend}>
                    {count > 0 ? `${count}s` : "Resend"}
                  </S.Button>
                </S.Row>

                <S.Button variant="ghost" onClick={() => setStep("phone")}>
                  ← Back
                </S.Button>
              </S.Form>
            )}

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

                <S.Button disabled={loading} onClick={handleRegister}>
                  {loading ? "Creating Account..." : "Create Account"}
                </S.Button>
                <S.Button variant="ghost" onClick={() => setStep("otp")}>
                  ← Back to OTP
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
