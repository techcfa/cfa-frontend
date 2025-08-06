"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, EyeOff, Phone, Lock, ArrowLeft, Shield } from "lucide-react";
import { authService } from "../../services/authService";
import * as S from "./ForgotPasswordStyles";

// Inline Step UI
const StepIndicator = ({ current }: { current: "mobile" | "otp" | "reset" }) => {
  const steps = [
    { key: "mobile", label: "Mobile" },
    { key: "otp", label: "OTP" },
    { key: "reset", label: "Reset" },
  ];

  const stepIndex = steps.findIndex((s) => s.key === current);

  return (
    <S.StepWrapper>
      {steps.map((step, index) => (
        <React.Fragment key={step.key}>
          <S.StepCircle active={stepIndex >= index}>{index + 1}</S.StepCircle>
          <S.StepLabel active={stepIndex >= index}>{step.label}</S.StepLabel>
          {index < steps.length - 1 && (
            <S.StepLine active={stepIndex > index} />
          )}
        </React.Fragment>
      ))}
    </S.StepWrapper>
  );
};

const ForgotPasswordPage: React.FC = () => {
  const router = useRouter();
  const [step, setStep] = useState<"mobile" | "otp" | "reset">("mobile");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
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

  const sendOTP = async () => {
    if (mobile.length !== 10) {
      setError("Enter valid 10-digit mobile");
      return;
    }
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await authService.forgotPassword({ mobileNumber: mobile });
      setSuccess("OTP sent successfully");
      setStep("otp");
      startCount();
    } catch (e: any) {
      setError(e.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = () => {
    if (otp.length !== 6) {
      setError("Enter valid 6-digit OTP");
      return;
    }
    setStep("reset");
  };

  const resetPassword = async () => {
    if (newPwd.length < 6) {
      setError("Password too short");
      return;
    }
    if (newPwd !== confirmPwd) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await authService.resetPassword({ mobileNumber: mobile, otp, newPassword: newPwd });
      setSuccess("Password reset! Redirecting...");
      setTimeout(() => router.push("/auth/signin"), 1500);
    } catch (e: any) {
      setError(e.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <S.PageContainer>
      <S.Background />
      <S.GlowBlue />
      <S.GlowPurple />
      <S.Content>
        <S.BackLink href="/auth/signin">
          <ArrowLeft size={18} /> Back to Sign In
        </S.BackLink>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <S.Card>

            {/* Inline Step Indicator */}
            <StepIndicator current={step} />

            <S.Header>
              <S.IconCircle>
                <Shield size={24} />
              </S.IconCircle>
              <h1>Reset Password</h1>
              <p>
                {step === "mobile"
                  ? "Enter your mobile number to receive a code."
                  : step === "otp"
                  ? "Enter the OTP sent to your mobile."
                  : "Create your new password."}
              </p>
            </S.Header>

            {error && <S.Alert type="error">{error}</S.Alert>}
            {success && <S.Alert type="success">{success}</S.Alert>}

            {/* Mobile Step */}
            {step === "mobile" && (
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

            {/* OTP Step */}
            {step === "otp" && (
              <S.Form>
                <S.Field>
                  <label>OTP Code</label>
                  <S.InputIcon>
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                      placeholder="Enter 6‑digit OTP"
                      maxLength={6}
                    />
                  </S.InputIcon>
                </S.Field>
                <S.Row>
                  <S.Button disabled={otp.length !== 6 || loading} onClick={verifyOTP}>
                    Verify
                  </S.Button>
                  <S.Button variant="outline" disabled={count > 0} onClick={sendOTP}>
                    {count > 0 ? `${count}s` : "Resend"}
                  </S.Button>
                </S.Row>
                <S.Button variant="ghost" onClick={() => setStep("mobile")}>
                  ← Back
                </S.Button>
              </S.Form>
            )}

            {/* Reset Step */}
            {step === "reset" && (
              <S.Form>
                <S.Field>
                  <label>New Password</label>
                  <S.InputIcon>
                    <Lock size={18} />
                    <input
                      type={showNew ? "text" : "password"}
                      value={newPwd}
                      onChange={(e) => setNewPwd(e.target.value)}
                      placeholder="Enter new password"
                    />
                    <span onClick={() => setShowNew(!showNew)}>
                      {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
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

                <S.Button disabled={loading} onClick={resetPassword}>
                  {loading ? "Resetting..." : "Reset Password"}
                </S.Button>
                <S.Button variant="ghost" onClick={() => setStep("otp")}>
                  ← Back
                </S.Button>
              </S.Form>
            )}

            <S.FootNote>
              Remembered your password? <Link href="/auth/signin"><span>Sign In</span></Link>
            </S.FootNote>
          </S.Card>
        </motion.div>
      </S.Content>
    </S.PageContainer>
  );
};

export default ForgotPasswordPage;
