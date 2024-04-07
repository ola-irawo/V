import React, { useState } from 'react'
import "./toggle-switch.css"

const ToggleSwitch = ({name, value, onClick}) => {
  return (
    <label 
      className="toggle-switch"
      htmlFor="switch"
      onClick={onClick}
      style={{
        backgroundColor: value && "var(--light-blue)"
      }}
    >
      <input
        name={name}
        value={value}
        id="switch" 
        type="checkbox"
        className={"activity-list"}
      />
      <div className="toggle-activity-ball"
        style={{
          transform: value ? "translateX(100%)" : "none",
          backgroundColor: value && "#fff",
          color: value && "#000"
        }}
      >
        {value ? "on" : "off"}
      </div>
    </label>
  )
}

export default ToggleSwitch
