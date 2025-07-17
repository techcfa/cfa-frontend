"use client";

import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

const Section = styled.section`
  padding: 40px 150px;
  background: #f9f9f9;
  background-image: url("/CBG.png");
  background-size: cover;
  background-position: center;
  

  @media (max-width: 1024px) {
    padding: 30px 15px;
  }

  @media (max-width: 768px) {
    padding: 25px 10px;
  }
`;

const Heading = styled.h2`
  font-size: 2.2rem;
  font-weight: bold;
  color: #000;
  text-align: left;
  margin-bottom: 10px;

  span {
    color: #0073D7;
  }

  @media (max-width: 1024px) {
    font-size: 2rem;
  }

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const Subheading = styled.p`
  margin-bottom: 30px;
  font-size: 1rem;
  color: #555;
`;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
  transition: transform 0.3s ease-in-out;
  min-height: 350px;

  &:hover {
    transform: translateY(-5px);
  }
`;

const Icon = styled.img`
  width: 50px;
  height: 50px;
`;

const Title = styled.h3`
  font-size: 1.3rem;
  color: #121212;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const PriceTable = styled.div`
  border-top: 1px solid #ddd;
  margin-top: 10px;
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
  color: #333;
`;

const Note = styled.div`
  margin-top: auto;
  font-size: 0.9rem;
  text-align: center;
  color: #333;
  border-top: 1px solid #eee;
  padding-top: 8px;
`;

const CorporateNote = styled.div`
  margin-top: 10px;
  font-size: 0.9rem;
  text-align: center;
  color: #000;
  font-weight: 600;

  small {
    display: block;
    font-weight: normal;
    color: #555;
  }

  .star {
    color: #000 !important; 
    font-style: normal;
    font-weight: bold;
  }
`;

export default function Plans() {
  return (
    <Section id="plans">
      <Heading>
        Subscription <span>Plans</span>
      </Heading>
      <Subheading>Simple, Transparent Pricing — No Hidden Charges</Subheading>

      <CardsContainer>
        {/* Family / Group Plan */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <Card>
            <Icon src="/family.png" alt="Family Icon" />
            <Title>Family/Group of 4</Title>
            <PriceTable>
              <PriceRow>
                <span>Monthly</span>
                <span>₹1,200</span>
              </PriceRow>
              <PriceRow>
                <span>Half-Yearly</span>
                <span>₹6,000</span>
              </PriceRow>
              <PriceRow>
                <span>Yearly</span>
                <span>₹12,000</span>
              </PriceRow>
            </PriceTable>
            <Note>₹300 per person/month</Note>
          </Card>
        </motion.div>

        {/* Corporate Plan */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
        >
          <Card>
            <Icon src="/corporate.png" alt="Corporate Icon" />
            <Title>Corporate (per 4 people)</Title>
            <PriceTable>
              <PriceRow>
                <span>Monthly</span>
                <span>₹1,200</span>
              </PriceRow>
              <PriceRow>
                <span>Half-Yearly</span>
                <span>₹6,000</span>
              </PriceRow>
              <PriceRow>
                <span>Yearly</span>
                <span>₹12,000</span>
              </PriceRow>
            </PriceTable>
            <CorporateNote>
              <span className="star">✨</span> 10% Corporate Discount
              <br />
              <small>If company pays for all employees</small>
            </CorporateNote>
            <Note>₹300 per person/month</Note>
          </Card>
        </motion.div>
      </CardsContainer>
    </Section>
  );
}
