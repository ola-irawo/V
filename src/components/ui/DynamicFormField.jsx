import React, { forwardRef, useState } from 'react'
import ErrorNotificationMessage from './errorNotification/ErrorNotificationMessage';

const DynamicFormField = forwardRef ((
    {
        label, 
        name, 
        onChange, 
        value, 
        type,
        className,
        required,
        placeholder,
        style,
        error
    }, 
        ref
    ) => {
        
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const renderFormField = () => {
        switch(type){
            case "text":
                return (
                    <input 
                        type={type} 
                        name={name} 
                        value={value}
                        id={label}
                        className={className}
                        required={required}
                        placeholder={placeholder} 
                        onChange={onChange} 
                    />
                )
            case "date":
                return(
                    <input 
                        type={type} 
                        name={name} 
                        value={value}
                        id={label}
                        className={className}
                        required={required}
                        placeholder={placeholder} 
                        onChange={onChange} 
                    />
                )
            case "checkbox":
                return (
                    <input
                        type={"checkbox"} 
                        name={name} 
                        value={value}
                        id={label}
                        ref={ref}
                        className={className}
                        required={required}
                        onChange={onChange}
                    />
                )
            case "radio":
                return (
                    <input
                        type={"radio"} 
                        name={name} 
                        value={value}
                        id={label}
                        ref={ref}
                        className={className}
                        required={required}
                        onChange={onChange}
                    />
                )
            case "textarea":
                return (
                    <textarea
                        name={name}
                        value={value}
                        id={label}
                        className={className}
                        required={required}
                        placeholder={placeholder} 
                        onChange={onChange}
                        ref={ref}
                        style={style}
                    />
                )
            case "number":
                return (
                    <input
                        type="number"
                        name={name}
                        value={value}
                        id={label}
                        placeholder={placeholder}
                        onChange={onChange}
                        maxLength={1}
                        required={required}
                    />
                )
            case "email":
                return (
                    <input
                        type="email"
                        name={name}
                        value={value}
                        id={label}
                        placeholder={placeholder}
                        onChange={onChange}
                        required={required}
                    />
                )
            case "password":
                return (
                    <div className="password">
                        <input
                            type={showPassword ? "text" : "password"}
                            name={name}
                            value={value}
                            id={label}
                            placeholder={placeholder}
                            onChange={onChange}
                            required={required}
                            autoComplete="new-password"
                        />
                        <button type="button" onClick={togglePasswordVisibility}>
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>
                )
            case "tel":
                return (
                    <input
                        type="tel"
                        name={name}
                        value={value}
                        id={label}
                        placeholder={placeholder}
                        onChange={onChange}
                        required={required}
                        maxLength={1}
                    />
                )
            case "file":
                return (
                    <input
                        type="file"
                        name={name}
                        id={label}
                        className={className}
                        onChange={onChange}
                    />
                );
            default:
                return (
                    <input 
                        type="text" 
                        name={name} 
                        value={value} 
                        id={label}
                        placeholder={placeholder} 
                        onChange={onChange} 
                        required={required} 
                    />
                )
        }
    }

  return (
    <div className={className}>
        {label && <label htmlFor={label}>{label}</label>}
        {renderFormField()}
        {error && <ErrorNotificationMessage errorMessage={error} />}
    </div>
  )
})

export default DynamicFormField
