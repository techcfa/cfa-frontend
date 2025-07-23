"use client";

import { useState, useRef } from "react";
import axios from "axios"; // Import Axios
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
  Error,
  SubmitBtn,
  CustomRadio,
  CustomSelect,
} from "./contactStyled";

import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";

import { motion, useInView } from "framer-motion";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    city: "",
    contactAs: "",
    helpType: "",
    message: "",
    preferredContact: "",
    bestTime: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submissionMessage, setSubmissionMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Valid Email is required";
    if (!formData.phoneNumber.trim() || !/^\d{10}$/.test(formData.phoneNumber)) newErrors.phoneNumber = "Valid Phone Number is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.contactAs) newErrors.contactAs = "Please select a contact type";
    if (!formData.helpType) newErrors.helpType = "Please select a help type";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    if (!formData.preferredContact) newErrors.preferredContact = "Select preferred contact mode";
    if (!formData.bestTime) newErrors.bestTime = "Select best time to reach you";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionMessage(null); // Clear previous messages
    setIsSuccess(false); // Reset success status

    if (validate()) {
      try {
        // Using Axios for the POST request
        const response = await axios.post("https://api.cyberfraudprotection.com/submit-form", formData, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status >= 200 && response.status < 300) { // Check for successful HTTP status codes
          console.log("Form submitted successfully:", response.data);
          setSubmissionMessage("Form submitted successfully!");
          setIsSuccess(true);
          // Optionally reset form after successful submission
          setFormData({
            fullName: "",
            email: "",
            phoneNumber: "",
            city: "",
            contactAs: "",
            helpType: "",
            message: "",
            preferredContact: "",
            bestTime: "",
          });
          setErrors({}); // Clear errors on successful submission
        } else {
          // This block might not be reached with Axios for non-2xx responses if it throws an error
          // Axios typically throws an error for non-2xx status codes, which will be caught below
          console.error("Form submission failed with status:", response.status, response.data);
          setSubmissionMessage(`Submission failed: ${response.data?.message || response.statusText || 'Unknown error'}`);
          setIsSuccess(false);
        }
      } catch (error: any) { // Type 'any' for error to handle AxiosError
        if (axios.isAxiosError(error)) {
          // Axios-specific error handling
          console.error("Axios error submitting form:", error.response?.data || error.message);
          setSubmissionMessage(`Submission failed: ${error.response?.data?.message || error.message}`);
        } else {
          // General error handling
          console.error("Error submitting form:", error);
          setSubmissionMessage("An unexpected error occurred. Please try again.");
        }
        setIsSuccess(false);
      }
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
            <InfoText as='a' href="mailto: support@cyberfraudprotection.com" >support@cyberfraudprotection.com</InfoText>
          </InfoBlock>

          <InfoBlock>
            <InfoTitle><MdLocationOn /> Office Address:</InfoTitle>
            <InfoText>no. 21, 7th Cross, C T Bed Road, Banashankari 2nd Stage, Bangalore 560070</InfoText>
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
          <FormSubtitle>
            We're here to help! Please fill out the form below and our team will get back to you promptly.
          </FormSubtitle>

          <Form onSubmit={handleSubmit}>
            <InputGroup>
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Your full name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />
              {errors.fullName && <Error>{errors.fullName}</Error>}
            </InputGroup>

            <InputGroup>
              <Label htmlFor="email">Email ID *</Label>
              <Input
                id="email"
                type="email"
                placeholder="Your email id"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <Error>{errors.email}</Error>}
            </InputGroup>

            <Row>
              <InputGroup>
                <Label htmlFor="phoneNumber">Phone Number *</Label>
                <Input
                  id="phoneNumber"
                  type="text"
                  placeholder="Phone Number"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
                {errors.phoneNumber && <Error>{errors.phoneNumber}</Error>}
              </InputGroup>

              <InputGroup>
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  type="text"
                  placeholder="Your City"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />
                {errors.city && <Error>{errors.city}</Error>}
              </InputGroup>
            </Row>

            <Label>Are you contacting us as an:</Label>
            <Row>
              {["Individual", "Family/Group", "Corporate/Business"].map((type) => (
                <RadioLabel key={type}>
                  <CustomRadio
                    type="radio"
                    name="contactAs"
                    value={type}
                    onChange={handleChange}
                  />
                  {type}
                </RadioLabel>
              ))}
            </Row>
            {errors.contactAs && <Error>{errors.contactAs}</Error>}

            <Label htmlFor="helpType">How can we help you?</Label>
            <CustomSelect
              id="helpType"
              name="helpType"
              value={formData.helpType}
              onChange={handleChange}
            >
              <option value="">Select Type</option>
              <option value="Query">General Inquiry</option>
              <option value="Support">Subscription Information</option>
              <option value="Feedback">Report a Cyber Fraud Incident</option>
              <option value="Deepfake">Deepfake/AI Scam Support (Bangalore/Delhi NCR only)</option>
              <option value="Insurance">Insurance Assistance</option>
              <option value="Other">Other</option>
            </CustomSelect>
            {errors.helpType && <Error>{errors.helpType}</Error>}

            <InputGroup>
              <Label htmlFor="message">Message *</Label>
              <Textarea
                id="message"
                placeholder="Write a message!"
                name="message"
                value={formData.message}
                onChange={handleChange}
              />
              {errors.message && <Error>{errors.message}</Error>}
            </InputGroup>

            <Label>Preferred Mode of Contact</Label>
            <Row>
              {["Email", "Phone", "WhatsApp"].map((mode) => (
                <RadioLabel key={mode}>
                  <CustomRadio
                    type="radio"
                    name="preferredContact"
                    value={mode}
                    onChange={handleChange}
                  />
                  {mode}
                </RadioLabel>
              ))}
            </Row>
            {errors.preferredContact && <Error>{errors.preferredContact}</Error>}

            <Label htmlFor="bestTime">Best Time to Reach You</Label>
            <CustomSelect
              id="bestTime"
              name="bestTime"
              value={formData.bestTime}
              onChange={handleChange}
            >
              <option value="">Select Best Time</option>
              <option value="Morning">Morning</option>
              <option value="Afternoon">Afternoon</option>
              <option value="Evening">Evening</option>
              <option value="Anytime">Anytime</option>
            </CustomSelect>
            {errors.bestTime && <Error>{errors.bestTime}</Error>}

            <SubmitBtn type="submit">Submit</SubmitBtn>

            {submissionMessage && (
              <p style={{ color: isSuccess ? 'green' : 'red', marginTop: '10px', textAlign: 'center' }}>
                {submissionMessage}
              </p>
            )}
          </Form>
        </RightPanel>
      </motion.div>
    </Section>
  );
};

export default ContactUs;
