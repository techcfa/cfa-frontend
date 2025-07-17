"use client";

import Image from "next/image";
import { useEffect } from "react";
import {
  ServicesSection,
  TitleContainer,
  Title,
  Highlight,
  CardContainer,
  Card,
  CardContent,
  BGImage
} from "./ServicesStyles";

const Services = () => {
  useEffect(() => {
    const cards = document.querySelectorAll(".card");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("visible");
            }, index * 100);
          }
        });
      },
      { threshold: 0.2 }
    );

    cards.forEach((card) => observer.observe(card));

    return () => {
      cards.forEach((card) => observer.unobserve(card));
    };
  }, []);

  const cards = [
    {
      image: "/services/card1.png",
      title: "Awareness Video",
      description:
        "Watch our exclusive, easy-to-understand video explaining the most common and dangerous cyber frauds in India today. Empower yourself and your loved ones to recognize and avoid scams."
    },
    {
      image: "/services/card2.png",
      title: "Fraud Alerts & Research",
      description:
        "Receive regular updates and alerts about new and emerging cyber threats, tailored for Indian users. Stay one step ahead with our expert research team monitoring the latest trends."
    },
    {
      image: "/services/card3.png",
      title: "Cyber Insurance Policy Advisory",
      description:
        "We help you choose the right cyber insurance policy—evaluating options, clarifying coverage, and ensuring you’re protected. You pay premiums directly to the insurer. We never accept commissions or any kind of fee from Insurance Policy provider, so our advice is always in your best interest."
    },
    {
      image: "/services/card4.png",
      title: "24/7 Helpline Support",
      description:
        "24/7 Helpline for immediate assistance during threatening calls or fraud attempts. Call us anytime, day or night. Facing a digital arrest scam or urgent cyber threat? Add us to your call or video conference—we’ll take over, guide you, and speak to fraudster on your behalf"
    },
    {
      image: "/services/card5.png",
      title: "Victim Support & Recovery",
description:
  "If you are a victim of cyber fraud , we guide you through filing complaints maximising recovery chances, assist with every step of your insurance claim, and if insurer rejects your claim we will file and fight a case before consumer court at no extra cost—all included in your subscription."
    },
    {
      image: "/services/card6.png",
      title: "AI Scam Assistance (Deepfake/Voice Clone)",
      description:
        "Available in Bangalore and Delhi NCR, we offer expert help for AI-generated scams—guiding you through evidence preservation, police complaints, and legal action, with full support for both individuals and organizations."
    }
  ];

  return (
    <ServicesSection id="services">
      <BGImage />
      <TitleContainer>
        <Title>
          Our <Highlight>Services</Highlight>
        </Title>
        <p>Cyber Fraud Protection — What You Get</p>
      </TitleContainer>
      <CardContainer>
        {cards.map((card, index) => (
          <Card key={index} className="card">
            <div style={{ width: "100%", height: "auto" }}>
              <Image
                src={card.image}
                alt={card.title ?? ""}
                width={300}
                height={200}
                layout="responsive"
              />
            </div>
            <CardContent>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </CardContent>
          </Card>
        ))}
      </CardContainer>
    </ServicesSection>
  );
};

export default Services;
