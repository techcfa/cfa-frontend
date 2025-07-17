"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

const FaqSection = styled.section`
  width: 100%;
  padding: 40px 150px;
  background-image: url("/CBG.png");
  background-size: cover;
  background-position: center;

  @media (max-width: 1024px) {
    padding: 30px 40px;
  }

  @media (max-width: 768px) {
    padding: 25px 20px;
  }
`;


const FaqContainer = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const FaqTitle = styled.h2`
  font-size: 2.5rem;
  font-family: "Montserrat", sans-serif;
  font-weight: bold;
  color: #000;
  text-align: left;
  margin-bottom: 30px;

  @media (max-width: 1024px) {
    font-size: 1.6rem;
  }

  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

const BlueText = styled.span`
  color: #0073D7;
`;

const FaqItem = styled.div`
  border-top: 1px solid #ccc;
  padding: 15px 0;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }

  @media (max-width: 768px) {
    padding: 12px 0;
  }
`;

const Question = styled.div`
  font-size: 1.2rem;
  font-family: "Lato", sans-serif;
  font-weight: bold;
  color: #000;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 1024px) {
    font-size: 1.1rem;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

interface AnswerProps {
  isOpen: boolean;
}

const Answer = styled.p<AnswerProps>`
  font-size: 1rem;
  font-family: "Lato", sans-serif;
  color: #333;
  margin-top: 10px;
  max-height: ${({ isOpen }) => (isOpen ? "150px" : "0")};
  overflow: hidden;
  transition: max-height 0.4s ease-out, opacity 0.4s ease-out;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};

  @media (max-width: 1024px) {
    font-size: 0.95rem;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const Icon = styled.span<{ isOpen: boolean }>`
  font-size: 1.5rem;
  color: #000;
  transition: transform 0.3s ease-in-out;
  transform: ${({ isOpen }) => (isOpen ? "rotate(180deg)" : "rotate(0)")};

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const faqData = [
  {
    question: "What if I become a victim despite being careful?",
    answer:
      "Contact our helpline immediately. We’ll guide you through complaint filing, insurance claims, and all recovery steps.",
  },
  {
    question: "Do you take any commission from insurers?",
    answer:
      "Never. Our only loyalty is to you, the client. We evaluate policies and assist with claims, but all payments go directly from you to the insurer.",
  },
  {
    question: "Is legal support included if my insurance claim is rejected?",
    answer:
      "Yes. If your insurer unfairly rejects your claim, we’ll file a case on your behalf at no extra cost—covered by your subscription.",
  },
  {
    question: "Do you handle deepfake and AI-powered scam cases across India?",
    answer:
      "Due to the need for local police and legal action, our deepfake, voice cloning, and AI-powered scam support is currently available only in Bangalore and Delhi NCR.",
  },
  {
    question: "What are your subscription fees?",
    answer:
      "INR 1,200 per month for a family or group of 4, INR 6,000 for half-yearly, and INR 12,000 for yearly. Corporate clients get the same rates, with a 15% discount if the company covers all employees.",
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <FaqSection>
      <FaqContainer>
        <FaqTitle>
          Frequently Asked <BlueText>Questions</BlueText>
        </FaqTitle>

        {faqData.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <FaqItem onClick={() => toggleFaq(index)}>
              <Question>
                {item.question}
                {openIndex === index ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </Question>

              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{
                  opacity: openIndex === index ? 1 : 0,
                  height: openIndex === index ? "auto" : 0,
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <Answer isOpen={openIndex === index}>{item.answer}</Answer>
              </motion.div>
            </FaqItem>
          </motion.div>
        ))}
      </FaqContainer>
    </FaqSection>
  );
};

export default Faq;
