import styled, { css } from 'styled-components';
import Link from 'next/link';
import { motion } from 'framer-motion';

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
  overflow: hidden;
  background: #f8fafc;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 4rem;
  padding: 2rem;
`;

export const BackgroundImage = styled.div`
  position: absolute;
  inset: 0;
  background: url('/BG1.png') center/cover no-repeat;
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
  }
`;

export const GlowBlue = styled.div`
  ${glow};
  --c: rgba(59, 130, 246, 0.3);
  top: -10%;
  left: -10%;
  width: 25%;
  height: 25%;
`;

export const GlowPurple = styled.div`
  ${glow};
  --c: rgba(139, 92, 246, 0.3);
  bottom: -10%;
  right: -10%;
  width: 35%;
  height: 35%;
`;

export const ContentWrapper = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 420px;
  display: flex;
  flex-direction: column;
`;

export const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
margin-bottom: 1rem;
  color: rgba(255, 255, 255, 0.9);
  &:hover {
    color: white;
  }
`;

export const Card = styled.div`
  background: rgba(255, 255, 255, 0.97);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 28px;
  padding: 2rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const Header = styled.div`
  text-align: center;
  h1 {
    font-size: 1.6rem;
    margin-bottom: 0.4rem;
    font-family: 'Montserrat';
  }
  p {
    font-size: 0.9rem;
    color: #555;
    font-family: 'Lato';
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
`;

export const Alert = styled(motion.div)<{ type: 'error' | 'success' }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  ${({ type }) =>
    type === 'error'
      ? `background: #fef2f2; border: 1px solid #fecaca; color: #b91c1c;`
      : `background: #f0fdf4; border: 1px solid #bbf7d0; color: #15803d;`}
`;

export const ToggleWrapper = styled.div`
  display: flex;
  background: #f3f4f6;
  border-radius: 12px;
  overflow: hidden;

  button {
    flex: 1;
    padding: 0.75rem;
    font-size: 0.9rem;
    text-align: center;
    background: transparent;
    border: none;
    color: #555;
    cursor: pointer;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    &.active {
      background: white;
      color: #2563eb;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
      transform: scale(1.03);
    }

    &:hover {
      color: #333;
    }
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 1rem;

  label {
    font-size: 0.85rem;
    font-weight: 500;
    color: #333;
    margin-bottom: 0.3rem;
  }

  .input-icon {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 0.6rem 0.75rem;
    background: #fff;
    transition: border 0.2s ease;

    input {
      flex: 1;
      border: none;
      outline: none;
      font-size: 0.9rem;
      background: transparent;
    }

    span {
      cursor: pointer;
      display: flex;
      align-items: center;
    }
  }
`;

export const ForgotLink = styled(Link)`
  display: block;
  text-align: right;
  font-size: 0.85rem;
  padding-bottom: 1rem;
  color: #2563eb;
  &:hover {
    text-decoration: underline;
  }
`;

export const Button = styled.button`
  background: #2563eb;
  color: white;
  padding: 0.75rem 1.25rem;
  font-weight: 600;
  font-size: 0.95rem;
  border: none;
  border-radius: 12px;
  width: 100%;
  cursor: pointer;
  transition: background 0.3s;
  &:hover {
    background: #1e40af;
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const DemoBox = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background: #eff6ff;
  border-radius: 12px;
  border: 1px solid #bfdbfe;
  font-size: 0.85rem;
  color: #1e3a8a;

  h4 {
    display: flex;
    align-items: center;
    font-weight: 600;
    margin-bottom: 0.5rem;
    gap: 0.5rem;
  }

  p {
    margin: 0.25rem 0;
    line-height: 1.4;
  }
`;

export const FooterText = styled.div`
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
