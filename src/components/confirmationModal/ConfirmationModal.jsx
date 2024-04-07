import React from 'react'
import "./confirmation-modal.css"
import Button from '../ui/Button'

const ConfirmationModal = ({heading, text, onConfirm, onCancel, ariaLabel }) => {
  return (
    <aside className="confirmation-modal" aria-labelledby="confirmation-modal-title" aria-modal="true"> 
      <div className="confirmation-modal-wrapper">
        <Button
            text={
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="20" height="20">
                    <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"/>
                </svg>
            }
            className={"close-confirmation-modal"}
            handleEvent={onCancel}
            ariaLabel="Click to close modal"
        />
          
        <h3 className="confirmation-modal-title" id="confirmation-modal-title">{heading}</h3>

        {text && <p className="confirmation-modal-text">{text}</p>}

        <div className="confirmation-modal-btn-container">
          <Button
              className={"confirmation-modal-confirm-btn"}
              text={"Yes"}
              handleEvent={onConfirm}
              keyDownEvent={onConfirm}
              ariaLabel={ariaLabel}
          />

          <Button
              className={"confirmation-modal-cancel-btn"}
              text={"No"}
              handleEvent={onCancel}
              ariaLabel="Click to close modal" 
          />
        </div>
      </div>
    </aside>
  )
}

export default ConfirmationModal