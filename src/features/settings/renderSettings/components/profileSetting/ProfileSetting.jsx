import React, { useState } from 'react'
import "./profile-setting.css"
import DynamicFormField from '../../../../../components/ui/DynamicFormField';
import ToggleSwitch from '../../../../../components/ui/toggleSwitch/ToggleSwitch';
import Button from '../../../../../components/ui/Button';
import { updateBio } from '../../../../../services/bio/actions/updateBio';
import { showUserSocieties } from '../../../../../services/societies/reducers/societySlice';
import { getCurrentUser } from '../../../../../libs/getCurrentUser';
import { useDispatch, useSelector } from 'react-redux';
import { selectBio } from '../../../../../services/bio/reducers/bioSlice';

const ProfileSetting = () => {
  const [profileSettings, setProfileSettings] = useState({
    username: '',
  });
  const bio = useSelector(selectBio)
  const currentUser = getCurrentUser()
  const userBio =  bio?.find(bio => bio?.user._id === currentUser.userUid)
  const dispatch = useDispatch()

  const updateUsername = (e) => {
    e.preventDefault()

    try{
      if(!profileSettings.username){
        throw new Error("fill all fiedls")
      }

      const payload = {
        options: {
          method: "PATCH",
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${currentUser.userToken}`,
          },
          body: JSON.stringify({
            avatar: userBio.avatar,
            bio: userBio.bio,
            username: profileSettings.username
          }),
        },
        userUid: currentUser.userUid
      }
      dispatch(updateBio(payload))
      setProfileSettings({
        username: ""
      })
    }
    catch(error){
      console.log(error.message)
    }
  }

  return (
    <section className="profile-setting">
      <h2 className="profile-setting">Profile setting</h2>

      <form onSubmit={updateUsername} className="profile-setting-container">
        <DynamicFormField
          label={"Change display name"}
          name={"username"}
          value={profileSettings.username}
          type={"text"}
          placeholder={"Username"}
          onChange={(e) => setProfileSettings({username: e.target.value})}
        />

        {/* <div className="profile-setting">
          <h3 className="profile-setting">Show the societies I am active on my profile</h3>
          <ToggleSwitch
            name={"showSocities"}
            value={profileSettings.showSocieties} 
            onClick={() => }
          />
        </div> */}

        <Button
          text={"Save changes"}
          className={"profile-setting-btn"}
        />
      </form>
    </section>
  )
}

export default ProfileSetting
