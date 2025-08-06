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
} from "../Styles/NavbarStyles";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

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

        {isAuthenticated ? (
          <>
            <NavItem>
              <Link href="/dashboard" className="flex items-center text-gray-700 hover:text-blue-600 transition-colors">
                <User size={20} className="mr-2" />
                {user?.fullName || 'Dashboard'}
              </Link>
            </NavItem>
            <NavItem>
              <button
                onClick={logout}
                className="flex items-center text-gray-700 hover:text-red-600 transition-colors"
              >
                <LogOut size={20} className="mr-2" />
                Logout
              </button>
            </NavItem>
          </>
        ) : (
          <>
            <NavItem>
              <Link href="/auth/signin" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Sign In
              </Link>
            </NavItem>
            <NavItem>
              <Link href="/auth/signup" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Sign Up
              </Link>
            </NavItem>
          </>
        )}
        <NavItem>
            <ContactButton>
              <img src="/callnow.png" alt="Call Icon" />
              +91 7044432779
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

        {isAuthenticated ? (
          <>
            <NavItem>
              <Link href="/dashboard" className="flex items-center text-gray-700 hover:text-blue-600 transition-colors">
                <User size={20} className="mr-2" />
                {user?.fullName || 'Dashboard'}
              </Link>
            </NavItem>
            <NavItem>
              <button
                onClick={logout}
                className="flex items-center text-gray-700 hover:text-red-600 transition-colors"
              >
                <LogOut size={20} className="mr-2" />
                Logout
              </button>
            </NavItem>
          </>
        ) : (
          <>
            <NavItem>
              <Link href="/auth/signin" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Sign In
              </Link>
            </NavItem>
            <NavItem>
              <Link href="/auth/signup" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Sign Up
              </Link>
            </NavItem>
          </>
        )}
        <NavItem>
          <a href={`tel:${7044432779}`}>
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
