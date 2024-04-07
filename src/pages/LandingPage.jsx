import React from 'react'
import Header from '../features/landing/components/header/Header'
import { AboutUs, ContactUs, Faqs, Footer, Hero, HowWeHelp } from '../features/landing/index'
import DynamicFormField from '../components/ui/DynamicFormField'

const LandingPage = () => {
  return (
    <main>
      <Header />
      <Hero />
      <HowWeHelp />
      <AboutUs />
      <Faqs />
      <ContactUs />
      <Footer />
    </main>
  )
}

export default LandingPage
