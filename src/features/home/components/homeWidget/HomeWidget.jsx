import React, { useState } from 'react'
import "./home-widget.css"
import Button from '../../../../components/ui/Button'
import confidanteImage from "./assets/svgs/confidante.svg"
import PostModal from '../../../../components/ui/postModal/PostModal'
import PostButton from '../../../../components/postButton/PostButton'

const HomeWidget = () => {
    const [showPostModal, setShowPostModal] = useState(false)

  return (
    <aside className="home-widget">
        <div className="home-widget-wrapper">
            <PostButton setShowPostModal={setShowPostModal} />
            {showPostModal && <PostModal setShowPostModal={setShowPostModal} />}

            <div className="home-widget-confidante">
                <div className="confidante-widget">
                    <h3>Become a Confidante</h3>
                    <img src={confidanteImage} alt="Confidante" />
                </div>

                <div className="confidante-widget-text">
                    <p>
                        Ventmoir offers free, round-the-clock emotional support through online chat. We're committed to ensuring that no one faces their challenges in isolation. Your presence as a confidant can truly make a meaningful impact.
                    </p>

                    <Button text={"Get Started"} />

                </div>

            </div>

            <div className="home-widget-btn-container">
                <Button text={"+ See more societies"} />
                <Button text={"Chat with a Confidante"} />
            </div>
        </div>
    </aside>
  )
}

export default HomeWidget
