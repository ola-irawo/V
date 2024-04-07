import React, { useEffect } from 'react'
import "./blocked-users-list.css"
import { useDispatch, useSelector } from 'react-redux'
import { getBlockedUsers } from '../../../../../../../services/blockedUser/actions/getBlockedUsers'
import { getBlockedUserErrorMessage, getBlockedUserStatus, selectAllBlockedUsers, updateBlockedUserStatus } from '../../../../../../../services/blockedUser/reducers/blockedUsersSlice'
import Button from '../../../../../../../components/ui/Button'
import { selectBio } from '../../../../../../../services/bio/reducers/bioSlice'
import { unblockUser } from '../../../../../../../services/user/actions/unblockUser'
import { getCurrentUser } from '../../../../../../../libs/getCurrentUser'
import Loader from '../../../../../../../components/loader/Loader'
import NetworkError from '../../../../../../../components/networkError/NetworkError'

const BlockedUsersList = () => {
  const allBlockedUsers = useSelector(selectAllBlockedUsers)
  const blockUserStatus = useSelector(getBlockedUserStatus)
  const blockUserErrorMessage = useSelector(getBlockedUserErrorMessage)
  const allUserBio = useSelector(selectBio)
  const dispatch = useDispatch()
  const currentUser = getCurrentUser()

  const getUserDetails = (userId) => {
    const user = allUserBio.find(user => user.user._id === userId);
    return user ? user : null;
  }

  const unblockUserAccount = (userId) => {
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

      dispatch(unblockUser(payload))
    }
    catch(error){
      console.log(error.message)
    }
  }

  useEffect(() => {
    dispatch(getBlockedUsers())
  }, [allBlockedUsers, dispatch])

  if(blockUserStatus === "loading"){
    return <Loader text={"Loading"} isSmallLoader={true} />
  }

  if(!allBlockedUsers.length){
    return <center className="no-block-user">
      <h2>No block user</h2>
    </center>
  }

  if(!navigator.onLine && blockUserErrorMessage && blockUserStatus === "failed"){
    return <NetworkError />
  }

  if(blockUserStatus === "fulfilled" || blockUserStatus === "failed"){
    dispatch(updateBlockedUserStatus("idle"))
  }

  return (
    <section className="blocked-user">
      <h2 className="blocked-user">Blocked accounts</h2>

      <ul className="blocked-user-list">
        {allBlockedUsers?.map(blockedUser => {
          return <li key={blockedUser._id} className="blocked-user-list-item">

            <div className="blocked-user-details">
              <img src={getUserDetails(blockedUser._id)?.avatar} className="blocked-user-avatar" alt={`${blockedUser.username} avatar`} />
              
              <div>
                <div className="blocked-user-name-btn-container">
                  <div className="blocked-user-name-container">
                    <h3 className="blocked-username">{blockedUser.username}</h3>
                    <small className="block-user-handle">@{blockedUser.username}</small>
                  </div>

                  <Button
                    text={"unblock"}
                    className={"unblock-user-btn"}
                    handleEvent={() => unblockUserAccount(blockedUser._id)}
                  />
                </div>

                <p className="blocked-user-bio">
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

export default BlockedUsersList
