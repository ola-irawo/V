import React, { useEffect, useRef, useState } from 'react'
import "./post-modal.css"
import BrandLogo from '../../brandLogo/BrandLogo'
import Button from '../Button'
import DynamicFormField from '../DynamicFormField'
import userAvatar from "./userAvatar.svg"
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentUser } from '../../../libs/getCurrentUser'
import { createPost } from '../../../services/post/actions/crud/createPost'
import useWindowWidth from '../../../hooks/useWindowWidth'
import { selectBio } from '../../../services/bio/reducers/bioSlice'
import { useLocation, useParams } from 'react-router-dom'
import { getSocietyPosts } from '../../../services/societyPost/actions/getSocietyPosts'
import { getPostError, getPostStatus, setPostError, updatePostStatus } from '../../../services/post/reducers/postSlice'

const PostModal = ({setShowPostModal, id}) => {
  const currentUser = getCurrentUser()
  const [newPostData, setNewPostData] = useState({
    post: "",
    user: currentUser.userName,
    societyId: id ? id : ""
  })
  const [textareaScrollHeight, setTextAreaPostScrollHeight] = useState(23)
  const postStatus = useSelector(getPostStatus)
  const postErrorStatus = useSelector(getPostError)
  const currentUserBio = useSelector(selectBio)

  const {screenWidth} = useWindowWidth()
  const dispatch = useDispatch()
  const location = useLocation()
  const textareRef = useRef()
  const {societyId} = useParams()

  const isMobile = screenWidth <= 767
  const userBio =  currentUserBio?.find(bio => bio?.user._id === currentUser?.userUid)

  // const fetchSocietyPosts = () => {
  //   const payload = {
  //     options : {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${currentUser.userToken}
  //         `,
  //       },
  //     },
  //     societyId
  //   }

  //   dispatch(getSocietyPosts(payload))
  // }

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
        // if(location.pathname.includes("societies")){
        //   fetchSocietyPosts()
        // }
      setShowPostModal(false)
    }
    catch(error){
      console.log(error)
    }
    finally{
      dispatch(setPostError(null))
    }
  }

  const resizeTextarea = (e) => {
    console.log(e.target.value)
    console.log(e.target.scrollHeight)
    setTextAreaPostScrollHeight(e.target.scrollHeight)
  }

  useEffect(() => {
    textareRef.current.focus()
    if(textareRef.current.value === ""){
      setTextAreaPostScrollHeight(23)
    }
   
  }, [textareaScrollHeight])

  const handleKeyDown = (e) => {
    if(e.target === "Escape"){
      setShowPostModal(false)
    }
  }

  const handleKeyDownPost = (e) => {
    if(e.target === "Enter" || e.target === " "){
      handleCreatePost(e)
    }
  }
 
  return (
    <article className="post-modal" aria-label="Post Modal">
      <form>
        { isMobile &&  <div className="post-modal-head">
            <Button 
              className={"close-post-modal"}
              handleEvent={() => setShowPostModal(false)}
              keyDownEvent={(e) => handleKeyDown(e)}
              type={"button"}
              text={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 19 16" fill="none">
                <path d="M0.292893 7.29289C-0.0976314 7.68342 -0.0976315 8.31658 0.292892 8.70711L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41421 8L8.07107 2.34314C8.46159 1.95262 8.46159 1.31946 8.07107 0.928931C7.68054 0.538407 7.04738 0.538407 6.65686 0.928931L0.292893 7.29289ZM19 7L1 7L1 9L19 9L19 7Z" fill="#263238B2" fillOpacity="0.7"/>
              </svg>}
            />

            <BrandLogo />

            <Button 
              text={"Post"} 
              className={"post-modal-btn"} 
              handleEvent={(e) => handleCreatePost(e)} 
              handleKeyDown={(e) => handleKeyDownPost(e)}
              aria-label="Create a new post"
            />
          </div>}

          {!isMobile && <div className="post-modal-head">
            <Button 
              className={"close-post-modal"}
              handleEvent={() => setShowPostModal(false)}
              keyDownEvent={(e) => handleKeyDown(e)}
              type={"button"}
              text={<svg xmlns="http://www.w3.org/2000/svg" width="19.688" height="20.49" viewBox="0 0 22 23" fill="none">
              <path d="M1 21.49L10.8439 11.245L20.6878 21.49M20.6878 1L10.842 11.245L1 1" stroke="#111111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>}
            />
          </div>}

          <div className="post-modal-form">
            <div className="profile-avatar-container">
              <img src={userBio.avatar} className="post-modal-avatar" alt={`${currentUser.userName} profile-avatar`} />
            </div>

            <div className='y'>

            <textarea
                placeholder="Write something here"
                value={newPostData.post}
                ref={textareRef}
                onChange={(e) => {
                  setNewPostData({ ...newPostData, post: e.target.value })
                  resizeTextarea(e)
                }}
                style={{
                  height: `${textareaScrollHeight}px`, 
                }}
              />

            {
              !isMobile && <Button
              text={"Post"} 
              className={"post-modal-btn"} 
              handleEvent={(e) => handleCreatePost(e)} 
              keyDownEvent={(e) => handleKeyDownPost(e)}
              ariaLabel="Create a new post"
              />
            }
          </div>
        </div>
      </form>
    </article>
  )
}

export default PostModal
