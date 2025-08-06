import styled from "styled-components";

// ========== NAVIGATION ========== //
export const Nav = styled.nav`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  height: 72px;
  z-index: 1000;
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 120px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.05);

  @media (max-width: 1200px) {
    padding: 16px 80px;
  }

  @media (max-width: 992px) {
    padding: 14px 40px;
  }

  @media (max-width: 576px) {
    padding: 12px 16px;
    height: 64px;
  }
`;

// ========== LOGO ========== //
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
      max-height: 28px;
    }
  }
`;

// ========== NAV ITEMS ========== //
export const NavList = styled.ul`
  display: flex;
  gap: 28px;
  list-style: none;
  align-items: center;

  @media (max-width: 992px) {
    gap: 20px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const NavItem = styled.li`
  a {
    text-decoration: none;
    color: #111;
    font-size: 15px;
    font-family: "Montserrat", sans-serif;
    font-weight: 600;
    cursor: pointer;
    transition: color 0.3s ease;

    &:hover {
      color: #2563eb;
    }

    @media (max-width: 992px) {
      font-size: 14px;
    }

    @media (max-width: 576px) {
      font-size: 13px;
    }
  }
`;

// ========== CONTACT BUTTON ========== //
export const ContactButton = styled.button`
  background-color: #2563eb;
  color: white;
  font-size: 14px;
  font-weight: 600;
  border: none;
  padding: 8px 14px;
  border-radius: 8px;
  cursor: pointer;
  font-family: "Montserrat", sans-serif;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: background-color 0.3s ease;

  img {
    width: 20px;
    height: 20px;
  }

  &:hover {
    background-color: #1e40af;
  }

  @media (max-width: 992px) {
    font-size: 13px;
    padding: 8px 12px;
  }

  @media (max-width: 768px) {
    font-size: 12.5px;
    padding: 8px 10px;
    gap: 4px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    padding: 6px 8px;
  }
`;

// ========== MOBILE MENU ========== //
export const MobileMenu = styled.ul`
  position: fixed;
  top: 0;
  left: -100%;
  width: 75%;
  max-width: 320px;
  height: 100vh;
  background: white;
  backdrop-filter: blur(8px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 80px 20px;
  transition: left 0.3s ease-in-out;
  box-shadow: 5px 0 10px rgba(0, 0, 0, 0.08);
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
    padding: 10px 0;

    a {
      font-size: 16px;
      font-weight: 600;
      color: #111;
      text-transform: uppercase;

      @media (max-width: 576px) {
        font-size: 15px;
      }
    }

    .divider {
      width: 80%;
      height: 1px;
      background-color: rgba(0, 0, 0, 0.2);
      margin: 10px auto;
    }
  }
`;

// ========== HAMBURGER ========== //
export const HamburgerMenu = styled.div`
  display: none;
  cursor: pointer;
  flex-direction: column;
  gap: 6px;
  justify-content: center;
  align-items: center;

  div {
    width: 24px;
    height: 2px;
    background-color: black;
    transition: 0.3s;
    border-radius: 3px;
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

// ========== AUTH BUTTONS ========== //
export const ActionsContainer = styled.div`
  display: flex;
  gap: 12px;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const StyledSignIn = styled.a`
  background-color: transparent;
  border: 2px solid #2563eb;
  color: #2563eb;
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.9rem;
  letter-spacing: 0.4px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #2563eb;
    color: #ffffff;
    box-shadow: 0 3px 10px rgba(37, 99, 235, 0.3);
    transform: translateY(-2px);
  }

  @media (max-width: 480px) {
    padding: 6px 14px;
    font-size: 0.85rem;
  }
`;

export const StyledSignUp = styled.a`
  background-color: #2563eb;
  color: #ffffff;
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.9rem;
  letter-spacing: 0.4px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(37, 99, 235, 0.2);

  &:hover {
    background-color: #1e40af;
    color: #ffffff;
    box-shadow: 0 6px 16px rgba(30, 64, 175, 0.35);
    transform: translateY(-2px);
  }

  @media (max-width: 480px) {
    padding: 6px 14px;
    font-size: 0.85rem;
  }
`;
