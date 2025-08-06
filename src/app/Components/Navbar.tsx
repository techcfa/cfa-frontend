"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "../contexts/AuthContext";
import { LogOut, User } from "lucide-react";
import {
  Nav,
  LogoContainer,
  NavList,
  NavItem,
  ContactButton,
  HamburgerMenu,
  MobileMenu,
  StyledSignIn,
  StyledSignUp,
  ActionsContainer,
} from "../Styles/NavbarStyles";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  const handleScroll = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      setMenuOpen(false);
    }
  };

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "services", label: "Services" },
    { id: "about", label: "About" },
    { id: "plans", label: "Subscription Plans" },
  ];

  return (
    <Nav>
      {/* Logo */}
      <LogoContainer>
        <Link href="/" passHref>
          <Image
            src="/Logo.png"
            alt="Logo"
            width={130}
            height={60}
            priority
            style={{ cursor: "pointer" }}
          />
        </Link>
      </LogoContainer>

      {/* Hamburger Menu */}
      <HamburgerMenu onClick={() => setMenuOpen(!menuOpen)}>
        <div className={menuOpen ? "open" : ""}></div>
        <div className={menuOpen ? "open" : ""}></div>
        <div className={menuOpen ? "open" : ""}></div>
      </HamburgerMenu>

      {/* Desktop Menu */}
      <NavList className="desktop-menu">
        {navLinks.map(({ id, label }) => (
          <NavItem key={id}>
            <Link
              href={`#${id}`}
              onClick={(e) => {
                e.preventDefault();
                handleScroll(id);
              }}
            >
              {label}
            </Link>
          </NavItem>
        ))}

        {isAuthenticated ? (
          <>
            <NavItem>
              <Link
                href="/dashboard"
                className="flex items-center text-gray-700 hover:text-blue-600 transition-colors text-sm"
              >
                <User size={18} className="mr-1" />
                {user?.fullName || "Dashboard"}
              </Link>
            </NavItem>
            <NavItem>
              <button
                onClick={logout}
                className="flex items-center text-gray-700 hover:text-red-600 transition-colors text-sm"
              >
                <LogOut size={18} className="mr-1" />
                Logout
              </button>
            </NavItem>
          </>
        ) : (
          <ActionsContainer>
            <StyledSignIn href="/auth/signin">Sign In</StyledSignIn>
            <StyledSignUp href="/auth/signup">Sign Up</StyledSignUp>
          </ActionsContainer>
        )}

        <NavItem>
          <ContactButton>
            <img src="/callnow.png" alt="Call Icon" />
            +91 7044432779
          </ContactButton>
        </NavItem>
      </NavList>

      {/* Mobile Menu */}
      <MobileMenu className={menuOpen ? "active" : ""}>
        {navLinks.map(({ id, label }) => (
          <NavItem key={id}>
            <Link
              href={`#${id}`}
              onClick={(e) => {
                e.preventDefault();
                handleScroll(id);
              }}
            >
              {label}
            </Link>
          </NavItem>
        ))}

        {isAuthenticated ? (
          <>
            <NavItem>
              <Link
                href="/dashboard"
                className="flex items-center text-gray-700 hover:text-blue-600 transition-colors text-sm"
              >
                <User size={18} className="mr-1" />
                {user?.fullName || "Dashboard"}
              </Link>
            </NavItem>
            <NavItem>
              <button
                onClick={logout}
                className="flex items-center text-gray-700 hover:text-red-600 transition-colors text-sm"
              >
                <LogOut size={18} className="mr-1" />
                Logout
              </button>
            </NavItem>
          </>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              marginTop: "20px",
              width: "100%",
            }}
          >
            <StyledSignIn href="/auth/signin" style={{ textAlign: "center" }}>
              Sign In
            </StyledSignIn>
            <StyledSignUp href="/auth/signup" style={{ textAlign: "center" }}>
              Sign Up
            </StyledSignUp>
          </div>
        )}

        <NavItem>
          <a href="tel:7044432779">
            <ContactButton>
              <img src="/callnow.png" alt="Call Icon" />
              +91 7044432779
            </ContactButton>
          </a>
        </NavItem>
      </MobileMenu>
    </Nav>
  );
};

export default Navbar;
