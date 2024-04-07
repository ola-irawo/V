import React, { useEffect, useId } from 'react'
import "./notification-list.css"
import { useDispatch, useSelector } from 'react-redux'
import { getUserNotification } from '../../services/notification/actions/getUserNotification'
import { getNotificationError, getNotificationStatus, selectAllNotifications, updateNotificationStatus } from '../../services/notification/reducers/notificationSlice'
import { selectBio } from '../../services/bio/reducers/bioSlice'
import { useNavigate } from 'react-router-dom'
import { useWindowWidth } from '../authentication'
import Loader from '../../components/loader/Loader'
import NetworkError from '../../components/networkError/NetworkError'

const NotificationList = () => {
  const userNotification = useSelector(selectAllNotifications)
  const notificationStatus = useSelector(getNotificationStatus)
  const notificationError = useSelector(getNotificationError)
  const bio = useSelector(selectBio)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {screenWidth} = useWindowWidth()
  const isMobile = screenWidth <= 767

  const getUserAvatar = (userId) => {
   const userBio = bio?.find(bio => bio?.user._id === userId)
   return  userBio?.avatar
  }

  useEffect(() => {
    if(userNotification.length === 0){
      dispatch(getUserNotification())
    }
  }, [])

  const navigateToUserProfile = (e, alert) => {
    if(e.key === "Enter" || e.key === " "){
      navigate(`/profile/${alert.actionUserId?.username}`)
      return
    }
    navigate(`/profile/${alert.actionUserId?.username}`)
  }

  if(notificationStatus === "loading"){
    return <Loader text={"Fetching notification"}  isSmallLoader={true} />
  }

  if(!navigator.onLine && notificationError && notificationStatus === "failed"){
    return <NetworkError />
  }

  if(notificationStatus === "fulfilled" || notificationStatus === "failed" ){
    dispatch(updateNotificationStatus("idle"))
  }
  
  return (
    <section className="notification-list">
      <ul className="notification-list">
        {
          userNotification?.map(alert => {
            return <li className="notification-list-item">
              <div className="notification-details">
                <div className="notification-">
                  <a
                    className="notification-img-container"
                    onClick={(e) => navigateToUserProfile(e, alert)}
                    onKeyDown={(e) => navigateToUserProfile(e, alert)}
                    aria-label={`View profile of ${alert.actionUserId?.username}`}
                  >
                    <img
                      className="notification-img"
                      src={getUserAvatar(alert.actionUserId?._id)} 
                      alt={`${alert.actionUserId?.username}'s profile avatar`}
                    /> 
                  </a>

                  <div>
                    <div
                      className="notification-action-type"
                      onClick={(e) => {
                        navigateToUserProfile(e, alert)
                      }}
                      onKeyDown={(e) => navigateToUserProfile(e, alert)}
                    >
                      <h4 className="notification-action-type">
                        {alert.actionUserId?.username}

                        <span 
                          className="notification-action-type"
                          onClick={(e) => {
                            e.stopPropagation()
                            alert?.commentId?._id
                            ?
                            navigate(`/comment/${alert.actionUserId?.username}/${alert.commentId._id}`)
                            :
                            navigate(`/post/${alert.actionUserId?.username}/${alert.postId._id}`)
                          }}
                          onKeyDown={(e) => {
                            e.stopPropagation()
                            alert?.commentId?._id
                            ?
                            navigate(`/comment/${alert.actionUserId?.username}/${alert.commentId._id}`)
                            :
                            navigate(`/post/${alert.actionUserId?.username}/${alert.postId._id}`)
                          }}
                        > 
                        {
                        alert.type === "mention" 
                        ? " mentioned" 
                        : " " + alert.type} {alert.type === "mention" ?  alert.commentId ? "you in a comment" : " you in a post" : alert.type === "post" || alert.type === "comment" ? "on your" : "your"} 
                        { alert.type === "mention" ? "" : alert.commentId ? " comment" : " post"} 
                        </span>
                      </h4>
                    </div>

                    <p 
                      className="notification-content"
                      onClick={() => {
                        alert?.commentId?._id
                        ?
                        navigate(`/comment/${alert.actionUserId?.username}/${alert.commentId._id}`)
                        :
                        navigate(`/post/${alert.actionUserId?.username}/${alert.postId._id}`)
                      }}
                    >
                     {/* if comment exists, show comment else show post */
                        alert.commentId?.comment && alert.commentId?.comment.length > 100
                        ? alert.commentId?.comment.slice(0, 100) + " ...see more"
                        : alert.postId?.post && alert.postId?.post.length > 100
                        ? alert.postId?.post.slice(0, 100) + " ...see more"
                        : alert.commentId?.comment || alert.postId?.post
                      }
                    </p>
                  </div>
                </div>

                {!isMobile && <small className="notification-timestamp">{alert.createdAt}</small>}
              </div>

            </li>
        })
        }
      </ul>
    </section>
  )
}

export default NotificationList
