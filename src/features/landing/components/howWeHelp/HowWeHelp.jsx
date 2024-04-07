import React, { useRef } from 'react'
import "./how-we-help.css"
import SupportArticle from './components/SupportArticle'
import { useLocation } from 'react-router-dom'

const HowWeHelp = () => {
  const howWeHelpRef = useRef()
  const location = useLocation()
  // location.state
  console.log(location.state)
  return (
    <section className="support-section">
      <h2 className="support-title">How We Help</h2>
      <SupportArticle text={"Love"} />
      <SupportArticle text={"Love"} />
      <SupportArticle text={"Love"} />
      <SupportArticle text={"Love"} />
    </section>
  )
}

export default HowWeHelp
