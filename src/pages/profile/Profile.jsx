import React, { useEffect } from 'react'
import "./profile.css"
import { ProfileCard, ProfileFeed, ProfileWidget } from '../../features/profile/index'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUserErrorMessage, getUserStatus, selectAllUser } from '../../services/user/reducers/userSlice'
import NotFoundPage from '../../components/notFoundPage/NotFoundPage'
import NetworkError from '../../components/networkError/NetworkError'
import Loader from '../../components/loader/Loader'
import useWindowWidth from '../../hooks/useWindowWidth'
import { getMutedUserStatus, selectAllMutedUsers } from '../../services/mutedUser/reducers/mutedUserSlice'
import { getCurrentUser } from '../../libs/getCurrentUser'
import { getMutedUsers } from '../../services/mutedUser/actions/getMutedUsers'

const Profile = () => {
  const allUser = useSelector(selectAllUser)
  const userStatus = useSelector(getUserStatus)
  const userErrorMessage = useSelector(getUserErrorMessage)
  const mutedUsers = useSelector(selectAllMutedUsers)
  const mutedUserStatus = useSelector(getMutedUserStatus)

  const dispatch = useDispatch()
  const currentUser = getCurrentUser()
  const {username} = useParams()

  const user = allUser?.find(user => user?.username === username)
  const IsUserMuted = mutedUsers.some(mutedUser => mutedUser?._id === user?._id)
  const {screenWidth} = useWindowWidth()

  useEffect(() => {
    dispatch(getMutedUsers())
  }, [])
  
  if(userStatus === "loading"){
    return <Loader text={"Loading"} isSmallLoader={screenWidth < 768 ? true : false} />
  }

  if(!navigator.onLine && userErrorMessage && userStatus === "failed"){
    return <NetworkError />
  }

  if(IsUserMuted){
    return <main className="profile-container">
      <div className="profile-layout">
        <ProfileCard />
        <center className="muted-user-message">
          <h2>{username} is muted. Unmute to view user's contents</h2>
        </center>
      </div>
    </main>
  }

  console.log(user)
  if(!user && !IsUserMuted ){
    return <NotFoundPage errorTitle={"This account doesn’t exist."} errorMessage={"Try searching for another."}/>
  }

  return (
    <main className="profile-container">
      <div className="profile-layout">
        <ProfileCard />
        <ProfileFeed />
      </div>
      <ProfileWidget />
    </main>
  )
}

export default Profile
