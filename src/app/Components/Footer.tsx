"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FooterContainer,
  LeftSection,
  SocialIcons,
  MiddleSection,
  RightSection,
  FooterBottom,
  FooterLogo,
} from "../Styles/FooterStyles";

export default function Footer() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <FooterContainer>
        {/* Left Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <LeftSection>
            <Link href="/" passHref>
              <FooterLogo src="FLogo.png" alt="Logo" />
            </Link>
            <h3>Cyber Fraud Protection Across India</h3> <br />
            <p>
              Led by Advocate Vipin Choudhary Transparent. Ethical. Always on your side.
            </p>
            <SocialIcons>
              <a href="https://www.linkedin.com/company/">
                <img src="Linkedin.png" alt="LinkedIn" />
              </a>
            </SocialIcons>
          </LeftSection>
        </motion.div>

        {/* Middle Section - Quick Links */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <MiddleSection>
            <p>Quick Links</p>
            <a href="#">Home</a>
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#plans">Subscription Plans</a>
            <a href="#contact">Contact</a>
          </MiddleSection>
        </motion.div>

        {/* Middle Section - Policies */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <MiddleSection>
            <p>Policies</p>
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/terms-and-conditions">Terms and Conditions</a>
            <a href="/disclaimer">Disclaimer</a>
          </MiddleSection>
        </motion.div>

        {/* Right Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <RightSection>
            <p>Address</p>
            <a>no. 21, 7th Cross, C T Bed Road, Banashankari 2nd Stage, Bangalore 560070</a>

            <p>Call</p>
            <a href="tel:+917044432779">7044432779</a>

            <p>Email</p>
            <a href="mailto:support@cyberfraudprotection.com">support@cyberfraudprotection.com</a>
          </RightSection>
        </motion.div>

        {/* Footer Bottom */}
        <FooterBottom>
          © 2025 Cyber Fraud Protection. All rights reserved.
        </FooterBottom>
      </FooterContainer>
    </motion.div>
  );
}
