import React, { useEffect, useState } from 'react'
import "./profile-card.css"
import Button from '../../../../components/ui/Button'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentUser } from '../../../../libs/getCurrentUser'
import { muteUser } from '../../../../services/user/actions/muteUser'
import { selectBio, selectBioById } from '../../../../services/bio/reducers/bioSlice'
import UpdateBioDetails from './components/updateBioDetails/UpdateBioDetails'
import { selectAllUser } from '../../../../services/user/reducers/userSlice'
import { selectAllMutedUsers } from '../../../../services/mutedUser/reducers/mutedUserSlice'
import { unmuteUser } from '../../../../services/user/actions/unmuteUser'

const ProfileCard = () => {
    const [editBio, setEditBio] = useState(false)
    const {username} = useParams()
    const allUser = useSelector(selectAllUser)
    const bio = useSelector(selectBio)
    const mutedUsers = useSelector(selectAllMutedUsers)

    const dispatch = useDispatch()
    const currentUser = getCurrentUser()

    const user = allUser?.find(user => user?.username === username)
    const userBio =  bio?.find(bio => bio?.user._id === user?._id)
    const sameUser = username === currentUser.userName

    const IsUserMuted = mutedUsers.some(mutedUser => mutedUser?._id === user?._id)

    const mute = () => {
        const options = {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${currentUser.userToken}
              `,
            },
        };
        dispatch(muteUser({options, userUid: user?._id}))
    }

    const unmuteUserAccount = () => {
        try{
          const payload = {
            options: {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${currentUser.userToken}`,
              },
            },
            _id: user?._id
          }
    
          dispatch(unmuteUser(payload))
        }
        catch(error){
          console.log(error.message)
        }
    }

  return (
    <section className="profile-card-section">
        <article className="profile-card" typeof="schema:Profile">
            {editBio && <UpdateBioDetails userBio={userBio} setEditBio={setEditBio} />}

            {/* <div className="profile-card-wrapper"> */}
                <div className="profile-card-details">
                    <div className="profile-details">
                        <div className="profile-avatar-container">
                            <img src={userBio?.avatar} className="profile-avatar" alt={`${user?.username} profile avatar`}/>
                        </div>

                        <div className="profile-metadata-container">
                            <h3 className="profile-name">{user?.username}</h3>
                            <small className="profile-creation-date">Joined {user?.createdAt.slice(0, user?.createdAt.indexOf("-"))}</small>
                        </div>
                    </div>
                    
                    <div className="">
                        { 
                            sameUser
                            ? 
                                <Button 
                                    className={"profile-btn"} 
                                    text={"Edit profile"} 
                                    handleEvent={() => setEditBio(true)}
                                /> 
                            :
                                <Button 
                                    className={"profile-btn"}
                                    text={IsUserMuted ? "Unmute" : "Mute"}
                                    handleEvent={() => IsUserMuted ? unmuteUserAccount() : mute()}
                                />
                        }
                    </div>
                </div>
            

                <div className="profile-bio-container">
                    <p className="profile-bio">
                        {userBio?.bio}
                    </p>
                </div>

            {/* </div> */}
        </article>
    </section>
  )
}

export default ProfileCard
