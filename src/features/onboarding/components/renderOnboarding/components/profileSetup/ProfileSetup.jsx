import React, { useEffect, useState } from 'react'
import "./profile-setup.css"
import { useDispatch, useSelector } from 'react-redux'
import { getBioError, getBioStatus } from '../../../../../../services/bio/reducers/bioSlice'
import { getCurrentUser } from '../../../../../../libs/getCurrentUser'
import { createBio } from '../../../../../../services/bio/actions/createBio'
import ProfileAvatarSelector from '../../../../../../components/ui/profileAvatarSelector/ProfileAvatarSelector'
import DynamicFormField from '../../../../../../components/ui/DynamicFormField'
import { selectAllAvatars } from '../../../../../../services/avatar/reducers/avatarSlice'
import Button from '../../../../../../components/ui/Button'
import ConfirmationModal from '../../../../../../components/confirmationModal/ConfirmationModal'

const ProfileSetup = () => {
  const [avatarModal, setAvatarModal] = useState(false)
  const [profileSetup, setProfileSetUp] = useState({
    bio: "",
    avatar: null
  })
  const allPofileAvatars = useSelector(selectAllAvatars)
  const dispatch = useDispatch()
  const bioStatus = useSelector(getBioStatus)
  const error = useSelector(getBioError)
  const currentUser = getCurrentUser()

  const setUpProfile = (e) => {
    e.preventDefault()
    // if(profileSetup.bio.length > 2){
    //   alert("Bio must be within 300 characters")
    // }
    try{
      const payload = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.userToken}`
        },
        body: JSON.stringify(profileSetup)
        
      }
      dispatch(createBio(payload))
    }
    catch(error){
      // console.log(error)
    }
    finally{
      // bioStatus = "idle"
    }
  }

  useEffect(() => {
    console.log(profileSetup);
  }, [profileSetup]);

  return (
    <form onSubmit={setUpProfile} className="profile-article">
      {/* <ConfirmationModal /> */}
      {avatarModal && <ProfileAvatarSelector setProfileSetUp={setProfileSetUp} setAvatarModal={setAvatarModal}/>}
      <div className="profile-text-container">
        <h2>Hi Irawo</h2>
        <p>Before you continue, Kindly upload your profile picture (You can choose from a selection of avatars provided only by the platform) </p>
      </div>

      <label 
        aria-label="Choose profile avatar"
        htmlFor="profile-file" 
        className="profile-file-container" onClick={(e) => {
        e.preventDefault()
        setAvatarModal(true)
      }}
      style={{
        backgroundImage: profileSetup.avatar ? `url(${profileSetup.avatar})` : "none",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        // backgroundPosition: "center",
        backdropFilter: "blur(30px) brightness(80%) opacity(70%)",
      }}
      >
        <input 
          type="file"
          className="profile-file"
          id="profile-file"
          onClick={(e) => e.preventDefault()}
        />
       { profileSetup.avatar 
        ? 
        <img src={profileSetup.avatar} className="profile-setup-avatar" alt={`User profile avatar`} /> 
        : 
        <svg className="profile-setup-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/>
        </svg>}

        <Button
          className={"choose-avatar"}
          text= {<svg aria-label="circle-plus" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/></svg>
          }
        />
      </label>
      

      <div className="profile-bio-container">
        <h3>Bio <span>(up to 300 characters)</span></h3>
        <DynamicFormField 
          name={"bio"}
          value={profileSetup.bio}
          type={"textarea"}
          onChange={(e) => {
            if(e.target.value.length > 300){
              alert("Bio must be within 300 characters")
              return
            }
            setProfileSetUp(oldData => {
              return {
                ...oldData,
                bio: e.target.value
              }
            })
          }}
          ariaLabel="A textarea to input a short bio, up to 300 characters"
        />
      </div>

      <div className="next-onboarding-step">
        <Button 
          text={"Submit"}
          className={"submit-bio-btn"}
          ariaLabel="Click to submit your profile details"
        />
      </div>
    </form>
  )
}

export default ProfileSetup