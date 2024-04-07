import React, { useEffect } from 'react'
import "./muted-users-list.css"
import { getMutedUsers } from '../../../../../../../services/mutedUser/actions/getMutedUsers'
import { unmuteUser } from '../../../../../../../services/user/actions/unmuteUser'
import { getCurrentUser } from '../../../../../../../libs/getCurrentUser'
import { useDispatch, useSelector } from 'react-redux'
import { selectBio } from '../../../../../../../services/bio/reducers/bioSlice'
import { getMutedUserErrorMessage, getMutedUserStatus, selectAllMutedUsers, updateMutedUserStatus } from '../../../../../../../services/mutedUser/reducers/mutedUserSlice'
import Button from '../../../../../../../components/ui/Button'
import Loader from '../../../../../../../components/loader/Loader'
import NetworkError from '../../../../../../../components/networkError/NetworkError'

const MutedUsersList = () => {
  const allMutedUsers = useSelector(selectAllMutedUsers)
  const mutedUserStatus = useSelector(getMutedUserStatus)
  const mutedUserErrorMessage = useSelector(getMutedUserErrorMessage)
  const allUserBio = useSelector(selectBio)
  const dispatch = useDispatch()
  const currentUser = getCurrentUser()

  const getUserDetails = (userId) => {
    const user = allUserBio.find(user => user.user._id === userId);
    return user ? user : null;
  }

  const unmuteUserAccount = (userId) => {
    try{
      const payload = {
        options: {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser.userToken}`,
          },
        },
        _id: userId
      }

      dispatch(unmuteUser(payload))
    }
    catch(error){
      console.log(error.message)
    }
  }

  useEffect(() => {
    dispatch(getMutedUsers())
  }, [])

  if(mutedUserStatus === "loading"){
    return <Loader text={"Loading"} isSmallLoader={true} />
  }

  if(!allMutedUsers.length){
    return <center className="no-mute-user">
      <h2>No mute user</h2>
    </center>
  }

  if(!navigator.onLine && mutedUserErrorMessage && mutedUserStatus === "failed"){
    return <NetworkError />
  }

  if(mutedUserStatus === "fulfilled" || mutedUserStatus === "failed"){
    dispatch(updateMutedUserStatus("idle"))
  }
  
  return (
    <section className="muted-user">
      <h2 className="muted-user">Muted users</h2>
      <ul className="muted-user-list">
        {allMutedUsers?.map(blockedUser => {
          return <li key={blockedUser._id} className="muted-user-list-item">

            <div className="muted-user-details">
              <img src={getUserDetails(blockedUser._id)?.avatar} className="muted-user-avatar" alt={`${blockedUser.username} avatar`} />
              
              <div>
                <div className="muted-user-name-btn-container">
                  <div className="muted-user-name-container">
                    <h3 className="muted-username">{blockedUser.username}</h3>
                    <small className="muted-user-handle">@{blockedUser.username}</small>
                  </div>

                  <Button
                    text={"unmute"}
                    className={"muted-user-btn"}
                    handleEvent={() => unmuteUserAccount(blockedUser._id)}
                  />
                </div>

                <p className="muted-user-bio">
                  {getUserDetails(blockedUser._id)?.bio}
                </p>
              </div>
            </div>
          </li>
        })}
      </ul>
    </section>
  )
}

export default MutedUsersList
