"use client";

import { useState, useRef } from "react";
import {
  Section,
  LeftPanel,
  Title,
  BlueText,
  Subtitle,
  InfoBlock,
  InfoTitle,
  InfoText,
  Illustration,
  Divider,
  RightPanel,
  FormTitle,
  FormSubtitle,
  Form,
  InputGroup,
  Row,
  Input,
  Textarea,
  RadioLabel,
  Label,
  SubmitBtn,
  CustomRadio,
  CustomSelect,
  ErrorText,
  StatusMessage,
} from "./contactStyled";

import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";
import { motion, useInView } from "framer-motion";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    contactAs: "",
    contactType: "",
    message: "",
    preferredMode: "",
    bestTime: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    setStatusMessage(null);
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Valid Email is required";
    if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone)) newErrors.phone = "Valid Phone Number is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.contactAs) newErrors.contactAs = "Please select a contact type";
    if (!formData.contactType) newErrors.contactType = "Please select a contact type";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    if (!formData.preferredMode) newErrors.preferredMode = "Select preferred contact mode";
    if (!formData.bestTime) newErrors.bestTime = "Select best time to reach you";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const response = await fetch("https://api.cyberfraudprotection.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatusMessage("Thank you! Your message has been successfully submitted.");
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          city: "",
          contactAs: "",
          contactType: "",
          message: "",
          preferredMode: "",
          bestTime: "",
        });
      } else {
        const data = await response.json();
        setStatusMessage(data.message || "Something went wrong. Please try again later.");
      }
    } catch (error) {
      setStatusMessage("Network error. Please try again later.");
    }
  };

  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const leftInView = useInView(leftRef, { once: true, margin: "-100px" });
  const rightInView = useInView(rightRef, { once: true, margin: "-100px" });

  return (
    <Section id="contact">
      <motion.div
        ref={leftRef}
        initial={{ x: -100, opacity: 0 }}
        animate={leftInView ? { x: 0, opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <LeftPanel>
          <Title>
            Contact <BlueText>Us</BlueText>
          </Title>
          <Subtitle>Ready to protect yourself and your loved ones from cyber fraud?</Subtitle>

          <InfoBlock>
            <InfoTitle><MdEmail /> Email:</InfoTitle>
            <InfoText as='a' href="mailto:support@cyberfraudprotection.com">support@cyberfraudprotection.com</InfoText>
          </InfoBlock>

          <InfoBlock>
            <InfoTitle><MdLocationOn /> Office Address:</InfoTitle>
            <InfoText>No. 21, 7th Cross, C T Bed Road, Banashankari 2nd Stage, Bangalore 560070</InfoText>
          </InfoBlock>

          <InfoBlock>
            <InfoTitle><MdPhone /> Phone:</InfoTitle>
            <InfoText>
              <BlueText as="a" href="tel:+917044432779" style={{ fontWeight: "bold", textDecoration: "none" }}>
                7044432779
              </BlueText>
              <br />
              <small>
                Available Tuesday–Sunday, 10 AM–7 PM <br />
                (Monday: Weekly Off) <br /> ➾ Save this number so you never miss our call back!
              </small>
            </InfoText>
          </InfoBlock>

          <Illustration>
            <img src="/contactImg.png" alt="Submit Illustration" />
          </Illustration>
        </LeftPanel>
      </motion.div>

      <Divider />

      <motion.div
        ref={rightRef}
        initial={{ x: 100, opacity: 0 }}
        animate={rightInView ? { x: 0, opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <RightPanel>
          <FormTitle>Get In Touch</FormTitle>
          <FormSubtitle>We're here to help! Please fill out the form below and our team will get back to you promptly.</FormSubtitle>

          {statusMessage && <StatusMessage>{statusMessage}</StatusMessage>}

          <Form onSubmit={handleSubmit}>
            <InputGroup>
              <Label htmlFor="fullName">Full Name *</Label>
              <Input id="fullName" type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Your full name" />
              {errors.fullName && <ErrorText>{errors.fullName}</ErrorText>}
            </InputGroup>

            <InputGroup>
              <Label htmlFor="email">Email ID *</Label>
              <Input id="email" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Your email id" />
              {errors.email && <ErrorText>{errors.email}</ErrorText>}
            </InputGroup>

            <Row>
              <InputGroup>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input id="phone" type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" />
                {errors.phone && <ErrorText>{errors.phone}</ErrorText>}
              </InputGroup>

              <InputGroup>
                <Label htmlFor="city">City *</Label>
                <Input id="city" type="text" name="city" value={formData.city} onChange={handleChange} placeholder="Your City" />
                {errors.city && <ErrorText>{errors.city}</ErrorText>}
              </InputGroup>
            </Row>

            <Label>Are you contacting us as an:</Label>
            <Row>
              {["Individual", "Family/Group", "Corporate/Business"].map((type) => (
                <RadioLabel key={type}>
                  <CustomRadio type="radio" name="contactAs" value={type} checked={formData.contactAs === type} onChange={handleChange} />
                  {type}
                </RadioLabel>
              ))}
            </Row>
            {errors.contactAs && <ErrorText>{errors.contactAs}</ErrorText>}

            <Label htmlFor="contactType">How can we help you?</Label>
            <CustomSelect id="contactType" name="contactType" value={formData.contactType} onChange={handleChange}>
              <option value="">Select Type</option>
              <option value="Query">General Inquiry</option>
              <option value="Support">Subscription Information</option>
              <option value="Feedback">Report a Cyber Fraud Incident</option>
              <option value="Deepfake">Deepfake/AI Scam Support (Bangalore/Delhi NCR only)</option>
              <option value="Insurance">Insurance Assistance</option>
              <option value="Other">Other</option>
            </CustomSelect>
            {errors.contactType && <ErrorText>{errors.contactType}</ErrorText>}

            <InputGroup>
              <Label htmlFor="message">Message *</Label>
              <Textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="Write a message!" />
              {errors.message && <ErrorText>{errors.message}</ErrorText>}
            </InputGroup>

            <Label>Preferred Mode of Contact</Label>
            <Row>
              {["Email", "Phone", "WhatsApp"].map((mode) => (
                <RadioLabel key={mode}>
                  <CustomRadio type="radio" name="preferredMode" value={mode} checked={formData.preferredMode === mode} onChange={handleChange} />
                  {mode}
                </RadioLabel>
              ))}
            </Row>
            {errors.preferredMode && <ErrorText>{errors.preferredMode}</ErrorText>}

            <Label htmlFor="bestTime">Best Time to Reach You</Label>
            <CustomSelect id="bestTime" name="bestTime" value={formData.bestTime} onChange={handleChange}>
              <option value="">Select Best Time</option>
              <option value="Morning">Morning</option>
              <option value="Afternoon">Afternoon</option>
              <option value="Evening">Evening</option>
              <option value="Anytime">Anytime</option>
            </CustomSelect>
            {errors.bestTime && <ErrorText>{errors.bestTime}</ErrorText>}

            <SubmitBtn type="submit">Submit</SubmitBtn>
          </Form>
        </RightPanel>
      </motion.div>
    </Section>
  );
};

export default ContactUs;
