import React from 'react'
import "./downvote.css"
import Button from '../../../../ui/Button'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentUser } from '../../../../../libs/getCurrentUser'
import { downvotePost } from '../../../../../services/post/actions/interactions/downvote'
import { getTotalReactionsCount } from '../../../../../utils/getTotalReactionsCount'

const Downvote = ({posts}) => {
    const {_id, totalDownvotes} = posts
    const dispatch = useDispatch()
    const currentUser = getCurrentUser()

    const downvotedUserIds = new Set(totalDownvotes)
    const hasDownvotedPost = downvotedUserIds.has(currentUser.userUid)

    const handleDownvote = () => {
        const options = {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${currentUser.userToken}
              `,
            },
            body: JSON.stringify({
                postId: _id,
                user: currentUser.userUid,
                society: ""
            })
        };
        dispatch(downvotePost(options))
    }

    const handleKeyDown = (e) => {
        if(e.target === "Enter" || e.target === " "){
            handleDownvote()
        }
    }
    
  return (
    <Button
        className={"downvote-btn"}
        handleEvent={(e) => {
            e.stopPropagation();
            handleDownvote()
        }}
        keyDownEvent={(e) => handleKeyDown(e)}
        text={
            <div aria-label="Downvote details">
                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 25 24" fill={hasDownvotedPost ? "#000" : "none"}>
                    <path d="M17.5557 9.59977V10.0998H18.0557H23.6114C23.7928 10.0999 23.9665 10.1444 24.1119 10.2233C24.2569 10.3019 24.3625 10.4083 24.4262 10.5222C24.5476 10.7424 24.5215 11.0018 24.3292 11.2104C24.3291 11.2105 24.329 11.2105 24.329 11.2106L13.2177 23.2097L13.2176 23.2098C13.1394 23.2943 13.0353 23.3676 12.9098 23.4198C12.7844 23.4719 12.644 23.5 12.4998 23.5C12.3556 23.5 12.2152 23.4719 12.0898 23.4198C11.9643 23.3676 11.8602 23.2943 11.7819 23.2098L11.7819 23.2097L0.670661 11.2106C0.67058 11.2106 0.670499 11.2105 0.670418 11.2104C0.573074 11.1048 0.519665 10.9864 0.50457 10.871C0.489541 10.7561 0.511364 10.6366 0.574158 10.5237C0.63764 10.4096 0.743175 10.3028 0.888235 10.2238C1.03336 10.1448 1.20685 10.1001 1.38818 10.0998C1.38836 10.0998 1.38855 10.0998 1.38873 10.0998L6.9439 10.0998H7.4439V9.59977V1.19997C7.4439 1.0399 7.5169 0.868648 7.67759 0.729821C7.84058 0.589014 8.0754 0.5 8.33287 0.5H16.6667C16.9242 0.5 17.159 0.589014 17.322 0.72982L17.6488 0.351567L17.322 0.729822C17.4827 0.868649 17.5557 1.0399 17.5557 1.19997V9.59977Z" stroke="black"/>
                </svg>
                {totalDownvotes?.length > 0 && <span aria-label={`Total number of downvotes: ${getTotalReactionsCount(totalDownvotes)}`} >{getTotalReactionsCount(totalDownvotes)}</span>}
            </div>
        }
    
    />
  )
}

export default Downvote
