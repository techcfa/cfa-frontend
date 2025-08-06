"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Section,
  BackgroundImage,
  Overlay,
  Content,
  Title,
  Subtitle,
  USP,
  Price,
  ButtonContainer
} from "./HomeSectionStyles";

const HomeSection: React.FC = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" });

  const handleScrollToSection = (sectionId: string) => {
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Section id="home" ref={sectionRef}>
      {/* Background Image */}
      <BackgroundImage>
        <img src="/BG.png" alt="Background" />
      </BackgroundImage>

      <Overlay />

      <Content
        as={motion.div}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <Title
          as={motion.h1}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 1 }}
        >
          Your Trusted Shield Against Cyber Fraud
        </Title>

        <Subtitle
          as={motion.p}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 1 }}
        >
          Complete support— from complaint to recovery, insurance claims,
          and even court battles if needed.
        </Subtitle>

        <USP
          as={motion.p}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <strong>
            If your insurance claim is rejected, we’ll file and fight your case
            in Consumer Court — at <u>NO extra fee</u>. Court case fee is included
            in your subscription.
          </strong>
        </USP>

        <Price
          as={motion.p}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 1 }}
        >
          Starting at just ₹ 300/month per person
        </Price>

        <ButtonContainer>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8, duration: 1 }}
            onClick={() => window.location.href = '/auth/signup'}
            style={{
              padding: "12px 24px",
              background: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              fontSize: "16px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Get Started
          </motion.button>
        </ButtonContainer>
      </Content>
    </Section>
  );
};

export default HomeSection;
