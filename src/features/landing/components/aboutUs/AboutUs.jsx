import React from 'react'
import "./about-us.css"
import AboutArticle from './components/AboutArticle'

const AboutUs = () => {
  const aboutArticles = [
    {
      title: 'Our Mission',
      content:
        'At Ventmoir, our mission is simple yet profound: to foster mental well-being through understanding, empathy, and connection. We believe that no one should face their mental health journey alone. Our platform is dedicated to providing a haven where individuals can find support, solace, and a path to healing.',
    },
    {
      title: 'Our Story',
      content:
        'Ventmoir was born out of a deep desire to make a positive impact on the mental health landscape. Our journey began with a vision to create a safe and judgment-free space where people could freely share their thoughts and emotions. It was this vision that led to the birth of our platform.',
    },
    {
      title: 'Our Commitment to Privacy',
      content:
        'Your privacy is paramount to us. We have stringent measures in place to safeguard your data and ensure your confidentiality at every step of your journey with us.',
    },
    {
      title: 'Our Future Goals',
      content:
        'As we look ahead, we envision a future where Ventmoir continues to be a beacon of hope and healing in the mental health space. We\'re committed to enhancing our platform, forging partnerships, and expanding our support network to serve you better.',
    },
  ];

  return (
    <section className="article-section">
        <div className="article-wrapper">
            <h2 className="about-head">About Us</h2>
            {aboutArticles.map((article) => (
              <AboutArticle key={article.title} title={article.title} content={article.content} />
            ))}
        </div>
    </section>
  )
}

export default AboutUs
