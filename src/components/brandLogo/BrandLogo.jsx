import React from 'react'
import "./brand-logo.css"
import brandLogo from "../../assets/svgs/brandLogo.svg"

const BrandLogo = () => {
  return (
    <div className="brand1-container">
      <img src={brandLogo} alt="brand logo" />
    </div>
  )
}

export default BrandLogo
