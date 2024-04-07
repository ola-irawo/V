import React, {forwardRef} from 'react'

const Button = forwardRef(({disabled, className, ariaLabel, type, text, handleEvent, keyDownEvent}, ref) => {
  const handleKeyDown = (e) => {
    if(e.target === "Enter" || e.target === " "){

    }
  }
  return (
   <button 
    onClick={handleEvent}
    onKeyDown={keyDownEvent}
    className={className} 
    type={type}
    aria-label={ariaLabel}
    disabled={disabled}
    ref={ref}
  >
    {text}
   </button>
  )
})

export default Button
