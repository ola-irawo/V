import React, { useEffect } from 'react'
import Button from '../../../../../../components/ui/Button'
import { useDispatch } from 'react-redux'
import { getCurrentUser } from '../../../../../../libs/getCurrentUser'
import { shareComment } from '../../../../../../services/comment/actions/interactions/shareComment'
import { API_URL } from '../../../../../authentication'
import { getTotalReactionsCount } from '../../../../../../utils/getTotalReactionsCount'

/**
 * Component for sharing a comment.
 * @param {Object} comments - The comment data containing comment ID and share information.
 * @returns {JSX.Element} The JSX element for the CommentShare component.
 */

const CommentShare = ({comments}) => {
  const {_id, shares} = comments
  const dispatch = useDispatch()
  const currentUser = getCurrentUser()

  // Checks if the current user has already shared the comment
  const sharesUserIds = new Set(shares)
  const hasSharedComment = sharesUserIds.has(currentUser.userUid)

  const handleShareComment = () => {
    try{
      const payload = {
        options: {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser.userToken}
            `,
          }
        },
        commentId: _id
      }
      dispatch(shareComment(payload))
    }
    catch(error){
      console.log(error)
    }
  }

  const handleKeyDown = (e) => {
    if(e.key === "Enter" || e.key === " "){
      handleShareComment()
    }
  }
  
  return (
    <Button
      className={"share-btn"}
      handleEvent={(e) => {
        e.stopPropagation();
        handleShareComment()
      }}
      keyDownEvent={(e) => handleKeyDown(e)}
      text={
        <div aria-label="Share details">
          <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 26 24" fill={hasSharedComment ? "#000" : "none"}>
              <path d="M25 12L15.4 1V6.5C10.6 6.5 1 9.8 1 23C1 21.1661 3.88 17.5 15.4 17.5V23L25 12Z" stroke="#111111" strokeOpacity="0.68" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {comments?.shares?.length !== 0 && <span aria-label={`Total number of share: ${getTotalReactionsCount(shares)}`} >{getTotalReactionsCount(shares)}</span>}
        </div>
      }
    />
  )
}

export default CommentShare
