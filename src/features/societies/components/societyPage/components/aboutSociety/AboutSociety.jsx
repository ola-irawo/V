import React from 'react'
import "./about-society.css"
import { NavLink } from 'react-router-dom'
import { useWindowWidth } from '../../../../../landing'

const AboutSociety = ({societyName, currentSociety}) => {
  const {screenWidth} = useWindowWidth()
  const isMobile = screenWidth <= 767

  return (
    <section className="society-about">
        {isMobile && <h2>{societyName}</h2>}
        <p className="society-about-welcome-message">
          Welcome to our inclusive marital society, where individuals can seek and provide support, and discuss topics related to marriage, relationships, and personal growth. 
        </p>

        <article className="society-about">
          <h2 className="society-about-header">How can I help?</h2>
          <p className="society-about-text">
            You can help by sharing your thoughts, responding to vents, sharing your story (If you're comfortable) and offering support to others.
            Together, we will build a supportive enviroment where everyone feels heard and valued.
          </p>
        </article>

        <article className="society-about">
          <h2 className="society-resources-header">Useful Resources</h2>
          <ul society-rule-list>
            <li className="society-rule-item">
              <p className="society-about-text">
                <strong>Couples Counseling</strong> : Professional counseling services can provide valuable support and guidance for couples facing challenges in their relationship.
                <NavLink>Read more on couples counseling</NavLink>
              </p>
            </li>
            <li className="society-rule-item">
              <p className="society-about-text">
                <strong>Books on Marriage</strong> : Explore books written by relationship experts that offer insights and strategies for building healthy and fulfilling marriages.
                <NavLink>See a list of recommended books</NavLink>
              </p>
            </li>
            <li className="society-rule-item">
              <p className="society-about-text">
                <strong>Relationship Workshops</strong> : Attend workshops or seminars focused on strengthening communication skills, resolving conflicts, and fostering intimacy in marriage.
                <NavLink>Upcoming relationship workshops</NavLink>
              </p>
            </li>
            <li className="society-rule-item">
              <p className="society-about-text">
                <strong>Online Courses</strong> : Enroll in online courses designed to enhance relationship skills, such as conflict resolution, emotional intelligence, and building trust.
                <NavLink>Link to register</NavLink>
              </p>
            </li>
          </ul>
        </article>
        
        <article className="society-about">
          <h2 className="society-about-header">Speak to a licensed therapist</h2>
          <p className="society-about-text">
            Seeking personalized assistance from a licensed therapist specializing in marriage counseling? 
            <NavLink> Click here to connect with a therapist.</NavLink>
          </p>
        </article>

        <article className="society-about">
          <h2 className="society-about-header">Do you have a question or suggestion?</h2>
          <p className="society-about-text">
            If you need assistance or have a suggestion, feel free to contact us <NavLink>here</NavLink>. We'll respond to you shortly.
          </p>
        </article>
    </section>
  )
}

export default AboutSociety
