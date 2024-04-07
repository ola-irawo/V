import React from 'react'
import DynamicFormField from './ui/DynamicFormField'
import Button from './ui/Button'
import ErrorNotificationMessage from './ui/errorNotification/ErrorNotificationMessage'

const Form = ({template, className, onSubmit, onChange, onCancel, error}) => {
    const {title, confirmedBtnText, deniedBtnText, fields} = template

    const renderFields = () => {
        return fields?.map(field => {
            const {label, type, name, value, placeholder} = field;
            return (
                <DynamicFormField key={name} type={type} label={label} name={name} value={value} onChange={onChange} placeholder={placeholder} id={label} />
            )
        })
    }

  return (
    <form onSubmit={onSubmit} className={`${className}`}>
        {error && <ErrorNotificationMessage errorMessage={error} />}
        {title && <h3 className="">{title}</h3>}
        <div className="input-container">
            {renderFields()}
        </div>

        <div className="btn-container">
            <Button text={confirmedBtnText } />
            {deniedBtnText && <Button text={deniedBtnText} type={"button"} handleEvent={onCancel} />}
        </div>

    </form>
  )
}

export default Form
