import React, { useEffect, useState } from 'react'
import "./logout.css"
import Button from '../../../../components/ui/Button'
import { useDispatch, useSelector } from 'react-redux'
import { logoutAction } from '../../actions/authAction'
import logoutIcon from "./logoutIcon.svg"
import { useNavigate } from 'react-router-dom'
import Loader from '../../../../components/loader/Loader'
import { getCurrentUser } from '../../../../libs/getCurrentUser'
import { getAuthError, getauthStatus, setErrorStatus, updateAuthStatus } from '../../reducers/authSlice'
import ConfirmationModal from '../../../../components/confirmationModal/ConfirmationModal'

const Logout = () => {
  const [showConfirmationModal, setshowConfirmationModal] = useState(false)
    const authStatus = useSelector(getauthStatus)
    const errorStatus = useSelector(getAuthError)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const currentUser = getCurrentUser();

    const logUserOut = async () => {
      try{
        const payload = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser.userToken}
            `,
          },
        };
        dispatch(logoutAction(payload))
      }
      catch(error){
        console.log(error)
      }
      finally{
        dispatch(setErrorStatus(null))
      }
    }

    useEffect(() => {
      if(authStatus === "fulfilled" && !currentUser.userName){
        navigate("/login")
      }
    }, [authStatus])

    if(authStatus === "loading"){
      return <Loader text={"Logging out"}/>
    }

    if(errorStatus && authStatus === "failed"){
      alert(errorStatus)
      dispatch(updateAuthStatus("idle"))
    }

  return (
    <div className="logout-container">
      {showConfirmationModal && <ConfirmationModal ariaLabel={"Click to logout from Ventmoir"} onConfirm={logUserOut} onCancel={() => setshowConfirmationModal(false)} heading={"Do you want to logout?"} />}
      <Button
        handleEvent={() => setshowConfirmationModal(true)}
        keyDownEvent={logUserOut}
        ariaLabel={"Click to open logout confirmation modal"}
        text={<img src={logoutIcon}  aria-hidden="true" alt="Logout icon" />
      }
      />
    </div>
  )
}

export default Logout
