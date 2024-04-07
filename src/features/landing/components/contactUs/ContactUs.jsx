import React, { useState } from 'react'
import "./contact-us.css"
import Button from '../../../../components/ui/Button'
import contactIcon  from './assets/images/contact.png'

const ContactUs = () => {
    const [contactForm, setContactForm] = useState({
        name: "",
        email: "",
        message: ""
    })

    const handleFormData = (e) => {
        try{
            const {name, value} = e.target;
            setContactForm(oldData => {
                return {
                    ...oldData,
                    [name]: value
                }
            })
        }
        catch(error){
            // console.log(error)
        }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()

        try{
            if(!contactForm){
                throw new Error("Fill all details")
            }
            // console.log(contactForm)
            setContactForm({
                name: "",
                email: "",
                message: ""
            })
        }
        catch(error){
            // console.log(error.message)
        }
    }

  return (
    <section className="contact-section">

        <div className="contact-wrapper">
            <h2 className="contact-head">Contact Us</h2>

            <form className="contact-form" onSubmit={handleFormSubmit}>

                <div className="form-img-container">
                    <img src={contactIcon} className="form-img" alt="contact-icon" />
                </div>

                <div className="contact-input">
                    <input 
                        type="text" 
                        name="name" 
                        value={contactForm.name} 
                        placeholder="name"  
                        onChange={handleFormData}
                    />
                    <input 
                        type="email" 
                        name="email" 
                        value={contactForm.email} 
                        placeholder="email"  
                        onChange={handleFormData}
                    />
                    <textarea 
                        name="message" 
                        value={contactForm.message} 
                        placeholder="message"  
                        onChange={handleFormData}
                    />
                </div>

                <Button text={"Submit"} />
            </form>
        </div>
      
    </section>
  )
}

export default ContactUs
