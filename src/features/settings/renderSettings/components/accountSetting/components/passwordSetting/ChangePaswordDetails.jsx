import React, {  useState } from 'react'
import './change-password-details.css'
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from '../../../../../../../libs/getCurrentUser';
import { changePassword } from '../../../../../../../services/settings/actions/accountSettingAction/changePassword';
import DynamicFormField from '../../../../../../../components/ui/DynamicFormField';
import Button from '../../../../../../../components/ui/Button';
import { getAccountSettingErrorMessage, getAccountSettingStatus, setAccountSettingErrorMessgae, updateAccountSettingStatus } from '../../../../../../../services/settings/reducers/accountingSettingSlice';
import NetworkError from '../../../../../../../components/networkError/NetworkError';

const ChangePasswordDetails = () => {
  const [updatePassword, setUpdatePassword] = useState({
    oldPassword : "",
    newPassword : "",
    confirmNewPassword : "",
  });
  const [errorMessage, setErrorMessage] = useState(null)
  const accountSettingStatus = useSelector(getAccountSettingStatus)
  const accountSettingErrorMessage = useSelector(getAccountSettingErrorMessage)

  const dispatch = useDispatch()
  const currentUser = getCurrentUser()

  const handleChangeUserPasswordInput = (e) => {
    const {name, value} = e.target
  
    setUpdatePassword(oldData => {
      return {
        ...oldData,
        [name]: value.trim()
      }
    })
  }

  const updateUserPassword = (e) => {
    e.preventDefault()
    const isPasswordInputValid = Object.values(updatePassword).every(Boolean)
    try{
      if(!isPasswordInputValid){
        throw new Error("Pleasse fill all fields")
      }
      if (updatePassword.newPassword !== updatePassword.confirmNewPassword) {
        throw new Error("New password and confirm password must match each other")
      }
      const payload = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.userToken}`,
        },
        body: JSON.stringify(updatePassword),
      };

      dispatch(changePassword(payload))
    }
    catch(error){
      setErrorMessage(error.message)
    }
    finally{
      dispatch(setAccountSettingErrorMessgae(null))
    }
  }

  if(!navigator.onLine && accountSettingErrorMessage && accountSettingStatus === "failed"){
    return <NetworkError />
  }

  if(accountSettingStatus === "fulfilled" || accountSettingStatus === "failed"){
    dispatch(updateAccountSettingStatus("idle"))
  }

  if(errorMessage){
    setTimeout(() => {
      setErrorMessage(null)
    }, 3000);
  }

  return (
    <form className="change-password">
      <h3>Change password details</h3>

      <DynamicFormField
        label={"Old password"}
        name={"oldPassword"}
        value={updatePassword.oldPassword}
        type={"password"}
        onChange={handleChangeUserPasswordInput}
      />
      <DynamicFormField 
        label={"New password"}
        name={"newPassword"}
        value={updatePassword.newPassword}
        type={"password"}
        onChange={handleChangeUserPasswordInput}
      />

      <DynamicFormField 
        label={"Confirm password"}
        name={"confirmNewPassword"}
        value={updatePassword.confirmNewPassword }
        type={"password"}
        onChange={handleChangeUserPasswordInput}
        error={errorMessage}
      />

      <Button
        text={"Save Changes"}
        className={"password-btn"}
        handleEvent={updateUserPassword}
      />
    </form>
  )
}

export default ChangePasswordDetails
