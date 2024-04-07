import React from 'react'

const AboutArticle = ({title, content}) => {
  return (
    <article className="about-article">
      <h3>{title}</h3>

      <p>
        {content}
      </p>
    </article>
  )
}

export default AboutArticle
