"use client";

import styled from "styled-components";
import Image from "next/image";
import { motion } from "framer-motion";

const Section = styled.section`
  padding: 3rem 150px;
  background: #f9f9f9;
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

const Heading = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: #000;
  margin-bottom: 2rem;

  span {
    color: #0073D7;
  }

  @media (max-width: 992px) {
    font-size: 2rem;
  }

  @media (max-width: 768px) {
    text-align: start;
    font-size: 1.8rem;
  }

  @media (max-width: 576px) {
    font-size: 1.6rem;
  }
`;

const Container = styled.div`
  display: flex;
  gap: 40px;
  align-items: flex-start;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: start;
    gap: 20px;
  }
`;

const Left = styled(motion.div)`
  flex: 1;
  max-width: 350px;

  img {
    width: 100%;
    height: auto;
    border-radius: 8px;
    object-fit: cover;
  }

  @media (max-width: 992px) {
    max-width: 300px;
  }

  @media (max-width: 576px) {
    max-width: 80%;
  }
`;

const Right = styled(motion.div)`
  flex: 2;
  min-width: 250px;

  p {
    margin: 0.5rem 0;
    font-size: 1.25rem;
    color: #333;

    @media (max-width: 992px) {
      font-size: 1.1rem;
    }

    @media (max-width: 576px) {
      font-size: 1rem;
    }
  }

  .name {
    font-size: 2rem;
    font-weight: 700;
    text-decoration: underline;
    margin: 0.3rem 0;

    @media (max-width: 992px) {
      font-size: 1.8rem;
    }

    @media (max-width: 576px) {
      font-size: 1.5rem;
    }
  }

  .link {
    color: #007bff;
    font-size: 1.25rem;
    text-decoration: underline;
    display: inline-block;
    margin-top: 0.5rem;

    @media (max-width: 992px) {
      font-size: 1.1rem;
    }

    @media (max-width: 576px) {
      font-size: 1rem;
    }
  }
`;

const AboutUs = () => {
  return (
    <Section id="about">
      <Heading>
        About <span>Us</span>
      </Heading>
      <Container>
        <Left
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Image
            src="/person.png" // replace with actual image
            alt="Advocate Vipin Choudhary"
            width={300}
            height={300}
          />
        </Left>
        <Right
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          <p>
            India’s first subscription-based cyber fraud protection service by :
          </p>
          <p className="name">ADVOCATE VIPIN CHOUDHARY & TEAM</p>
          <p>22+ years of legal expertise</p>
          <p>Protecting Indians from AI-powered scams & cyber frauds</p>
          <a href="#contact" className="link">
  Subscribe Online – or call us to subscribe.
</a>

        </Right>
      </Container>
    </Section>
  );
};

export default AboutUs;
