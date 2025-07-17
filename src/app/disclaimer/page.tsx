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

export default function Disclaimer() {
  return (
    <PageContainer
      as={motion.div}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* 🖼️ Header Section with BG */}
      <HeaderSection>
        <Title>Disclaimer</Title>
      </HeaderSection>

      <ContentWrapper>
        <Section>
          <SectionTitle>General Information Only</SectionTitle>
          <Paragraph>
            The information and services provided on this website, including but not limited to videos, alerts, advisory, and support, are for general informational purposes only. While we strive to ensure accuracy and timeliness, Resolve 360 and its team do not guarantee the completeness, reliability, or suitability of the content for any specific purpose.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>No Legal or Professional Relationship</SectionTitle>
          <Paragraph>
            Use of this website or our services does not create an attorney-client relationship between you and Resolve 360, Advocate Vipin Choudhary, or any associated legal professionals unless expressly agreed in writing. Any guidance provided is general in nature and should not be construed as formal legal advice.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>Third-Party Services and Insurance</SectionTitle>
          <Paragraph>
            Resolve 360 facilitates connections with third-party cyber insurance providers and offers policy evaluation as a client representative only. We do not act as an insurance agent or broker, nor do we accept any commission, fee, or remuneration from insurers. All insurance decisions and premium payments are made directly between you and the insurer. We are not responsible for the actions, omissions, or policies of any third-party provider.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>Jurisdictional Limitations</SectionTitle>
          <Paragraph>
            Certain services—such as support for Deepfake, Voice Cloning, and AI-powered scam cases—are available only in Bangalore and Delhi NCR due to jurisdictional and legal constraints. We do not guarantee the availability or outcome of police or legal proceedings in any jurisdiction.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>No Guarantee of Outcome</SectionTitle>
          <Paragraph>
            While we endeavor to assist in the recovery of losses, filing of complaints, and insurance claims, Resolve 360 cannot guarantee the success of any legal action, complaint, or claim. Outcomes depend on numerous factors outside our control, including but not limited to the actions of law enforcement, insurers, and third parties.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>Limitation of Liability</SectionTitle>
          <Paragraph>
            Resolve 360, Advocate Vipin Choudhary, and all associates expressly disclaim any liability for any direct, indirect, incidental, consequential, or special damages arising from your use of this website or our services, including but not limited to loss of data, loss of funds, or reputational harm.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>User Responsibility</SectionTitle>
          <Paragraph>
            You are responsible for safeguarding your personal information, passwords, and devices. Always verify the authenticity of communications and exercise caution online. Resolve 360 is not liable for any losses arising from your failure to follow security best practices or from actions taken independently of our advice.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>Changes to Disclaimer</SectionTitle>
          <Paragraph>
            This disclaimer may be updated from time to time. Please review this page regularly for any changes.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>Contact</SectionTitle>
          <Paragraph>
            For questions or clarifications regarding this disclaimer, please contact us at:
          </Paragraph>
          <ContactInfo>
            <p>Email: <a href="mailto:support@cyberfraudprotection.com">support@cyberfraudprotection.com</a></p>
            <p>Phone: <a href="tel:+917044432779">7044432779</a></p>
            <p>Office Address: no. 21, 7th Cross, C T Bed Road, Banashankari 2nd Stage, Bangalore 560070</p>
          </ContactInfo>
        </Section>

        <Paragraph>
          By using our website and services, you agree to this Disclaimer.
        </Paragraph>
      </ContentWrapper>
    </PageContainer>
  );
}
