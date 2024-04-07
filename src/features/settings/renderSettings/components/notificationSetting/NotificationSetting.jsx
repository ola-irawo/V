import React, { useEffect, useState } from 'react'
import "./notification-setting.css"
import { getCurrentUser } from '../../../../../libs/getCurrentUser';
import { useDispatch, useSelector } from 'react-redux';
import { toggleMention } from '../../../../../services/settings/actions/notificationSettingAction/toggleMention';
import { togglePostUpvoteNotifications } from '../../../../../services/settings/actions/notificationSettingAction/togglePostUpvoteNotifications';
import { toggleReplyNotifications } from '../../../../../services/settings/actions/notificationSettingAction/toggleReplyNotifications';
import { toggleCommentNotfication } from '../../../../../services/settings/actions/notificationSettingAction/toggleCommentNotification';
import ToggleSwitch from '../../../../../components/ui/toggleSwitch/ToggleSwitch';
import { getNotificationsActiveState } from '../../../../../services/settings/actions/notificationSettingAction/getNotificationsActiveState';
import { getNotficationSettingErrorMessage, getNotficationSettingStatus, selectAllNotificationsState } from '../../../../../services/settings/reducers/notificationSettingSlice';
import { toggleCommentUpvoteNotifications } from '../../../../../services/settings/actions/notificationSettingAction/toggleCommentUpvoteNotifications';
import NetworkError from '../../../../../components/networkError/NetworkError';
import { updateAccountSettingStatus } from '../../../../../services/settings/reducers/accountingSettingSlice';

const NotificationSetting = () => {
  const allNotificationState = useSelector(selectAllNotificationsState)
  const notificationSettingStatus = useSelector(getNotficationSettingStatus)
  const notificationSettingErrorMessage= useSelector(getNotficationSettingErrorMessage)
  const currentUser = getCurrentUser()
  const dispatch = useDispatch()

  const [notificationActiveState] = allNotificationState

  const userActivities = [
    {name: "Mentions of you", value: notificationActiveState?.allowMention, activity: "mentions"},
    {name: "Comments on your posts", value: notificationActiveState?.receiveCommentNotifications
    , activity: "postComments"},
    {name: "Upvotes on your posts", value: notificationActiveState?.receivePostUpvoteNotifications
    , activity: "postUpvotes"},
    {name: "Replies to your comments", value: notificationActiveState?.
    receiveReplyNotifications
    , activity: "commentReplies"},
    {name: "Upvotes to your comments", value: notificationActiveState?.
    receiveCommentUpvoteNotifications
    , activity: "commentUpvotes"},
  ]

  const toggleUserActivity = (activity) => {
    const payload = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser.userToken}`,
      },
    }

    switch(activity){
      case "mentions":
        dispatch(toggleMention(payload))
        break;
      case "postComments":
        dispatch(toggleCommentNotfication(payload))
        break;
      case "postUpvotes":
        dispatch(togglePostUpvoteNotifications(payload))
        break;
      case "commentReplies":
        dispatch(toggleReplyNotifications(payload))
        break;
      case "commentUpvotes":
        dispatch(toggleCommentUpvoteNotifications(payload))
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    dispatch(getNotificationsActiveState())
  }, [dispatch, allNotificationState])

  if(!navigator.onLine && notificationSettingErrorMessage && notificationSettingStatus === "fuifilled"){
    return <NetworkError />
  }

  if(notificationSettingStatus === "fulfilled" || notificationSettingStatus === "failed"){
    dispatch(updateAccountSettingStatus("idle"))
  }
  return (
    <section className="notification-setting">
      <h2 className="notification-setting">Notification Setting</h2>

      <ul className="notfication-setting-list">
        {userActivities.map(activity => {
          return <li key={activity.activity} className="notfication-setting-list-item">
            <h3 className="activity-name">{activity.name}</h3>

            <ToggleSwitch 
              value={activity.value} 
              onClick={() => toggleUserActivity(activity.activity)}
            />
          </li>
        })}
      </ul>
    </section>
  )
}

export default NotificationSetting
