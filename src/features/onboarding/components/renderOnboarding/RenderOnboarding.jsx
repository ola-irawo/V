import React, { useState } from 'react'
import JoinSociety from './components/joinSociety/JoinSociety'
import ProfileSetup from './components/profileSetup/ProfileSetup';
import Confidante from './components/confidante/Confidante';
import Button from '../../../../components/ui/Button';
import { Navigate } from 'react-router-dom';
import "./render-onboarding.css"
import n from "../../assets/support-hand.png"

const RenderOnboarding = () => {
    const [onboardingStep, setOnboardingStep] = useState(1);

    const handleNextStep = () => {
        setOnboardingStep(prevStep => prevStep + 1);
    };

    const renderStep = () => {
      if (onboardingStep > 2) {
        return <Navigate to="/" replace="true" />;
      }

      switch (onboardingStep) {
        case 1:
          return <JoinSociety handleNextStep={handleNextStep} />;
        case 2:
          return <ProfileSetup />;
        case 3:
          // This should show success or ready to get started.
          return <Confidante handleNextStep={handleNextStep} onboardingStep={onboardingStep} />;
        default:
          return "";
      }
    };
    
  return (
    <section className="onboarding-section" style={{backgroundImage: `url(${n})`}}>
      
      <div className="onboarding-wrapper">

        <div className="onboarding-steps-container">
          <div className="onboarding-steps">
            <li className={onboardingStep === 1 && "current-step"}>1</li>
            <li className={onboardingStep === 2 && "current-step"}>2</li>
            <li className={onboardingStep === 3 && "current-step"}>3</li>
          </div>

          <Button text={"Skip"} className={"onboarding-btn"} handleEvent={handleNextStep}/>
        </div>
        {renderStep()}

        {/* {
          onboardingStep < 3 && <div className="next-onboarding-step">
              <Button text={"Continue"} handleEvent={handleNextStep} />
          </div>
        } */}
    </div>
    </section>
  )
}

export default RenderOnboarding
