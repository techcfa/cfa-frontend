import styled from "styled-components";

export const Section = styled.section`
  display: flex;
  gap: 40px;
  padding: 40px 150px;
  background: #f9f9f9;
  background-image: url("/CBG.png");
  background-size: cover;
  background-position: center;

  @media (max-width: 1024px) {
    flex-direction: column;
    padding: 30px 20px;
  }
`;

export const LeftPanel = styled.div`
  flex: 1;
  color: #000;
`;

export const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
`;

export const BlueText = styled.span`
  color: #0073D7;
`;

export const Subtitle = styled.p`
  margin: 10px 0 20px 0;
  font-size: 1.2rem;
  color: #333;
`;

export const InfoBlock = styled.div`
  margin-bottom: 15px;
`;

export const InfoTitle = styled.p`
  font-size: 1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
  color: #000;
  margin: 0;
`;

export const InfoText = styled.p`
  font-size: 1rem;
  color: #333;
  margin: 5px 0 0 24px;

  small {
    font-size: 1rem;
  }
`;

export const Illustration = styled.div`
  margin-top: 20px;

  img {
    max-width: 450px;
    width: 100%;
  }
`;

export const Divider = styled.div`
  width: 1px;
  background: #ccc;

  @media (max-width: 1024px) {
    width: 100%;
    height: 1px;
  }
`;

export const RightPanel = styled.div`
  flex: 1;
  background: #fff;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 0 8px rgba(0,0,0,0.1);
`;

export const FormTitle = styled.h3`
  font-size: 2rem;
  margin-bottom: 10px;
  color: #000;
  font-weight: bold;
`;

export const FormSubtitle = styled.p`
  font-size: 0.95rem;
  color: #555;
  margin-bottom: 20px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const Row = styled.div`
  display: flex;
  gap: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Input = styled.input`
  padding: 10px;
  font-size: 0.95rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: #000;
`;

export const Textarea = styled.textarea`
  padding: 10px;
  font-size: 0.95rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  min-height: 100px;
  color: #000;
`;

export const CustomSelect = styled.select`
  padding: 10px;
  font-size: 0.95rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: #000;
  appearance: none;
  background: url("data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>") no-repeat right 10px center;
  background-color: #fff;
  background-size: 16px;
`;

export const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #000;
  font-size: 0.95rem;
  cursor: pointer;
`;

export const CustomRadio = styled.input`
  accent-color: #0073D7;
`;

export const Label = styled.label`
  font-weight: 600;
  color: #000;
`;

export const Error = styled.span`
  font-size: 0.8rem;
  color: red;
`;

export const SubmitBtn = styled.button`
  margin-top: 10px;
  padding: 12px;
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
  background: #005299;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #004099;
  }
`;
