"use client";

import styled from "styled-components";
import { motion } from "framer-motion";

const PageContainer = styled.section`
  font-family: "Montserrat", sans-serif;
  color: #333;
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

export default function PrivacyPolicy() {
  return (
    <PageContainer
      as={motion.div}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* 🖼️ Header Section with BG */}
      <HeaderSection>
        <Title>Privacy Policy</Title>
        <Date>Effective Date: July 22, 2025</Date>
      </HeaderSection>

      <ContentWrapper>
        <Paragraph>
          Cyber Fraud Protection (“we,” “us,” or “our”) is committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, store, and protect your data when you use our website and services.
        </Paragraph>

        <Section>
          <SectionTitle>1. Information We Collect</SectionTitle>
          <List>
            <li><strong>Personal Information:</strong> Name, email address, phone number, city/location, and other contact details provided via forms or communications.</li>
            <li><strong>Service Usage Information:</strong> Details about your interactions with our website, services, and customer support (including helpline calls and emails).</li>
            <li><strong>Technical Information:</strong> IP address, browser type, device information, operating system, and access times.</li>
            <li><strong>Other Information:</strong> Any additional information you voluntarily provide (e.g., messages, queries, feedback).</li>
          </List>
        </Section>

        <Section>
          <SectionTitle>2. How We Use Your Information</SectionTitle>
          <List>
            <li>Provide, operate, and improve our services.</li>
            <li>Respond to your inquiries and provide customer support.</li>
            <li>Send important updates, alerts, and information about cyber fraud trends.</li>
            <li>Facilitate third-party services (such as insurance advisory) at your request.</li>
            <li>Maintain security and prevent fraud or misuse of our services.</li>
            <li>Comply with legal and regulatory requirements.</li>
          </List>
        </Section>

        <Section>
          <SectionTitle>3. Sharing and Disclosure</SectionTitle>
          <List>
            <li><strong>With Your Consent:</strong> When you request services such as insurance advisory or legal support, we may share relevant information with third-party providers strictly as needed to fulfill your request.</li>
            <li><strong>Service Providers:</strong> With trusted vendors who assist us in operating our website, processing data, or delivering services (subject to confidentiality agreements).</li>
            <li><strong>Legal Compliance:</strong> If required by law, regulation, or legal process, or to protect our rights, users, or the public.</li>
          </List>
        </Section>

        <Section>
          <SectionTitle>4. Data Security</SectionTitle>
          <Paragraph>
            We implement reasonable technical and organizational measures to protect your information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission or storage is completely secure, and we cannot guarantee absolute security.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>5. Your Rights and Choices</SectionTitle>
          <List>
            <li>Access, update, or correct your personal information by contacting us.</li>
            <li>Withdraw your consent or request deletion of your data (subject to legal requirements).</li>
            <li>Opt out of receiving non-essential communications at any time.</li>
          </List>
        </Section>

        <Section>
          <SectionTitle>6. Data Retention</SectionTitle>
          <Paragraph>
            We retain your personal information only as long as necessary to fulfill the purposes described in this policy or as required by law.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>7. Cookies and Tracking Technologies</SectionTitle>
          <Paragraph>
            Our website may use cookies and similar technologies to enhance your experience and analyze usage. You can manage your cookie preferences through your browser settings.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>8. Children’s Privacy</SectionTitle>
          <Paragraph>
            Our services are not intended for children under the age of 18. We do not knowingly collect personal information from minors. If you believe a child has provided us with personal data, please contact us for prompt removal.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>9. Changes to This Privacy Policy</SectionTitle>
          <Paragraph>
            We may update this Privacy Policy from time to time. Changes will be posted on this page with the revised effective date. Please review this policy periodically.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>10. Contact Us</SectionTitle>
          <Paragraph>
            If you have any questions, concerns, or requests regarding your privacy or this policy, please contact us at:
          </Paragraph>
          <ContactInfo>
            <p>Email: <a href="mailto:support@cyberfraudprotection.com">support@cyberfraudprotection.com</a></p>
            <p>Phone: <a href="tel:+917044432779">7044432779</a></p>
            <p>Office Address: no. 21, 7th Cross, C T Bed Road, Banashankari 2nd Stage, Bangalore 560070</p>
          </ContactInfo>
        </Section>

        <Paragraph>
          By using our website and services, you agree to this Privacy Policy.
        </Paragraph>
      </ContentWrapper>
    </PageContainer>
  );
}
