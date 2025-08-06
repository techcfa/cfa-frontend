import styled from 'styled-components';

// Form Container
export const FormContainer = styled.div`
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
`;

// Form Card
export const FormCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 2rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #3b82f6, #8b5cf6, #6366f1);
    border-radius: 24px 24px 0 0;
  }
`;

// Form Header
export const FormHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

export const FormIcon = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  border-radius: 16px;
  margin-bottom: 1rem;
  box-shadow: 0 10px 25px -5px rgba(59, 130, 246, 0.3);
`;

export const FormTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.5rem;
  line-height: 1.2;
`;

export const FormSubtitle = styled.p`
  color: #6b7280;
  font-size: 1rem;
  line-height: 1.5;
`;

// Form Group
export const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

export const FormLabel = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.75rem;
  line-height: 1.4;
`;

// Input Container
export const InputContainer = styled.div`
  position: relative;
  transition: all 0.2s ease;

  &:focus-within {
    transform: translateY(-1px);
  }
`;

// Base Input Styles
const baseInputStyles = `
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 1rem;
  line-height: 1.5;
  transition: all 0.2s ease;
  background: #ffffff;
  color: #1f2937;

  &::placeholder {
    color: #9ca3af;
    font-weight: 400;
  }

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
    background: #ffffff;
  }

  &:disabled {
    background: #f9fafb;
    color: #6b7280;
    cursor: not-allowed;
  }

  &.error {
    border-color: #ef4444;
    box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.1);
  }

  &.success {
    border-color: #10b981;
    box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.1);
  }
`;

export const FormInput = styled.input`
  ${baseInputStyles}
`;

export const FormTextarea = styled.textarea`
  ${baseInputStyles}
  resize: vertical;
  min-height: 100px;
`;

// Input Icons
export const InputIcon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
  transition: color 0.2s ease;
  z-index: 1;

  ${InputContainer}:focus-within & {
    color: #3b82f6;
  }
`;

export const InputAction = styled.button`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    color: #6b7280;
    background: rgba(0, 0, 0, 0.05);
  }

  &:focus {
    outline: none;
    color: #3b82f6;
    background: rgba(59, 130, 246, 0.1);
  }
`;

// Button Styles
export const ButtonContainer = styled.div`
  margin-top: 2rem;
`;

export const PrimaryButton = styled.button`
  width: 100%;
  padding: 1rem 1.5rem;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 14px 0 rgba(59, 130, 246, 0.3);
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px 0 rgba(59, 130, 246, 0.4);
    background: linear-gradient(135deg, #2563eb, #7c3aed);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background: linear-gradient(135deg, #9ca3af, #d1d5db);
    cursor: not-allowed;
    transform: none;
    box-shadow: 0 4px 14px 0 rgba(156, 163, 175, 0.3);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }

  &:hover::before {
    left: 100%;
  }
`;

export const SecondaryButton = styled.button`
  width: 100%;
  padding: 1rem 1.5rem;
  background: transparent;
  color: #6b7280;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #d1d5db;
    background: #f9fafb;
    color: #374151;
  }

  &:disabled {
    background: #f9fafb;
    color: #9ca3af;
    cursor: not-allowed;
    border-color: #f3f4f6;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;

  ${PrimaryButton}, ${SecondaryButton} {
    flex: 1;
  }
`;

// Loading Spinner
export const LoadingSpinner = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #ffffff;
  animation: spin 1s ease-in-out infinite;
  margin-right: 0.5rem;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

// Message Styles
export const MessageContainer = styled.div<{ type: 'error' | 'success' | 'info' }>`
  padding: 1rem;
  border-radius: 12px;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  animation: slideIn 0.3s ease-out;

  ${({ type }) => {
    switch (type) {
      case 'error':
        return `
          background: #fef2f2;
          border: 1px solid #fecaca;
          color: #dc2626;
        `;
      case 'success':
        return `
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          color: #16a34a;
        `;
      case 'info':
        return `
          background: #eff6ff;
          border: 1px solid #bfdbfe;
          color: #2563eb;
        `;
      default:
        return '';
    }
  }}

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

// Progress Steps
export const ProgressContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
`;

export const ProgressStep = styled.div<{ active: boolean; completed: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: 700;
  transition: all 0.3s ease;
  position: relative;

  ${({ active, completed }) => {
    if (completed) {
      return `
        background: #10b981;
        color: white;
        box-shadow: 0 4px 14px 0 rgba(16, 185, 129, 0.3);
      `;
    } else if (active) {
      return `
        background: linear-gradient(135deg, #3b82f6, #8b5cf6);
        color: white;
        box-shadow: 0 4px 14px 0 rgba(59, 130, 246, 0.3);
      `;
    } else {
      return `
        background: #f3f4f6;
        color: #9ca3af;
      `;
    }
  }}
`;

export const ProgressConnector = styled.div<{ active: boolean }>`
  width: 64px;
  height: 4px;
  margin: 0 12px;
  border-radius: 2px;
  transition: all 0.3s ease;

  ${({ active }) =>
    active
      ? `
        background: linear-gradient(90deg, #10b981, #3b82f6);
      `
      : `
        background: #e5e7eb;
      `}
`;

// Toggle Switch
export const ToggleContainer = styled.div`
  display: flex;
  background: #f3f4f6;
  border-radius: 12px;
  padding: 4px;
  margin-bottom: 1.5rem;
`;

export const ToggleButton = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  ${({ active }) =>
    active
      ? `
        background: white;
        color: #3b82f6;
        box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.1);
        transform: scale(1.05);
      `
      : `
        background: transparent;
        color: #6b7280;
        
        &:hover {
          color: #374151;
        }
      `}
`;

// Demo Credentials Box
export const DemoBox = styled.div`
  margin-top: 1.5rem;
  padding: 1rem;
  background: linear-gradient(135deg, #eff6ff, #f3e8ff);
  border: 1px solid #dbeafe;
  border-radius: 12px;
`;

export const DemoTitle = styled.h3`
  font-size: 0.875rem;
  font-weight: 600;
  color: #1e40af;
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const DemoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: #1e40af;
  margin-bottom: 0.25rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const DemoDot = styled.div`
  width: 8px;
  height: 8px;
  background: #3b82f6;
  border-radius: 50%;
  flex-shrink: 0;
`;

// Form Footer
export const FormFooter = styled.div`
  text-align: center;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e5e7eb;
`;

export const FormFooterText = styled.p`
  color: #6b7280;
  font-size: 0.875rem;
  line-height: 1.5;
`;

export const FormFooterLink = styled.a`
  color: #3b82f6;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: #2563eb;
  }
`;

// Responsive Design
export const ResponsiveContainer = styled.div`
  @media (max-width: 640px) {
    padding: 1rem;
    
    ${FormCard} {
      padding: 1.5rem;
    }
    
    ${FormTitle} {
      font-size: 1.75rem;
    }
    
    ${ButtonGroup} {
      flex-direction: column;
    }
  }
`;

// Animation Keyframes
export const fadeInUp = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const slideInRight = `
  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

export const scaleIn = `
  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`; 