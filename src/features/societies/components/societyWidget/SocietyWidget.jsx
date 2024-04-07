import React, { useState } from 'react'
import "./society-widget.css"
import {  useSelector } from 'react-redux'
import {  selectSocietyById } from '../../../../services/societies/reducers/societySlice'
import Button from '../../../../components/ui/Button'
import PostButton from '../../../../components/postButton/PostButton'
import PostModal from '../../../../components/ui/postModal/PostModal'
import { useParams } from 'react-router-dom'

const SocietyWidget = ({id}) => {
  const [showPostModal, setShowPostModal] = useState(false)
  const currentSociety = useSelector(state => selectSocietyById(state, id))
  const {societyId} = useParams()

  return (
    <aside className="society-widget">
      {showPostModal && <PostModal setShowPostModal={setShowPostModal} id={societyId}  />}

      <div className="society-widget-wrapper">
      <PostButton setShowPostModal={setShowPostModal} id={societyId} />

        <div className="society-widget-img">
          <img src={currentSociety?.image_url} alt={`${currentSociety?.societyName}`} />
        </div>

        <div className="society-widget-text">
          <h3>{currentSociety?.societyName}</h3>
          <p>
           {currentSociety?.description}
          </p>
        </div>
      </div>
      
      <div className="society-widget-btn-container">
        {/* <Button text={"Chat with a Confindante"} className={"confidante-button"} /> */}
        <Button text={"Exit Society"} className={"exit-society"} />
      </div>
    </aside>
  )
}

export default SocietyWidget