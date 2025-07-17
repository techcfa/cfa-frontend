"use client";

import { motion } from "framer-motion";
import styled from "styled-components";

export default function HowItWorksPage() {
  const steps = [
    {
      icon: "/Hicon1.png",
      number: "1",
      title: "Subscribe Online",
      description: "Choose a plan for yourself, your family, or your team.",
    },
    {
      icon: "/Hicon2.png",
      number: "2",
      title: "Get Instant Access",
      description: (
        <ul>
          <li>Watch the awareness video.</li>
          <li>Receive your welcome kit with support details.</li>
        </ul>
      ),
    },
    {
      icon: "/Hicon3.png",
      number: "3",
      title: "Stay Updated",
      description: "Get regular fraud alerts and research updates.",
    },
    {
      icon: "/Hicon4.png",
      number: "4",
      title: "24/7 Helpline",
      description: (
        <>
          <strong>+91 7044432779</strong> — Save it now. Call us anytime you need help.
        </>
      ),
    },
    {
      icon: "/Hicon5.png",
      number: "5",
      title: "Expert Guidance",
      description:
        "Your subscription covers everything: from guiding you through filing complaints and maximizing your recovery chances, to assisting with your insurance claim — and if needed, fighting your case in consumer court at no extra cost.",
    },
  ];

  return (
    <Section>
      <Heading>
        How It <span>Works</span>
      </Heading>
      <Subheading>Simple. Transparent. Effective.</Subheading>

      <Steps>
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Step>
              <IconCircle>
                <Icon src={step.icon} alt={step.title} />
              </IconCircle>

              <Content>
                <TitleRow>
                  <Number>{step.number}</Number>
                  <Title>{step.title}</Title>
                </TitleRow>

                <Description>{step.description}</Description>
              </Content>
            </Step>
          </motion.div>
        ))}
      </Steps>

      <FinalNote>
        Start your journey toward cyber resilience today — it’s easy, fast, and effective.
      </FinalNote>
    </Section>
  );
}

// ---------- styled-components ----------

const Section = styled.section`
  padding: 50px 150px;
  background: #fafafa;
  background-image: url("/CBG.png");
  background-size: cover;
  background-position: center;

  @media (max-width: 1024px) {
    padding: 40px 20px;
  }

  @media (max-width: 768px) {
    padding: 30px 10px;
  }
`;

const Heading = styled.h2`
  font-size: 2.4rem;
  font-weight: 700;
  color: #000;
  text-align: start;
  margin-bottom: 10px;

  span {
    color: #0073d7;
  }
`;

const Subheading = styled.p`
  margin-bottom: 40px;
  font-size: 1.1rem;
  color: #555;
  text-align: start;
`;

const Steps = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Step = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 20px;
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  min-height: 120px;
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: start;
    align-items: flex-start;
  }
`;

const IconCircle = styled.div`
  width: 60px;
  height: 60px;
  background: #eef6fe;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  @media (max-width: 768px) {
    margin: 0;
  }
`;

const Icon = styled.img`
  width: 30px;
  height: 30px;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: 768px) {
    justify-content: flex-start;
  }
`;

const Number = styled.span`
  background: #0073d7;
  color: #fff;
  font-size: 0.85rem;
  font-weight: 600;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const Title = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: #000;
  margin: 0;
`;

const Description = styled.div`
  font-size: 1rem;
  color: #444;

  ul {
    margin: 0;
    padding-left: 20px;
  }

  @media (max-width: 768px) {
    text-align: start;
  }
`;

const FinalNote = styled.p`
  margin-top: 40px;
  font-size: 1.2rem;
  font-weight: 500;
  color: #000;
  text-align: center;
`;
