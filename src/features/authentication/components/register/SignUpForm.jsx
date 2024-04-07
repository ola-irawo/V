import React, { useEffect, useState } from 'react'
import Form from '../../../../components/Form'
import "./sign-up.css"
import { NavLink, useNavigate } from 'react-router-dom'
import { bottomSvg, leftSvg, rightSvg, otpImage, useWindowWidth } from '../..'
import brandLogo from '../../assets/svgs/brandLogo.svg'
import {useDispatch, useSelector} from"react-redux"
import { signupAction } from '../../actions/authAction'
import DynamicFormField from '../../../../components/ui/DynamicFormField'
import Button from '../../../../components/ui/Button'
import registerImg from "./assests/images/register.png"
import { getAuthError, getauthStatus, setErrorStatus, updateAuthStatus } from '../../reducers/authSlice'
import Loader from '../../../../components/loader/Loader'
import ErrorNotificationMessage from '../../../../components/ui/errorNotification/ErrorNotificationMessage'

const SignUpForm = () => {
    const [userFormData, setUserFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirm_password: "",
        gender: "",
        isAbove18: null,
    })
    const [errorMessage, setErrorMessage] = useState(null)
    const authStatus = useSelector(getauthStatus)
    const errorStatus = useSelector(getAuthError)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {screenWidth} = useWindowWidth()

    const isDesktop = screenWidth >= 768

    const handleFormChange = (e) => {
        const {name, value} = e.target;
        setUserFormData(oldData => {
            return {
                ...oldData,
                [name]: value.trim(),
            }
        })
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        try {
            const isFormDataValid = Object.values(userFormData).every((value) => value);
            const errorMessage = !isFormDataValid ? "Please fill in all the fields." : userFormData && userFormData.password !== userFormData.confirm_password ? "Password does not match" : null
            if(errorMessage){
                throw new Error (errorMessage)
            }

            const options = {
                method: "POST",
                body: JSON.stringify(userFormData),
            };
            localStorage.setItem("email", userFormData.email)
            dispatch(signupAction(options))  
            
            // setUserFormData({
            //     username: "",
            //     email: "",
            //     password: "",
            //     confirm_password: "",
            //     gender: "",
            //     isAbove18: null
            // })
          } catch (error) {
            console.error("Signup error:", error.message);
            setErrorMessage(error.message)
        }
        finally{
            dispatch(updateAuthStatus("idle"))
            dispatch(setErrorStatus(null))
        }
    }

    const handleKeyDown = (e) => {
        if(e.target === "Enter" || e.target === " "){
            handleFormSubmit(e)
        }
    }

    console.log(authStatus)
    if(authStatus === "loading"){
        return <Loader text={"Setting up your account"} />
    }
    else if(authStatus === "fulfilled"){
        navigate("/otp", {state: userFormData.email, replace: true})
    }
    console.log(errorStatus)

    if(errorStatus && authStatus === "failed"){
        setErrorMessage(errorStatus)
        alert(errorMessage)
        dispatch(updateAuthStatus("idle"))
    }

    if(errorMessage){
        setTimeout(() => {
            setErrorMessage(null)
        }, 3000);
    }

    return (
    <article className="sign-up-container">
        <div className="register-wrapper">
            {
                isDesktop && <div className="register-image-container">
                    <img src={otpImage} className="register-image" alt="register" />
                    <h3>Welcome back</h3>
                    <p>...bridging the gap between social media and mental health.</p>
                </div>
            }

            <div className="register-content-container">
                <div className="register-brand-container">
                    <img src={brandLogo} className="register-brand-logo" alt="brand-logo" />
                </div>

                <form className="register-form" onSubmit={handleFormSubmit}>
                    {screenWidth < 618 && <h3>Sign up</h3>}
                    {
                        errorMessage  && errorMessage?.includes("Password") ? "" : <ErrorNotificationMessage errorMessage={errorMessage} />
                    }
                    <DynamicFormField type={"text"} name={"username"} value={userFormData.username} placeholder={"User name"} onChange={handleFormChange} error={errorMessage?.includes("username") && errorMessage} />
                    <DynamicFormField type={"email"} name={"email"} value={userFormData.email} placeholder={"Email address"} onChange={handleFormChange} error={errorMessage?.includes("email") && errorMessage} />
                    <DynamicFormField type={"password"} name={"password"} value={userFormData.password} placeholder={"Password"} onChange={handleFormChange} />
                    <DynamicFormField type={"password"} name={"confirm_password"} value={userFormData.confirm_password} placeholder={"Confirm Password"} onChange={handleFormChange} error={errorMessage?.includes("Password") && errorMessage}/>
                    <select name="gender" value={userFormData.gender}  onChange={handleFormChange}>
                        <option value={""}>Gender</option>
                        <option value={"Male"}>Male</option>
                        <option value={"Female"}>Female</option>
                        <option value={"Other"}>Other</option>
                        <option value={"Prefer not to say"}>Prefer not to say</option>
                    </select>

                    <div className="signup-checkbox">
                        <p id="above18-label">Are you above 18 or above?</p>
                        <div className="checkbox" aria-labelledby="above18-label" aria-live="polite">
                            <DynamicFormField type={"radio"} name={"isAbove18"} value={"yes"} label={"Yes"} 
                               onChange={handleFormChange}
                            />
                            <DynamicFormField type={"radio"} name={"isAbove18"} value={"no"} label={"No"}
                               onChange={handleFormChange}
                            />
                        </div>
                    </div>

                    <Button 
                        text={"Signup"}
                        keyDownEvent={(e) => handleKeyDown(e)}
                    />
                </form>
               

                <div className="login-disclaimer-container">
                    <div className="disclaimer-content">
                        <p className="disclaimer-text">
                            By Signing up, you agree to the <NavLink>Terms of use</NavLink> and <NavLink>Privacy Policy</NavLink>
                        </p>
                    </div>

                    <div className="login-call-to-action">
                        <p className="disclaimer-text">
                            Already have an account? 
                        </p>
                        
                        <NavLink to={"/login"}>Sign in</NavLink>
                    </div>
                </div>
            </div>
      </div>
    </article>
  )
}

export default SignUpForm
