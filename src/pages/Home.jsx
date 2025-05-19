import React from "react";
import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";
import StatsSection from "../components/StatsSection";
import ServicesSection from "../components/ServicesSection";
import EducationSection from "../components/EducationSection";
import VisionSection from "../components/VisionSection";
import TestimonialsSection from "../components/TestimonialsSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import LoginForm from "../components/LoginSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <EducationSection />
      <VisionSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </>
  );
}
