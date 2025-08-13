"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { subscriptionService, type SubscriptionPlan } from "../services/subscriptionService";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/navigation";

const Section = styled.section`
  padding: 40px 150px;
  background: #f9f9f9;
  background-image: url("/CBG.png");
  background-size: cover;
  background-position: center;
  

  @media (max-width: 1024px) {
    padding: 30px 15px;
  }

  @media (max-width: 768px) {
    padding: 25px 10px;
  }
`;

const Heading = styled.h2`
  font-size: 2.2rem;
  font-weight: bold;
  color: #000;
  text-align: left;
  margin-bottom: 10px;

  span {
    color: #0073D7;
  }

  @media (max-width: 1024px) {
    font-size: 2rem;
  }

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const Subheading = styled.p`
  margin-bottom: 30px;
  font-size: 1rem;
  color: #555;
`;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
  transition: transform 0.3s ease-in-out;
  min-height: 350px;

  &:hover {
    transform: translateY(-5px);
  }
`;

const Icon = styled.img`
  width: 50px;
  height: 50px;
`;

const Title = styled.h3`
  font-size: 1.3rem;
  color: #121212;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const PriceTable = styled.div`
  border-top: 1px solid #ddd;
  margin-top: 10px;
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
  color: #333;
`;

const Note = styled.div`
  margin-top: auto;
  font-size: 0.9rem;
  text-align: center;
  color: #333;
  border-top: 1px solid #eee;
  padding-top: 8px;
`;

const CorporateNote = styled.div`
  margin-top: 10px;
  font-size: 0.9rem;
  text-align: center;
  color: #000;
  font-weight: 600;

  small {
    display: block;
    font-weight: normal;
    color: #555;
  }

  .star {
    color: #000 !important; 
    font-style: normal;
    font-weight: bold;
  }
`;

export default function Plans() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const run = async () => {
      try { setLoading(true); setError(""); const data = await subscriptionService.getPlans(); setPlans(data.filter(p=>p.isActive!==false)); }
      catch (e: any) { setError(e.response?.data?.message || "Failed to load plans"); }
      finally { setLoading(false); }
    };
    run();
  }, []);

  const handleSelect = async (plan: SubscriptionPlan) => {
    if (!isAuthenticated) {
      router.push("/auth/signin");
      return;
    }
    localStorage.setItem("cfa_selected_plan", JSON.stringify(plan));
    router.push("/subscription/checkout");
  };

  return (
    <Section id="plans">
      <Heading>
        Subscription <span>Plans</span>
      </Heading>
      <Subheading>Simple, Transparent Pricing — No Hidden Charges</Subheading>

      {error && <div style={{color:'#b91c1c', marginBottom: '1rem'}}>{error}</div>}
      {loading && <div>Loading plans…</div>}
      <CardsContainer>
        {plans.map((p, idx) => (
          <motion.div key={p._id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: idx * 0.1 }}
          >
            <Card>
              <Icon src="/services/card1.png" alt={p.planName} />
              <Title>{p.planName}</Title>
              <div style={{color:'#555'}}>{p.description}</div>
              <PriceTable>
                <PriceRow>
                  <span>Price</span>
                  <span>₹{p.specialPrice ?? p.price}</span>
                </PriceRow>
                <PriceRow>
                  <span>Duration</span>
                  <span>{p.duration} months</span>
                </PriceRow>
                <PriceRow>
                  <span>Max Members</span>
                  <span>{p.maxMembers}</span>
                </PriceRow>
              </PriceTable>
              <Note>
                <button onClick={()=>handleSelect(p)} style={{background:'#2563eb',color:'#fff',padding:'0.6rem 1rem',borderRadius:'0.75rem',border:'none',fontWeight:700}}>Choose Plan</button>
              </Note>
            </Card>
          </motion.div>
        ))}
      </CardsContainer>
    </Section>
  );
}
