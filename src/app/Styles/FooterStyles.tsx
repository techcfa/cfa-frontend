import styled from "styled-components";

export const FooterContainer = styled.footer`
  background-color: #0073D7;
  color: white;
  padding: 40px 80px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 120px; 
  font-family: "Nunito", sans-serif;

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  @media (max-width: 768px) {
    padding: 40px 20px;
  }
`;

export const LeftSection = styled.div`
  max-width: 350px;

  img {
    width: 220px;
    margin-bottom: 15px;
  }

  h3 {
    font-family: "Montserrat", sans-serif;
    font-weight: 600;
    font-size: 1.5rem;
  }

  p {
    font-size: 1rem;
    font-family: "Lato", sans-serif;
    line-height: 1.5;
    margin-bottom: 20px;
  }

  @media (max-width: 1024px) {
    text-align: center;
    max-width: 100%;
  }

  @media (max-width: 768px) {
    img {
      width: 180px;
    }
  }
`;

export const SocialIcons = styled.div`
  display: flex;
  gap: 15px;

  img {
    width: 35px;
    height: 35px;
    transition: transform 0.3s ease-in-out;

    &:hover {
      transform: scale(1.1);
    }
  }

  @media (max-width: 1024px) {
    justify-content: center;
  }
`;

export const MiddleSection = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 150px;

  p {
    font-size: 1rem;
    font-family: "Montserrat", sans-serif;
    font-weight: 600;
    margin-bottom: 12px;
  }

  a {
    color: white;
    text-decoration: none;
    font-size: 1rem;
    font-family: "Lato", sans-serif;
    margin-bottom: 8px;
    transition: color 0.3s ease-in-out;

    &:hover {
      color: #dbe9ff;
    }
  }

  @media (max-width: 1024px) {
    align-items: center;
    text-align: center;
  }
`;

export const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 180px;

  p {
    font-size: 1rem;
    font-family: "Montserrat", sans-serif;
    font-weight: 600;
    margin-bottom: 8px;
  }

  a {
    color: white;
    text-decoration: none;
    font-size: 1rem;
    font-family: "Lato", sans-serif;
    margin-bottom: 10px;
    transition: color 0.3s ease-in-out;

    &:hover {
      color: #dbe9ff;
    }
  }

  @media (max-width: 1024px) {
    align-items: center;
    text-align: center;
  }
`;

export const FooterBottom = styled.div`
  width: 100%;
  text-align: center;
  padding-top: 15px;
  margin-top: -50px;
  border-top: 1px solid white;
  font-family: "Montserrat", sans-serif;
  font-size: 1rem;
`;


export const FooterLogo = styled.img`
  width: 150px;
  display: block;
  margin-bottom: 20px;

  @media (max-width: 1024px) {
    width: 130px;
    margin: 0 auto 20px;
  }

  @media (max-width: 768px) {
    width: 110px;
  }
`;
