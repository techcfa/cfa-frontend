import styled from "styled-components";

export const Nav = styled.nav`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  z-index: 1000;
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30px 150px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 1200px) {
    padding: 20px 80px;
  }

  @media (max-width: 992px) {
    padding: 20px 40px;
  }

  @media (max-width: 576px) {
    padding: 20px 20px;
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;

  img {
    max-height: 50px;
    width: auto;

    @media (max-width: 768px) {
      max-height: 35px;
    }

    @media (max-width: 480px) {
      max-height: 30px;
    }
  }
`;

export const NavList = styled.ul`
  display: flex;
  gap: 32px;
  list-style: none;
  align-items: center;

  @media (max-width: 992px) {
    gap: 24px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const NavItem = styled.li`
  a {
    text-decoration: none;
    color: black;
    font-size: 16px;
    font-family: "Montserrat", sans-serif;
    font-weight: 600;
    cursor: pointer;
    transition: color 0.3s ease-in-out;

    &:hover {
      color: #0073D7;
    }

    @media (max-width: 992px) {
      font-size: 15px;
    }
  }
`;

export const ContactButton = styled.button`
  background-color: #0073D7;
  color: white;
  font-size: 15px;
  font-weight: 600;
  border: none;
  padding: 10px 14px;
  border-radius: 6px;
  cursor: pointer;
  font-family: "Montserrat", sans-serif;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: background-color 0.3s ease;

  img {
    width: 26px;
    height: 26px;
  }

  &:hover {
    background-color: #007bff;
  }

  @media (max-width: 992px) {
    font-size: 14px;
    padding: 10px 14px;
  }

  @media (max-width: 768px) {
    text-transform: uppercase;
    font-size: 13px;
    font-weight: bold;
    gap: 8px;
  }

  @media (max-width: 576px) {
    font-size: 12px;
    padding: 10px 14px;
  }
`;

export const MobileMenu = styled.ul`
  position: fixed;
  top: 0;
  left: -100%;
  width: 70%;
  max-width: 300px;
  height: 100vh;
  background: #fff;
  backdrop-filter: blur(8px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 100px 20px;
  transition: 0.3s ease-in-out;
  box-shadow: 5px 0 10px rgba(0, 0, 0, 0.1);
  list-style: none;
  z-index: 999;

  &.active {
    left: 0;
  }

  @media (min-width: 769px) {
    display: none;
  }

  ${NavItem} {
    width: 100%;
    text-align: center;
    padding: 12px 0;

    a {
      font-size: 18px;
      font-weight: bold;
      color: black;
      text-transform: uppercase;

      @media (max-width: 576px) {
        font-size: 16px;
      }
    }

    .divider {
      display: block;
      width: 80%;
      height: 1px;
      background-color: rgba(0, 0, 0, 0.2);
      margin: 10px auto;
    }
  }
`;

export const HamburgerMenu = styled.div`
  display: none;
  cursor: pointer;
  flex-direction: column;
  gap: 5px;
  justify-content: center;
  align-items: center;

  div {
    width: 28px;
    height: 3px;
    background-color: black;
    transition: 0.3s;
    border-radius: 5px;
  }

  &.open div:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
  }

  &.open div:nth-child(2) {
    opacity: 0;
  }

  &.open div:nth-child(3) {
    transform: rotate(-45deg) translate(5px, -5px);
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;
