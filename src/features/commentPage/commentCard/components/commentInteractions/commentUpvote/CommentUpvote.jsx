import React, { useRef } from 'react'
import Button from '../../../../../../components/ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from '../../../../../../libs/getCurrentUser';
import { upvoteComment } from '../../../../../../services/comment/actions/interactions/upvoteComment';
import { getTotalReactionsCount } from '../../../../../../utils/getTotalReactionsCount';

const CommentUpvote = ({comments}) => {
    const {_id, likes} = comments
    const buttonRef = useRef()
    const dispatch = useDispatch()
    const currentUser = getCurrentUser()

    const upvotedUserIds = new  Set(likes)
    const hasUpvotedComment  = upvotedUserIds.has(currentUser.userUid)

    const handleCommentUpvote = () => {
        try{
            const payload = {
                options: {
                    method: "PATCH",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${currentUser.userToken}
                      `,
                    }
                },
                commentId: _id
            }
            dispatch(upvoteComment(payload))
        }
        catch(error){
            console.log(error)
        }
    }

    const handleKeyDown = (e) => {
        if(e.key === "Enter" || e.key === " "){
            handleCommentUpvote()
        }
    }

  return (
    <Button
        className={"upvote-btn"}
        handleEvent={(e) => {
            e.stopPropagation();
            handleCommentUpvote()
        }}
        keyDownEvent={(e) => handleKeyDown(e)}
        ref={buttonRef}
        text={
        <div aria-label="Upvote details">
            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 25 24" fill={hasUpvotedComment ? "#000" : "none"}>
                <path d="M7.44401 13.891H6.94401L1.38876 13.891C1.38857 13.891 1.38839 13.891 1.3882 13.891C1.20696 13.8906 1.03352 13.8459 0.88842 13.7669L0.649198 14.2059L0.888419 13.7669C0.743386 13.6878 0.637801 13.5809 0.574258 13.4666C0.511396 13.3535 0.48952 13.2337 0.504578 13.1185C0.519693 13.0028 0.573136 12.8842 0.670417 12.7785C0.670554 12.7784 0.67069 12.7782 0.670827 12.7781L11.7818 0.767929C11.7818 0.767854 11.7819 0.76778 11.782 0.767706C11.9301 0.608218 12.1932 0.5 12.5 0.5C12.8067 0.5 13.0698 0.608169 13.2179 0.767599C13.218 0.767709 13.2181 0.767818 13.2182 0.767928L24.3292 12.7781C24.3292 12.7781 24.3292 12.7781 24.3292 12.7781C24.4267 12.8839 24.4803 13.0026 24.4954 13.1185C24.5105 13.2337 24.4886 13.3535 24.4257 13.4666L24.8628 13.7095L24.4257 13.4666C24.3622 13.5809 24.2566 13.6878 24.1116 13.7669C23.9665 13.8459 23.793 13.8906 23.6118 13.891C23.6116 13.891 23.6114 13.891 23.6112 13.891L18.056 13.891H17.556V14.391V22.7989C17.556 22.9594 17.4828 23.131 17.3221 23.27C17.1591 23.4109 16.9243 23.5 16.667 23.5H8.33301C8.07566 23.5 7.84089 23.4109 7.67789 23.27C7.51717 23.131 7.44401 22.9594 7.44401 22.7989V14.391V13.891Z" stroke="black"/>
            </svg>
            {comments?.likes?.length > 0 && <span aria-label={`Total number of upvotes: ${getTotalReactionsCount(likes)}` }>{getTotalReactionsCount(likes)}</span>}
        </div>
    }
    />
  )
}

export default CommentUpvote
