import styled, { css } from "styled-components";
import { motion } from "framer-motion";
import Link from "next/link";

const glow = css`
  position: absolute;
  background: var(--c);
  filter: blur(120px);
  border-radius: 9999px;
  z-index: 1;
`;

export const PageContainer = styled.div`
  position: relative;
  min-height: 100vh;
  background: #f8fafc;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  padding: 2rem;
`;
// Background/Glows identical to previous styles…
export const Background = styled.div`
  position: absolute;
  inset: 0;
  background: url("/BG1.png") center/cover no-repeat;
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
  }
`;
export const GlowBlue = styled.div`${glow}; --c: rgba(59,130,246,0.3); top:-10%; left:-10%; width:25%; height:25%;`;
export const GlowPurple = styled.div`${glow}; --c: rgba(139,92,246,0.3); bottom:-10%; right:-10%; width:35%; height:35%;`;

export const Content = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 420px;
`;

export const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: -0.5rem;
  &:hover {
    color: white;
  }
`;

export const Card = styled.div`
  background: rgba(255, 255, 255, 0.97);
  backdrop-filter: blur(20px);
  border-radius: 28px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
`;

export const Header = styled.div`
  text-align: center;
  h1 {
    font-size: 1.6rem;
    font-weight: bold;
    margin-bottom: 0.4rem;
    font-family: "Montserrat";
  }
  p {
    font-size: 0.9rem;
    color: #555;
    font-family: "Lato";
  }
`;

export const IconCircle = styled.div`
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  border-radius: 16px;
  margin: 0 auto 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    color: white;
  }
`;

export const Alert = styled(motion.div)<{ type: "error" | "success" }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  border-radius: 12px;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  ${({ type }) =>
    type === "error"
      ? `background: #fef2f2; border: 1px solid #fecaca; color: #b91c1c;`
      : `background: #f0fdf4; border: 1px solid #bbf7d0; color: #15803d;`}
`;

export const StepWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

export const StepCircle = styled.div<{ active: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${({ active }) =>
    active ? "linear-gradient(135deg,#3b82f6,#8b5cf6)" : "#e5e7eb"};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
`;

export const StepLabel = styled.div<{ active: boolean }>`
  font-size: 12px;
  color: ${({ active }) => (active ? "#000" : "#777")};
  margin-right: 0.5rem;
`;

export const StepLine = styled.div<{ active: boolean }>`
  width: 30px;
  height: 2px;
  background: ${({ active }) => (active ? "#6366f1" : "#e5e7eb")};
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  label {
    font-size: 0.85rem;
    font-weight: 500;
    color: #333;
  }
`;

export const InputIcon = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 0.6rem;
  background: #fff;
  input {
    flex: 1;
    border: none;
    outline: none;
    font-size: 0.9rem;
    background: transparent;
  }
  span {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
`;

export const Button = styled.button<{ variant?: string }>`
  background: ${({ variant }) => (variant === "outline" ? "transparent" : "#2563eb")};
  color: ${({ variant }) => (variant === "outline" ? "#2563eb" : "#fff")};
  border: ${({ variant }) => (variant === "outline" ? "1px solid #2563eb" : "none")};
  padding: 0.75rem;
  font-size: 0.95rem;
  font-weight: 600;
  border-radius: 12px;
  width: 100%;
  cursor: pointer;
  transition: background 0.3s;
  &:hover {
    background: ${({ variant }) => (variant === "outline" ? "#f3f4f6" : "#1e40af")};
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const Row = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const FootNote = styled.div`
  font-size: 0.85rem;
  text-align: center;
  color: #555;
  span {
    color: #2563eb;
    font-weight: 600;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;
