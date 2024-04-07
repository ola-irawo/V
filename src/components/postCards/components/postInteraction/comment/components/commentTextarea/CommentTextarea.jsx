import React, { useEffect, useRef, useState } from 'react'
import "./comment-textarea.css"
import DynamicFormField from '../../../../../../ui/DynamicFormField'
import Button from '../../../../../../ui/Button'
import profileImg from "./profileImg.svg"
import { createComment } from '../../../../../../../services/comment/actions/crud/createComment'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import { getCurrentUser } from '../../../../../../../libs/getCurrentUser'
import { API_URL } from '../../../../../../../services/api'
import { selectBio } from '../../../../../../../services/bio/reducers/bioSlice'
import { getAllCommentsByPostId } from '../../../../../../../services/comment/actions/crud/getAllCommentsByPostId'
import { getRepliesByCommentId } from '../../../../../../../services/comment/actions/crud/getRepliesByCommentId'

const CommentTextarea = ({postId}) => {
    const [isReply, setIsReply] = useState(false)
    const [comment, setComment] = useState("")
    const [textareaScrollHeight, setTextAreaPostScrollHeight] = useState(23)
    const currentUserBio = useSelector(selectBio)

    const dispatch = useDispatch()
    const location = useLocation()
    const commentRef = useRef()
    const currentUser = getCurrentUser()
    const params = useParams();

    const userBio =  currentUserBio?.find(bio => bio?.user?._id === currentUser?.userUid)

    const id = location.pathname.includes("post")
        ? params?.postId
        :
        params?.commentId
    const parentCommentId =  params?.commentId

    const resizeTextarea = (e) => {
        setTextAreaPostScrollHeight(commentRef.current.scrollHeight)
        setTextAreaPostScrollHeight(e.target.scrollHeight)
    }

    // console.log(params.postId ? id : postId)
    // console.log(id)

    useEffect(() => {
        commentRef.current.focus()
        if( comment === ""){
            setTextAreaPostScrollHeight(23)
        }
      }, [textareaScrollHeight, comment])

      const getAllPostComments = () => {
            try{
                const payload = {
                    options: {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${currentUser.userToken}`
                    }
                    },
                    postId: id
                }
        
                dispatch(getAllCommentsByPostId(payload))
            }
            catch(error){
                console.log(error)
            }
        }

        const getRepliesByComment = () => {
            try{
              const payload = {
                options: {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${currentUser?.userToken}`
                  }
                },
                commentId: id
              }
      
              dispatch(getRepliesByCommentId(payload))
            }
            catch(error){
              console.log(error)
            }
        }

      const postComment = (e) => {
        e.preventDefault()
        try{
          const payload = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${currentUser.userToken}`
            },
            body: JSON.stringify({comment, postId: params.postId ? id : postId, ...(params?.commentId && {parentCommentId} )})
          }
          
          dispatch(createComment(payload))
          if(location.pathname.includes("post")){
            getAllPostComments()
          }
          if(location.pathname.includes("comment")){
            getRepliesByComment()
          }
          setComment("")
        }
        catch(error){
          console.log(error)
        }
      }

      return (
        <form 
            className="comment-form"
            onSubmit={postComment}
        >
            <div className="avatar-textarea-container">
                <div className="comment-profile-avatar-container">
                    <img src={userBio?.avatar} className="comment-profile-avatar" alt="Profile avatar" />
                </div>

                <div className="new">
                    <DynamicFormField
                        name={"comment"}
                        value={comment}
                        type={"textarea"}
                        ref={commentRef}
                        placeholder={"Post your thoughts"}
                        className={"comment-form-textarea"}
                        onChange={(e) => {
                            setComment(e.target.value)
                            resizeTextarea(e)
                        }}
                        style={{
                            height: `${textareaScrollHeight}px`, 
                            backgroundColor: "red,"
                        }}
                    />

                    <div 
                        className="comment-form-btn-container"
                        style={{gridTemplateColumns: comment && "1fr 1fr"}}
                    >
                    { comment && <Button
                            text={"Cancel"}
                            type={"button"}
                            className={"comment-cancel-btn"}
                            handleEvent={() => {
                                setComment("")
                            }}
                        />}

                        <Button
                            text={"Post"}
                            className={"comment-form-btn"}
                        />   
                    </div>
                </div>
            
            </div>
        
        </form>
    )
}

export default CommentTextarea
