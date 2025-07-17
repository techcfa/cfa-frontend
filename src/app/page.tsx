"use client";

import React from 'react'

import Home from './home/page';
import Services from './services/page';
import About from './about/page';
import WhyChooseUs from './whyus/page';
import Plans from './plans/page';
import WhyCyber from './whyCyber/page';
import HowItWorks from './howitworks/page';
import Faq from './faq/page';
import ContactUs from './contact/page';

const page = () => {
  return (
    <>
      <Home />
     <Services />
      <About />
      <WhyChooseUs />
      <Plans />
      <WhyCyber />
      <HowItWorks />
      <Faq />
      <ContactUs />
    </>
  )
}

export default page