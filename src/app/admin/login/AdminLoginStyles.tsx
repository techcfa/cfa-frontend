import styled from 'styled-components';

export const Page = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f7ff, #eef2ff);
  padding: 2rem 1rem;
`;

export const Card = styled.div`
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 20px 40px rgba(0,0,0,0.08);
  width: 100%;
  max-width: 420px;
  padding: 2rem;
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 800;
  color: #111827;
  margin: 0 0 0.25rem 0;
`;

export const Sub = styled.p`
  color: #6b7280;
  margin: 0 0 1.5rem 0;
`;

export const Field = styled.div`
  margin-bottom: 1rem;
`;

export const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  color: #374151;
  margin-bottom: 0.5rem;
`;

export const InputWrap = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  padding: 0.75rem 0.875rem;
`;

export const Input = styled.input`
  border: none;
  outline: none;
  flex: 1;
  font-size: 1rem;
`;

export const Button = styled.button`
  width: 100%;
  border: none;
  border-radius: 0.75rem;
  padding: 0.875rem 1rem;
  background: #2563eb;
  color: #fff;
  font-weight: 700;
  cursor: pointer;
  margin-top: 0.5rem;
  &:disabled { opacity: 0.6; cursor: not-allowed; }
`;

export const Error = styled.div`
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #b91c1c;
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  margin-bottom: 1rem;
`;

