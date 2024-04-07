import React, { useState } from 'react'
import "./post-input.css"
import DynamicFormField from '../ui/DynamicFormField'
import userImage from "./userImg.svg"
import Button from '../ui/Button'
import { useDispatch } from 'react-redux'
import { getCurrentUser } from '../../libs/getCurrentUser'
import { createPost } from '../../services/post/actions/crud/createPost'

const PostInput = () => {
    const [newPostData, setNewPostData] = useState({
        post: "",
        user: "Irawo",
      })
      const currentUser = getCurrentUser()
      const dispatch = useDispatch()

    const handleCreatePost = async (e) => {
        e.preventDefault()
        try{
          const options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${currentUser.userToken}
              `,
            },
            body: JSON.stringify(newPostData)
          }
    
           dispatch(createPost(options))
        }
        catch(error){
          console.log(error)
        }
      }
      

  return (
    <div className="post-input-container">
        <div className="post-input-wrapper">

        <div className="post-input-img-container">
            <img src={userImage} className="post-input-img" alt="" />
        </div>

      <form onSubmit={handleCreatePost} className="post-input-form">

        <DynamicFormField 
            placeholder={"Write something"} 
            value={newPostData.post}
            type={"textarea"}
            className={"post-input-textarea"}
            onChange={(e) => {
                setNewPostData(oldValue => {
                    return {
                        ...oldValue,
                        post: e.target.value
                    }
                })
            }}
        />

        {/* <div> */}
            <div className="post-input-form-line"></div>

            <Button text={"Send"} className={"post-input-btn"}/>
        {/* </div> */}

      </form>
      </div>

    </div>
  )
}

export default PostInput
