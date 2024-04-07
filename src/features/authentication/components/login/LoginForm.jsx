import React, { useEffect, useState } from 'react'
import Form from '../../../../components/Form'
import "./login.css"
import { NavLink, useNavigate } from 'react-router-dom'
import brandLogo from '../../assets/svgs/brandLogo.svg'
import {otpImage,  useWindowWidth } from '../..'
import { useDispatch, useSelector } from 'react-redux'
import { loginAction } from '../../actions/authAction'
import { getAuthError,  getauthStatus, setErrorStatus, updateAuthStatus } from '../../reducers/authSlice'
import Loader from '../../../../components/loader/Loader'
import loginImg from "./assets/images/login.png"

const LoginForm = () => {
  const authStatus = useSelector(getauthStatus)
  const errorStatus = useSelector(getAuthError)
  const [loginCredentials, setLoginCredentials]= useState({
    username: "",
    password: "",
    anonymous: ""

  })
  const [errorMessage, setErrorMessage] = useState(null)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {screenWidth} = useWindowWidth()

  const isDesktop = screenWidth >= 768

  const template = {
    title: !isDesktop && "Login",
    confirmedBtnText: "Sign in",
    fields :[
      {
        name: "username",
        value: loginCredentials.username,
        type: "text",
        placeholder: "Username"
      },
      {
        name: "password",
        value: loginCredentials.password,
        type: "password",
        placeholder: "Password"
      },
    ]
  }

  const handleFormChange = (e) => {
    const { name, value} = e.target;
    setLoginCredentials(oldData => {
      return {
        ...oldData,
        [name]: value.trim()
      }
    })
  }

  const handleUserLogin = async (e) => {
    e.preventDefault()
    const allLoginInputsFilled = Object.keys(loginCredentials).slice(0, -1).every(key => loginCredentials[key] !== "")

    try{
      if(!allLoginInputsFilled){
        throw new Error ("Oops! Looks like you missed something. Please fill in all the fields")
      }
      
      const options = {
        method: "POST",
        body: JSON.stringify(loginCredentials),
      };
      dispatch(loginAction(options))

      setLoginCredentials({
        username: "",
        password: "",
        anonymous: ""
      })
    }
    catch(error){
      setErrorMessage(error.message)
      console.log(error.message)
    }
    finally{
      dispatch(setErrorStatus(null))
    }
  }

  useEffect(() => {
    if(authStatus === "fulfilled"){
      dispatch(updateAuthStatus("idle"))
      navigate("/", {replace: true})
    }
  }, [authStatus])

  if(authStatus === "failed" && errorStatus){
    alert(errorStatus)
    setErrorMessage(errorStatus)
    dispatch(updateAuthStatus("idle"))
  }

  if(authStatus === "loading"){
    return <Loader text={"Logging in"} />
  }

  if(errorMessage){
    setTimeout(() => {
        setErrorMessage(null)
    }, 3000);
  }

  return (
    <article className="login-container">
        <div className="login-wrapper">
          {
            isDesktop && <div className="login-image-container">
              <img src={otpImage} className="login-image" alt="Login avatar" />
              <h3>Welcome back</h3>
              <p>...bridging the gap between social media and mental health.</p>
            </div>
          }

          <div className="login-content-container">
            <div className="login-brand-container">
              <img src={brandLogo} className="login-brand-logo" alt="brand-logo" />
            </div>

            <Form 
              template={template} 
              onSubmit={handleUserLogin} 
              className={"login-form"} 
              onChange={handleFormChange}
              keyDownEvent={""}
              error={errorMessage}
            />

            <div className="new-user-call-to-action-container">
              <p className="call-to-action-text">Not a member?</p>
              <NavLink to="/register" className={"call-to-action-link"}>Sign up</NavLink>
            </div>
        </div>
      </div>
    </article>
  )
}

export default LoginForm


