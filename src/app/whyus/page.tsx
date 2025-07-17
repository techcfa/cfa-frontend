"use client";

import styled from "styled-components";
import { motion } from "framer-motion";

const Section = styled.section`
  background: #f9f9f9;
  padding: 3rem 150px;
  background-image: url("/CBG.png");
  background-size: cover;
  background-position: center;

  @media (max-width: 1200px) {
    padding: 2.5rem 80px;
  }

  @media (max-width: 992px) {
    padding: 2rem 40px;
  }

  @media (max-width: 576px) {
    padding: 1.5rem 20px;
  }
`;

const Container = styled.div`
  display: flex;
  align-items: start;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Left = styled(motion.div)`
  flex: 1;

  h2 {
    font-size: 2.5rem;
    font-weight: 700;
    color: #000;
    margin-bottom: 1rem;

    span {
      color: #0073d7;
    }

    @media (max-width: 992px) {
      font-size: 2rem;
    }

    @media (max-width: 576px) {
      font-size: 1.8rem;
      text-align: start;
    }
  }

  ul {
    list-style: disc inside;
    margin: 0;
    padding: 0;

    li {
      margin-bottom: 0.6rem;
      font-size: 1rem;
      font-weight: 600;
      color: #333;

      @media (max-width: 768px) {
        text-align: start;
      }
    }
  }
`;

const Divider = styled(motion.div)`
  background: #ccc;

  @media (min-width: 769px) {
    width: 1px;
    min-height: 150px;
    align-self: start;
    margin: 0 40px;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 1px;
    margin: 20px 0;
  }
`;

const Right = styled(motion.div)`
  flex: 1;
  display: flex;
  justify-content: space-around;
  align-items: start;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
    align-items: start;
  }

  .stat {
    text-align: start;

    .big {
      color: #000;
      font-size: 2.5rem;
      font-weight: bold;

      @media (max-width: 992px) {
        font-size: 2rem;
      }

      @media (max-width: 576px) {
        font-size: 1.8rem;
      }
    }

    .label {
      margin-top: 0.2rem;
      font-size: 1rem;
      font-weight: 600;
      color: #333;

      @media (max-width: 992px) {
        font-size: 0.95rem;
      }

      @media (max-width: 576px) {
        font-size: 0.9rem;
      }
    }
  }
`;

const WhyChooseUs = () => {
  return (
    <Section>
      <Container>
        <Left
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2>
            Why <span>Choose Us</span>
          </h2>
          <ul>
            <li>No commissions or conflicts of interest</li>
            <li>24/7 helpline & support</li>
            <li>
              Special expertise in Deepfake, Voice Cloning, and AI-powered Scams
              (Delhi NCR & Bangalore)
            </li>
          </ul>
        </Left>

        <Divider
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        />

        <Right
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        >
          <div className="stat">
            <div className="big">
              ₹1 lakh+ <br /> crore
            </div>
            <div className="label">
              lost in FY 2024 <br />
              (estimated reported and unreported)
            </div>
          </div>

          <div className="stat">
            <div className="big">
              8.5+ <br /> million
            </div>
            <div className="label">potential fraud cases</div>
          </div>
        </Right>
      </Container>
    </Section>
  );
};

export default WhyChooseUs;
