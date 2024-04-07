import React, { useEffect, useState } from "react";
import "./change-email-details.css"
import { getCurrentUser } from "../../../../../../../libs/getCurrentUser";
import { useDispatch, useSelector } from "react-redux";
import { changeEmail } from "../../../../../../../services/settings/actions/accountSettingAction/changeEmail";
import DynamicFormField from "../../../../../../../components/ui/DynamicFormField";
import Button from "../../../../../../../components/ui/Button";
import { getAccountSettingErrorMessage, getAccountSettingStatus, setAccountSettingErrorMessgae, updateAccountSettingStatus } from "../../../../../../../services/settings/reducers/accountingSettingSlice";
import NetworkError from "../../../../../../../components/networkError/NetworkError";

const ChangeEmailDetails = () => {
  const [newEmail, setNewEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState(null)
  const accountSettingStatus = useSelector(getAccountSettingStatus)
  const accountSettingErrorMessage = useSelector(getAccountSettingErrorMessage)

  const currentUser = getCurrentUser();
  const dispatch = useDispatch();

  const updateUserEmail = (e) => {
    e.preventDefault();
    try {
      if (!newEmail) {
        throw new Error("You must fill the field to change your email");
      }
      const payload = {
         method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser.userToken}`,
          },
          body: JSON.stringify({ newEmail }),
      };

      dispatch(changeEmail(payload));
    } catch (error) {
        setErrorMessage(error.message);
    } finally {
      dispatch(setAccountSettingErrorMessgae(null))
    }
  };

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
    <form className="change-email">
      <h3>Change email details</h3>
      <DynamicFormField
        label={"Email address"}
        name={"newEmail"}
        value={newEmail}
        type={"email"}
        placeholder={currentUser.user.existingUser.email.slice(0, 3) + "*******"}
        onChange={(e) => setNewEmail(e.target.value)}
        error={errorMessage}
      />
      <Button text={"Save changes"} handleEvent={updateUserEmail} />
    </form>
  );
};

export default ChangeEmailDetails;
