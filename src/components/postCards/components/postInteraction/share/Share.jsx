import React, { useEffect } from 'react'
import "./share.css"
import Button from '../../../../ui/Button'
import { getCurrentUser } from '../../../../../libs/getCurrentUser'
import { useDispatch, useSelector } from 'react-redux'
import { sharePost } from '../../../../../services/post/actions/interactions/share'
import { getTotalReactionsCount } from '../../../../../utils/getTotalReactionsCount'

/**
 * Component for sharing a post.
 * @param {Object} posts - The post data containing post ID and share information.
 * @returns {JSX.Element} The JSX element for the Share component.
 */

const Share = ({posts}) => {
    const currentUser = getCurrentUser()
    const dispatch = useDispatch()
    const {_id, shares} = posts

    // Checks if the current user has already shared the post
    const sharedUserIds = new Set(shares)
    const hasSharedPost = sharedUserIds.has(currentUser.userUid)
    
    const handleShare = () => {
      const payload = {
        options: {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser.userToken}
            `,
          }
        },
        _id
      }
      dispatch(sharePost(payload))
    }
    
    const handleKeyDown = (e) => {
      if(e.target === "Enter" || e.target === " "){
        handleShare()
      }
    }

  return (
    <Button 
      className={"share-btn"}
      handleEvent={(e) => {
        e.stopPropagation();
        handleShare()
      }}
      keyDownEvent={(e) => handleKeyDown(e)}
      text={
        <div aria-label="Share details">
            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 26 24" fill={hasSharedPost ? "#000" : "none"}>
                <path d="M25 12L15.4 1V6.5C10.6 6.5 1 9.8 1 23C1 21.1661 3.88 17.5 15.4 17.5V23L25 12Z" stroke="#111111" strokeOpacity="0.68" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {shares?.length !== 0 && <span aria-label={`Total number of share: ${getTotalReactionsCount(shares)}`} >{getTotalReactionsCount(shares)}</span>}

        </div>
      }
    />
  )
}

export default Share
