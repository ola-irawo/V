import React, { useState } from 'react'
import "./update-bio-details.css"
import DynamicFormField from '../../../../../../components/ui/DynamicFormField'
import Button from '../../../../../../components/ui/Button'
import { getCurrentUser } from '../../../../../../libs/getCurrentUser'
import { useDispatch } from 'react-redux'
import { updateBio } from '../../../../../../services/bio/actions/updateBio'
import ProfileAvatarSelector from '../../../../../../components/ui/profileAvatarSelector/ProfileAvatarSelector'
import { brandLogo, useWindowWidth } from '../../../../../authentication'
import { useNavigate } from 'react-router-dom'

const UpdateBioDetails = ({userBio, setEditBio}) => {
    const [profileSetUp, setProfileSetUp] = useState({
        avatar: null,
        bio: "",
        username: ""
    })
    const [avatarModal, setAvatarModal] = useState(false)
    const currentUser = getCurrentUser()
    const {screenWidth} = useWindowWidth()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const isMobile = screenWidth <= 767

    const updateUserBio = (e) => {
        e.preventDefault()
        try{
            const payload = {
                options: {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${currentUser.userToken}`,
                    },
                    body: JSON.stringify(profileSetUp),
                },
                userUid: currentUser.userUid
            }
            console.log("update")
            dispatch(updateBio(payload))
        }
        catch(error){
            // console.log(error)
        }
    }

  return (
    <article className="update-bio-container" style={{backgroundColor: "#fff"}}>
        {
            isMobile &&
            <div className="update-bio-header">
                <Button
                    handleEvent={() => setEditBio(false)}
                    keyDownEvent={() => setEditBio(false)}
                    ariaLabel="Close modal"
                    text={
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 19 16" fill="none">
                            <path d="M0.292893 7.29289C-0.0976314 7.68342 -0.0976315 8.31658 0.292892 8.70711L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41421 8L8.07107 2.34314C8.46159 1.95262 8.46159 1.31946 8.07107 0.928931C7.68054 0.538407 7.04738 0.538407 6.65686 0.928931L0.292893 7.29289ZM19 7L1 7L1 9L19 9L19 7Z" fill="#263238" fill0pacity="0.7"/>
                        </svg> 
                    }
                />
            
                <img src={brandLogo} className="update-bio-header" alt="Brand Logo" />
            </div>
        }
            
        <form onSubmit={updateUserBio} className="update-bio-form">
           
            {avatarModal && <ProfileAvatarSelector setProfileSetUp={setProfileSetUp} setAvatarModal={setAvatarModal} />}
            <div className="update-bio-head">
                <h2 className="update-profile-head">Edit Profile</h2>
                
                {!isMobile && <Button
                    text={
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="29" viewBox="0 0 24 29" fill="none">
                            <path d="M2.30713 26.5727L12.0075 14.405L21.7079 26.5727M21.7079 2.2373L12.0057 14.405L2.30713 2.2373" stroke="#111111" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    }
                    handleEvent={() =>setEditBio(false) }
                />}
            </div>

            <label htmlFor="avatar" className="update-bio-avatar-label">
                <img src={userBio?.avatar} alt="Profile avatar"/>
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <rect width="40" height="40" rx="20" fill="black" fillOpacity="0.4"/>
                    <path d="M19 27H12C11.4696 27 10.9609 26.7893 10.5858 26.4142C10.2107 26.0391 10 25.5304 10 25V16C10 15.4696 10.2107 14.9609 10.5858 14.5858C10.9609 14.2107 11.4696 14 12 14H13C13.5304 14 14.0391 13.7893 14.4142 13.4142C14.7893 13.0391 15 12.5304 15 12C15 11.7348 15.1054 11.4804 15.2929 11.2929C15.4804 11.1054 15.7348 11 16 11H22C22.2652 11 22.5196 11.1054 22.7071 11.2929C22.8946 11.4804 23 11.7348 23 12C23 12.5304 23.2107 13.0391 23.5858 13.4142C23.9609 13.7893 24.4696 14 25 14H26C26.5304 14 27.0391 14.2107 27.4142 14.5858C27.7893 14.9609 28 15.4696 28 16V19.5M23 26H29M26 23V29" stroke="white" stroke-opacity="0.92" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 20C16 20.7956 16.3161 21.5587 16.8787 22.1213C17.4413 22.6839 18.2044 23 19 23C19.7956 23 20.5587 22.6839 21.1213 22.1213C21.6839 21.5587 22 20.7956 22 20C22 19.2044 21.6839 18.4413 21.1213 17.8787C20.5587 17.3161 19.7956 17 19 17C18.2044 17 17.4413 17.3161 16.8787 17.8787C16.3161 18.4413 16 19.2044 16 20Z" stroke="white" strokeOpacity="0.92" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <input
                    type="file"
                    id="avatar"
                    onClick={(e) => {
                        e.preventDefault()
                        setAvatarModal(true)
                    }}
                />
            </label>

            <DynamicFormField
                label={"Display Name"}
                type={"text"}
                placeholder={currentUser.userName}
                name={"username"}
                value={profileSetUp.username}
                className={"display-name"}
                onChange={(e) => {
                    setProfileSetUp(oldData => {
                        return {
                          ...oldData,
                          username: userBio?.username ? userBio?.username : e.target.value,
                        //   username: e.target.value
                        }
                    })
                }} 
            />

            <DynamicFormField
                type={"textarea"}
                name={"bio"}
                value={profileSetUp.bio}
                label={"Bio"}
                placeholder={userBio?.bio || ""}
                className={"bio"}
                onChange={(e) => {
                    setProfileSetUp(oldData => ({
                        ...oldData,
                        bio: profileSetUp.bio ? profileSetUp.bio : userBio?.bio,
                        bio: e.target.value
                    }));
                }} 
            />

            <Button
                text={"Save Changes"}
                className={"update-bio-btn"}
                // disabled={profileSetUp.bio === "" || profileSetUp.username === ""}
            />
        </form>
    </article>

  )
}

export default UpdateBioDetails
