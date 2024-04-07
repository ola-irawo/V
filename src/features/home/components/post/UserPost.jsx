import React, { useEffect, useState } from 'react'
import "./user-post.css"
import UserPostCard from '../../../../components/postCards/UserPostCard'
import { useDispatch, useSelector } from 'react-redux'
import {getPostError, getPostStatus, selectAllPosts, updatePostStatus } from '../../../../services/post/reducers/postSlice'
import PostButton from '../../../../components/postButton/PostButton'
import PostModal from '../../../../components/ui/postModal/PostModal'
import { useWindowWidth } from '../../../authentication'
import Loader from '../../../../components/loader/Loader'
import NetworkError from '../../../../components/networkError/NetworkError'

const UserPost = () => {
  const [showPostModal, setShowPostModal] = useState(false)
  const allPosts = useSelector(selectAllPosts)
  const postStatus = useSelector(getPostStatus)
  const postErrorStatus = useSelector(getPostError)
  const dispatch = useDispatch()

  const {screenWidth} = useWindowWidth()
  const isDesktop = screenWidth <= 1029

  if(postStatus === "loading"){
    return <Loader text={"Fetching data"} />
  }

  if(postStatus === "fulfilled" || postStatus === "failed"){
    dispatch(updatePostStatus("idle"))
  }

  if(!navigator.onLine && postErrorStatus && postStatus === "failed"){
    return <NetworkError />
  }
  
  return (
    <section className="post-section">
      {allPosts.map(post => {
        return <UserPostCard key={post._id} posts={post}/>
      })}
      {showPostModal && <PostModal setShowPostModal={setShowPostModal} />}
      {isDesktop && !showPostModal && <PostButton setShowPostModal={setShowPostModal} />}
    </section>
  )
}

export default UserPost
