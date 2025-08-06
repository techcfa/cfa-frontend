"use client";

import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { motion, useInView } from "framer-motion";

// Styled Components
const Section = styled.section`
  position: relative;
  width: 100%;
  min-height: 90vh;
  padding: 3rem 150px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;

  @media (max-width: 1024px) {
    padding: 2.5rem 50px;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }

  @media (max-width: 768px) {
    padding: 8rem 20px;
    min-height: auto;
  }
`;

const BackgroundImage = styled.div<{ activeIndex: number }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 90vh;
  overflow: hidden;
  z-index: -2;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: opacity 0.5s ease;
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
  }

  img:nth-child(1) {
    opacity: ${({ activeIndex }) => (activeIndex === 0 ? 1 : 0)};
  }

  img:nth-child(2) {
    opacity: ${({ activeIndex }) => (activeIndex === 1 ? 1 : 0)};
  }
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: -1;
`;

const Content = styled.div`
  position: relative;
  max-width: 800px;
  text-align: left;
  color: white;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-family: "Montserrat", sans-serif;
  font-weight: bold;
  color: #fff;
  line-height: 1.2;

  @media (max-width: 1024px) {
    font-size: 2.4rem;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  margin-top: 15px;
  font-size: 1.2rem;
  font-family: "Lato", sans-serif;
  color: #dcdcdc;

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
`;

const USP = styled.p`
  color: #fff;
  font-size: 1.1rem;
  font-weight: 500;
  margin-top: 20px;
  max-width: 700px;
  line-height: 1.4;
`;

const Price = styled.p`
  color: #ccc;
  font-size: 0.95rem;
  margin-top: 15px;
`;

const ButtonContainer = styled.div`
  margin-top: 25px;
  display: flex;
  gap: 15px;
`;

const CarouselContainer = styled.div`
  display: flex;
  width: 100%;
  overflow: hidden;
`;

const SlideWrapper = styled(motion.div)`
  display: flex;
  flex-direction: row;
  width: 200%;
`;

const CarouselSlide = styled.div`
  width: 100%;
  flex-shrink: 0;
  padding-right: 50px;
`;

const DotsContainer = styled.div`
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
`;

const Dot = styled(motion.div)<{ active: boolean }>`
  width: ${({ active }) => (active ? "14px" : "10px")};
  height: ${({ active }) => (active ? "14px" : "10px")};
  border-radius: 50%;
  background-color: ${({ active }) => (active ? "#007bff" : "#888")};
  cursor: pointer;
  transition: all 0.3s ease;
`;

const HomeSection: React.FC = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });
  const [carouselIndex, setCarouselIndex] = useState(0);

  const handleSwipe = (direction: number) => {
    setCarouselIndex((prev) => (prev + direction + 2) % 2);
  };

  const handleDotClick = (index: number) => {
    setCarouselIndex(index);
  };

  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // 🔁 Autoplay logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % 2);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Section id="home" ref={sectionRef}>
      <BackgroundImage activeIndex={carouselIndex}>
        <img src="/BG1.png" alt="Slide 1 Background" />
        <img src="/BG2.png" alt="Slide 2 Background" />
      </BackgroundImage>

      <Overlay />

      <CarouselContainer>
        <SlideWrapper
          animate={{ x: `-${carouselIndex * 100}%` }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={(e, info) => {
            if (info.offset.x < -80) handleSwipe(1);
            else if (info.offset.x > 80) handleSwipe(-1);
          }}
        >
          {/* Slide 1 */}
          <CarouselSlide>
            <Content
              as={motion.div}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <Title>Your Trusted Shield Against Cyber Fraud</Title>
              <Subtitle>
                Complete support—from complaint to recovery, insurance claims,
                and court battles.
              </Subtitle>
              <USP>
                <strong>
                  If your insurance claim is rejected, we’ll fight it in
                  Consumer Court at <u>NO extra fee</u>.
                </strong>
              </USP>
              <Price>Starting at just ₹ 300/month per person</Price>
              <ButtonContainer>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleScrollToSection("contact")}
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
                  Subscribe Now
                </motion.button>
              </ButtonContainer>
            </Content>
          </CarouselSlide>

          {/* Slide 2 */}
          <CarouselSlide>
            <Content>
              <Title>FORTINETSECURE PRIVATE LIMITED</Title>
              <Subtitle>CIN: SRNAB5763989</Subtitle>
              <Subtitle>GSTIN: 29ABCDE1234F1Z5</Subtitle>
              <USP>
                Address: No. 21, 7th cross, CT Bed Road, Banashankari 2nd Stage,
                Bangalore 56007
              </USP>
            </Content>
          </CarouselSlide>
        </SlideWrapper>
      </CarouselContainer>

      {/* Dots */}
      <DotsContainer>
        {[0, 1].map((index) => (
          <Dot
            key={index}
            active={carouselIndex === index}
            onClick={() => handleDotClick(index)}
            whileHover={{ scale: 1.2 }}
          />
        ))}
      </DotsContainer>
    </Section>
  );
};

export default HomeSection;
