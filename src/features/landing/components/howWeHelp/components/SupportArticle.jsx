import React from 'react'
import supportImage from "./supportImage.png"

const SupportArticle = ({img, text, className, images}) => {
  return (
    <article className="support-article">
        <div className="icons-container">
            {images?.map(img => img)}
        </div>

        <div className="support-container">
            <div className="support-img-container">
                <img src={supportImage} className="support-image" alt="support" />
            </div>

            <div className="text-container">
                <h3>Supportive Societies</h3>

                <p>
                    Explore a range of societies tailored to various mental health topics and connect with others who share similar experiences and struggles.
                    Connect with Confidantes who offer a listening ear and understanding.                </p>
            </div>
        </div>
      
    </article>
  )
}

export default SupportArticle
