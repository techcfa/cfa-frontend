"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Nav,
  LogoContainer,
  NavList,
  NavItem,
  ContactButton,
  HamburgerMenu,
  MobileMenu,
} from "../Styles/NavbarStyles";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleScroll = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      setMenuOpen(false); // Close mobile menu after clicking a link
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
      <LogoContainer>
        <Link href="/" passHref>
          <Image
            src="/Logo.png"
            alt="Logo"
            width={160}
            height={80}
            priority
            style={{ cursor: "pointer" }}
          />
        </Link>
      </LogoContainer>

      {/* Hamburger Icon */}
      <HamburgerMenu onClick={() => setMenuOpen(!menuOpen)}>
        <div className={menuOpen ? "open" : ""}></div>
        <div className={menuOpen ? "open" : ""}></div>
        <div className={menuOpen ? "open" : ""}></div>
      </HamburgerMenu>

      {/* Desktop Navigation */}
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

        <NavItem>
            <ContactButton>
              <img src="/callnow.png" alt="Call Icon" />
              Call Now
            </ContactButton>
        </NavItem>
      </NavList>

      {/* Mobile Navigation */}
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

        <NavItem>
          <a href={`tel:${7044432779}`}>
            <ContactButton>
              <img src="/callnow.png" alt="Call Icon" />
              Call Now
            </ContactButton>
          </a>
        </NavItem>
      </MobileMenu>
    </Nav>
  );
};

export default Navbar;
