import React, { useEffect, useRef, useState } from 'react'
import "./otp.css"
import { NavLink } from 'react-router-dom';
import { otpImage, useWindowWidth } from '../..';
import { useDispatch, useSelector } from 'react-redux';
import { verifyOTPAction } from '../../actions/authAction';
import Button from '../../../../components/ui/Button';
import brandLogo from "../../../../assets/svgs/brandLogo.svg"
import { getAuthError, getauthStatus, setErrorStatus, updateAuthStatus } from '../../reducers/authSlice';
import Loader from '../../../../components/loader/Loader';
import VerificationSuccess from './components/VerificationSuccess';
import ErrorNotificationMessage from '../../../../components/ui/errorNotification/ErrorNotificationMessage';

const OtpField = () => {
    const [errorMessage, setErrorMessage] = useState(null)
    const length = 6
    const [otpEmail, setOtpEmail] = useState(localStorage.getItem("email"))
    const [otp, setOtp] = useState(Array(length).fill(""))
    const authStatus = useSelector(getauthStatus)
    const errorStatus = useSelector(getAuthError)

    const inputRefs = useRef([...Array(length)].map(() => React.createRef()));
    const {screenWidth} = useWindowWidth()
    const dispatch = useDispatch()

    const isMobile = screenWidth <= 767

    const onComplete = (otp) => {
        console.log('OTP entered:', otp);
    };

    const handleInputChange = (value, index) => {
        if (isNaN(value)) return;
    
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
    
        // Move to the next input field if value is not empty
        if (value !== '' && index < length - 1) {
          inputRefs.current[index + 1].focus();
        }
    
        // Call onComplete callback if all inputs are filled
        if (newOtp.every((entry) => entry !== '')) {
          onComplete(newOtp.join(''));
        }
      };

    const handleInputKeyDown = (event, index) => {
        // Move to the previous input field on backspace if current input is empty
        if (event.key === 'Backspace' && index > 0 && otp[index] === '') {
            inputRefs.current[index - 1].focus();
        }
    };

    const verifyOTP = (e) => {
        e.preventDefault()
        const otpValue = otp.join("")
        const isOtpValid = Object.values(otp).every(value => value !== "")

        try{
            if(!isOtpValid){
                throw new Error ("Please fill in all the fields.")
            }
            const options = {
                method: "POST",
                body: JSON.stringify({
                    email: otpEmail,
                    otp: otpValue
                }),
            };

            dispatch(verifyOTPAction(options))
        }
        catch(error){
            console.log(error.message)
            setErrorMessage(error.message)
        }
        finally{
            dispatch(setErrorStatus(null))
        }
    }

    if(errorMessage){
        setTimeout(() => {
            setErrorMessage(null)
        }, 3000);
    }

    const renderOTP = () => {
    return (
        <form onSubmit={verifyOTP} className="otp-form">
            {errorMessage && <ErrorNotificationMessage errorMessage={errorMessage} />}

            <div className="input-container" role="group" aria-labelledby="otp-input-label">
                {otp.map((value, index) => (
                <input
                    id={`otp-input-${index}`}
                    key={index}
                    type="text"
                    maxLength="1"
                    value={value}
                    onChange={(e) => handleInputChange(e.target.value, index)}
                    onKeyDown={(e) => handleInputKeyDown(e, index)}
                    ref={(ref) => (inputRefs.current[index] = ref)}
                    aria-label={`Digit ${index + 1}`}
                />
                ))}
            </div>

            <Button 
                text={"Verify"} 
                ariaLabel={"Verify OTP"}
            />
        </form>
        );
    }

    useEffect(() => {
        inputRefs?.current[0].focus()
    }, [])

    if(authStatus === "loading"){
        return <Loader text={"Verifying your email"} />
    }
    else if(authStatus === "fulfilled"){
        return <VerificationSuccess />
    }

    if(errorStatus && authStatus === "failed"){
        alert(errorStatus)
        dispatch(updateAuthStatus("idle"))
    }

  return (
    <article className="otp-container">
        <div className="otp-wrapper">

           { <div className="otp-image-container">
                <img src={otpImage} className="otp-image" alt="OTP" />
                {
                    !isMobile && (
                        <>
                            <h3>Welcome back</h3>
                            <p>...bridging the gap between social media and mental health.</p>
                        </>
                    )
                }
            </div>}

            <div className="otp-content-container">
               {
                    !isMobile &&  <div className="otp-brand-container">
                        <img src={brandLogo} className="otp-brand-img" alt="brand-logo" />
                    </div>
                }

                <div className="otp-text-container">
                    <h3>OTP Verification</h3>
                    <p>Enter the OTP sent to <span aria-live="polite">{otpEmail}</span></p>
                </div>

                {renderOTP()}
                <div className="otp-resend-link-container">
                    <p className="otp-resend-link"> Didn’t receive the OTP?</p>
                    <NavLink to="" aria-label="Resend OTP">Resend OTP</NavLink>
                </div>
            </div>
        </div>

    </article>
  )
}

export default OtpField
