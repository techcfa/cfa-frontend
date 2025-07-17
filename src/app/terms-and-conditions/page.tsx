"use client";

import styled from "styled-components";
import { motion } from "framer-motion";

const PageContainer = styled.section`
  font-family: "Montserrat", sans-serif;
  color: #333;
   margin-top: 60px;
  background: #fafafa;
`;

const HeaderSection = styled.section`
  background-image: url("/BG.png");
  background-size: cover;
  background-position: center;
  padding: 80px 150px;
  text-align: start;
  color: #fff;

  @media (max-width: 1024px) {
    padding: 60px 40px;
  }

  @media (max-width: 768px) {
    padding: 50px 20px;
  }
`;

const Title = styled.h1`
  font-size: 2.8rem;
  font-weight: 700;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Date = styled.p`
  font-size: 1rem;
  color: #ddd;
`;

const ContentWrapper = styled.div`
  padding: 50px 150px;

  @media (max-width: 1024px) {
    padding: 40px 40px;
  }

  @media (max-width: 768px) {
    padding: 30px 20px;
  }
`;

const Section = styled.div`
  margin-bottom: 30px;
`;

const SectionTitle = styled.h2`
  font-size: 1.3rem;
  font-weight: 600;
  color: #0073D7;
  margin-bottom: 10px;
`;

const Paragraph = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #444;
`;

const List = styled.ul`
  margin-left: 20px;
  margin-top: 10px;

  li {
    margin-bottom: 8px;
    line-height: 1.5;
  }
`;

const ContactInfo = styled.div`
  margin-top: 20px;

  a {
    color: #0073D7;
    font-weight: 600;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export default function TermsAndConditions() {
  return (
    <PageContainer
      as={motion.div}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* 🖼️ Header Section with BG */}
      <HeaderSection>
        <Title>Terms and Conditions</Title>
        <Date>Effective Date: July 22, 2025</Date>
      </HeaderSection>

      <ContentWrapper>
        <Paragraph>
          Welcome to Cyber Fraud Protection (“we,” “us,” or “our”). By accessing or using our website and services, you agree to comply with and be bound by the following Terms and Conditions. Please read them carefully before using our platform.
        </Paragraph>

        <Section>
          <SectionTitle>1. Acceptance of Terms</SectionTitle>
          <Paragraph>
            By using this website or subscribing to our services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions, as well as our Privacy Policy and Disclaimer.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>2. Eligibility</SectionTitle>
          <List>
            <li>Our services are intended for individuals aged 18 years or older.</li>
            <li>By registering, you confirm that you meet this age requirement and have the legal capacity to enter into a binding agreement.</li>
          </List>
        </Section>

        <Section>
          <SectionTitle>3. Scope of Services</SectionTitle>
          <List>
            <li>Cyber Fraud Protection provides cyber fraud awareness, research updates, insurance advisory, victim support, and specialized services as described on our website.</li>
            <li>Certain services (e.g., deepfake and AI-powered scam support) are available only in Bangalore and Delhi NCR.</li>
            <li>We reserve the right to modify, suspend, or discontinue any part of our services at any time.</li>
          </List>
        </Section>

        <Section>
          <SectionTitle>4. User Responsibilities</SectionTitle>
          <List>
            <li>You agree to provide accurate and complete information when registering or communicating with us.</li>
            <li>You are responsible for maintaining the confidentiality of your account details and for all activities under your account.</li>
            <li>You agree not to misuse our website or services, including attempting unauthorized access, distributing malware, or engaging in fraudulent activities.</li>
          </List>
        </Section>

        <Section>
          <SectionTitle>5. Subscription, Fees, and Payment</SectionTitle>
          <List>
            <li>Subscription fees, billing cycles, and discounts are clearly displayed on our website.</li>
            <li>All payments must be made as per the selected plan. Fees are non-refundable except as required by law.</li>
            <li>We reserve the right to revise pricing or introduce new charges with prior notice.</li>
          </List>
        </Section>

        <Section>
          <SectionTitle>6. Third-Party Services</SectionTitle>
          <List>
            <li>We may facilitate connections with third-party service providers, such as insurers, solely as your representative.</li>
            <li>All insurance decisions and payments are made directly between you and the insurer. We do not accept commissions or act as agents/brokers.</li>
          </List>
        </Section>

        <Section>
          <SectionTitle>7. Limitation of Liability</SectionTitle>
          <List>
            <li>Cyber Fraud Protection and its associates are not liable for any direct, indirect, incidental, consequential, or special damages arising from your use of our website or services.</li>
            <li>We do not guarantee the success of any legal action, complaint, or insurance claim, as outcomes depend on factors beyond our control.</li>
          </List>
        </Section>

        <Section>
          <SectionTitle>8. Intellectual Property</SectionTitle>
          <List>
            <li>All content on this website, including text, graphics, videos, and logos, is the property of Cyber Fraud Protection or its licensors.</li>
            <li>You may not reproduce, distribute, or modify any content without our prior written consent.</li>
          </List>
        </Section>

        <Section>
          <SectionTitle>9. Termination</SectionTitle>
          <List>
            <li>We reserve the right to suspend or terminate your access to our website or services for violation of these Terms and Conditions or any applicable law.</li>
            <li>Upon termination, your right to use our services will immediately cease.</li>
          </List>
        </Section>

        <Section>
          <SectionTitle>10. Indemnification</SectionTitle>
          <Paragraph>
            You agree to indemnify and hold harmless Cyber Fraud Protection, its team, and affiliates from any claims, damages, or expenses arising from your use of the website or services, violation of these Terms, or infringement of any third-party rights.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>11. Governing Law and Jurisdiction</SectionTitle>
          <Paragraph>
            These Terms and Conditions are governed by the laws of India. Any disputes arising out of or relating to these Terms shall be subject to the exclusive jurisdiction of the courts in [Insert City/State].
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>12. Changes to Terms</SectionTitle>
          <Paragraph>
            We may update these Terms and Conditions from time to time. Changes will be posted on this page with the revised effective date. Continued use of the website or services after changes constitutes acceptance of the new Terms.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>13. Contact</SectionTitle>
          <Paragraph>
            For any questions or concerns regarding these Terms and Conditions, please contact us at:
          </Paragraph>
          <ContactInfo>
            <p>Email: <a href="mailto:support@cyberfraudprotection.com">support@cyberfraudprotection.com</a></p>
            <p>Phone: <a href="tel:+917044432779">7044432779</a></p>
            <p>Office Address: no. 21, 7th Cross, C T Bed Road, Banashankari 2nd Stage, Bangalore 560070</p>
          </ContactInfo>
        </Section>

        <Paragraph>
          By using our website and services, you agree to these Terms and Conditions.
        </Paragraph>
      </ContentWrapper>
    </PageContainer>
  );
}
