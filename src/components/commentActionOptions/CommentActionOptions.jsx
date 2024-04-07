import React from 'react'
import "./comment-action-options.css"
import { useDispatch } from 'react-redux'
import { getCurrentUser } from '../../libs/getCurrentUser'
import useWindowWidth from '../../hooks/useWindowWidth'
import { useLocation } from 'react-router-dom'
import { deleteComment } from '../../services/comment/actions/interactions/deleteComment'
import Button from '../ui/Button'

const CommentActionOptions = ({user, commentId}) => {

    const dispatch = useDispatch()
    const currentUser = getCurrentUser()
    const {screenWidth} = useWindowWidth()
    const { pathname } = useLocation()
    const { _id, username} = user

    const sameUser = currentUser.userUid === _id
    console.log(sameUser, user)

    const options = [
        {label: `Copy Link`, action: () => {
            const commentUrl = `comment/${username}/${commentId}`
            navigator.clipboard.writeText(commentUrl)
        }},
        sameUser && {
            label: `Delete Post`, 
            action: () => {
                const payload = {
                    options: {
                      method: "DELETE",
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${currentUser.userToken}`,
                      },
                    },
                    commentId
                }
                console.log("delete comment")
                dispatch(deleteComment(payload))  
            }
        }
    ]

    const handleCommentAction = (option) => {
        switch (option.label){
            case "Copy Link":
                
                option.action()
                break;
            case `Delete Post`:
                option.action()
                break
            case `Report`:
                console.log("report comment")
                break
            default:
                break;
        }
    }
    
  return (
    <aside className={`comment-action-container ${screenWidth >= 768 && "screen"}`}>
      <div className="comment-action-container">
        <ul className="comment-action-list">
            {
                options.map((option, index) => {
                    return <li
                        key={index}
                        onClick={() => handleCommentAction(option)}
                    >
                        <Button 
                            text={
                                option?.label
                            }
                        />
                    </li>
                })
            }
        </ul>
      </div>
    </aside>
  )
}

export default CommentActionOptions
