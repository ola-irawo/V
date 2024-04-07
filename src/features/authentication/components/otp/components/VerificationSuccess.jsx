import React, { useEffect, useRef } from 'react'
import "./verification-success.css"
import success from "../assets/svgs/success.svg"
import Button from '../../../../../components/ui/Button'
import { useNavigate } from 'react-router-dom'

const VerificationSuccess = () => {
    const navigate = useNavigate()
    const buttonRef = useRef()

    useEffect(() => {
        buttonRef.current.focus()
    }, [])
    
  return (
    <aside className="success-aside" role="status" aria-live="polite">
        <div className="success-wrapper">

            <div className="success-img-container">
                <img src={success} alt="Success-verification" />
            </div>

            <div className="success-content-container">
                <h2>Verification Successful</h2>
                <p>Congratulations! Your account has been verified successfully.</p>
            </div>

            <div className="success-btn-container">
                <Button 
                    ref={buttonRef}
                    text={"Continue"}
                    ariaLabel="Continue to login page"
                    handleEvent={() => navigate("/login", { replace: true })}
                    keyDownEvent={(e) => {
                        if(e.key === "Enter" || " "){
                            navigate("/login", { replace: true })
                        }
                    }}
                />
            </div>
      </div>
    </aside>
  )
}

export default VerificationSuccess
