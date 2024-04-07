import React from 'react'
import "./loader.css"

const Loader = ({text, isSmallLoader}) => {

  const renderLoader = () => {
    return <svg aria-hidden="true"  xmlns="http://www.w3.org/2000/svg" width="164" height="159" viewBox="0 0 164 159" fill="none">
      <ellipse cx="84" cy="15" rx="16" ry="15" fill="#407BFF"/>
      <ellipse cx="84" cy="144" rx="16" ry="15" fill="#407BFF"/>
      <ellipse cx="149" cy="82.5" rx="15" ry="15.5" fill="#407BFF"/>
      <ellipse cx="130.5" cy="126" rx="15.5" ry="15" fill="#407BFF"/>
      <ellipse cx="15" cy="82.5" rx="15" ry="15.5" fill="#407BFF"/>
      <circle cx="35" cy="35" r="15" fill="#407BFF"/>
      <ellipse cx="35" cy="126" rx="16" ry="15" fill="#407BFF"/>
  </svg>
  }

  if(isSmallLoader){
    return (
      <div className="loader-container" role="status" aria-live="polite">
        <div className="small-loader-spinner">
        {renderLoader()}
        <p role="status">{text}
          <span aria-hidden="true" style={{"--dot": "1"}}>.</span>
          <span aria-hidden="true" style={{"--dot": "2"}}>.</span>
          <span aria-hidden="true" style={{"--dot": "3"}}>.</span>
        </p>
        </div>
      </div>
    )
  }

  return (
    <div className="loader-container" role="status" aria-live="polite">
      <div className="loader-spinner">
      {renderLoader()}
      <p role="status">{text}
        <span aria-hidden="true" style={{"--dot": "1"}}>.</span>
        <span aria-hidden="true" style={{"--dot": "2"}}>.</span>
        <span aria-hidden="true" style={{"--dot": "3"}}>.</span>
      </p>
      </div>
    </div>
  )
}

export default Loader
