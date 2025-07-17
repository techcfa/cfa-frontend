import styled from "styled-components";

export const ServicesSection = styled.section`
  padding: 4rem 150px;
  position: relative;
  overflow: hidden;

  @media (max-width: 1200px) {
    padding: 3rem 80px;
  }

  @media (max-width: 1024px) {
    padding: 2.5rem 50px;
  }

  @media (max-width: 768px) {
    padding: 2rem 20px;
  }
`;

export const BGImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("/CBG.png");
  background-size: cover;
  background-position: center;
  z-index: 0;
`;

export const TitleContainer = styled.div`
  text-align: start;
  margin-bottom: 40px;
  position: relative;
  z-index: 1;

  p {
    margin-top: 8px;
    font-size: 1rem;
    color: #555;

    @media (max-width: 1024px) {
      font-size: 0.95rem;
    }

    @media (max-width: 768px) {
      font-size: 0.9rem;
    }

    @media (max-width: 480px) {
      font-size: 0.85rem;
    }
  }
`;

export const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: #000;
  font-family: "Montserrat", sans-serif;

  @media (max-width: 1200px) {
    font-size: 2.2rem;
  }

  @media (max-width: 1024px) {
    font-size: 2rem;
  }

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }

  @media (max-width: 480px) {
    font-size: 1.6rem;
  }
`;

export const Highlight = styled.span`
  color: #0073D7;
`;

export const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  z-index: 1;
  position: relative;

  @media (max-width: 1200px) {
    gap: 20px;
  }

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

export const Card = styled.div`
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease, transform 0.8s ease;

  &.visible {
    opacity: 1;
    transform: translateY(0);

    &:hover {
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
    }
  }

  @media (max-width: 1200px) {
    border-radius: 8px;
  }

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

export const CardContent = styled.div`
  padding: 16px;
  text-align: left;

  h3 {
    font-size: 1.1rem;
    font-weight: 700;
    color: #000;
    margin-bottom: 8px;

    @media (max-width: 1200px) {
      font-size: 1rem;
    }

    @media (max-width: 768px) {
      font-size: 0.95rem;
    }
  }

  p {
    font-size: 0.9rem;
    color: #666;
    line-height: 1.4;

    @media (max-width: 1200px) {
      font-size: 0.85rem;
    }

    @media (max-width: 768px) {
      font-size: 0.8rem;
    }
  }
`;
