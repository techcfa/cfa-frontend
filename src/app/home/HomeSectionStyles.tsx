import styled from "styled-components";

export const Section = styled.section`
  position: relative;
  width: 100%;
  min-height: 90vh;
  padding: 3rem 150px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;

  @media (max-width: 1200px) {
    padding: 3rem 100px;
  }

  @media (max-width: 1024px) {
    padding: 2.5rem 50px;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }

  @media (max-width: 768px) {
    padding: 2rem 20px;
    min-height: auto;
  }
`;

export const BackgroundImage = styled.div`
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
  }
`;

export const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: -1;
`;

export const Content = styled.div`
  position: relative;
  max-width: 800px;
  text-align: left;
  color: white;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: 1024px) {
    max-width: 90%;
    align-items: flex-start;
  }

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

export const Title = styled.h1`
  font-size: 3rem;
  font-family: "Montserrat", sans-serif;
  font-weight: bold;
  color: #fff;
  line-height: 1.2;
  text-align: left;

  @media (max-width: 1200px) {
    font-size: 2.7rem;
  }

  @media (max-width: 1024px) {
    font-size: 2.4rem;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`;

export const Subtitle = styled.p`
  margin-top: 15px;
  font-size: 1.2rem;
  font-family: "Lato", sans-serif;
  color: #dcdcdc;
  text-align: left;

  @media (max-width: 1200px) {
    font-size: 1.1rem;
  }

  @media (max-width: 1024px) {
    font-size: 1rem;
  }

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

export const USP = styled.p`
  color: #fff;
  font-size: 1.1rem;
  font-weight: 500;
  margin-top: 20px;
  max-width: 700px;
  line-height: 1.4;
  text-align: left;

  @media (max-width: 1200px) {
    font-size: 1rem;
  }

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

export const Price = styled.p`
  color: #ccc;
  font-size: 0.95rem;
  margin-top: 15px;
  text-align: left;

  @media (max-width: 1200px) {
    font-size: 0.9rem;
  }

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

export const ButtonContainer = styled.div`
  margin-top: 25px;
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;

  @media (max-width: 1024px) {
    justify-content: flex-start;
  }

  @media (max-width: 768px) {
    justify-content: flex-start;
  }
`;
