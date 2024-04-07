import React, { useEffect, useRef } from 'react'
import "./hero.css"
import { NavLink, plant, supportFrame, useWindowWidth } from '../../index'

const Hero = () => {
  const {screenWidth} = useWindowWidth()
  const isMobile = screenWidth <=768
  const text = "...bridging the gap between social media and mental health."

  return (
    <section className="hero-section">
      <article className="hero-article">
        <h1 className="hero-head">
          <img src={plant} className="plant-icon" alt="plant-icon" />
          You are not alone, your story matters here-<span>support is just a click away.</span>
        </h1>

        <div className="hero-content">
          <p>
            Embark on a journey of shared stories, compassionate listening, and uplifting connections, where your struggles are understood, your voice matters, and you will not be judged-because you're never alone.
          </p>
        </div>

        <div className="link-container">
          <NavLink to={"/register"} className="hero-link">{isMobile ? "Join Us" : "Get started"} </NavLink>
        </div>

        <img src={supportFrame} className="hero-image" alt="support-frame" />

        <p className="hero-fade-in-text">
          {text.split("").map((char, index) => (
            <span key={index} style={{ "--index": index }}>
              {char === " " ? '\u00A0' : char}
            </span>
          ))}
        </p>
      </article>
    </section>
  )
}

export default Hero
