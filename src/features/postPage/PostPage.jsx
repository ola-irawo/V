import React, { useEffect, useState } from 'react'
import "./post-page.css"
import { useParams } from 'react-router-dom'
import UserPostCard from '../../components/postCards/UserPostCard'
import { useDispatch, useSelector } from 'react-redux'
import { selectPostById } from '../../services/post/reducers/postSlice'
import { getCurrentUser } from '../../libs/getCurrentUser'
import { getAllCommentsByPostId } from '../../services/comment/actions/crud/getAllCommentsByPostId'
import EmptyQueryResult from '../query/components/renderQueryPage/components/emptyQueryResult/EmptyQueryResult'
import { useWindowWidth } from '../authentication'
import PageHeader from '../../components/pageHeader/PageHeader'
import { getPostFeedbackError, getPostFeedbackStatus, selectAllPostFeedback, setPostFeedbackError, updatePostFeebackStatus } from '../../services/comment/reducers/commentPostSlice'

const PostPage = () => {
  const {postId} = useParams()
  const post = useSelector(state => selectPostById(state, postId))
  const postFeedback = useSelector(selectAllPostFeedback)
  const postFeedbackStatus = useSelector(getPostFeedbackStatus)
  const postFeedbackError = useSelector(getPostFeedbackError)
  const dispatch = useDispatch()
  const currentUser = getCurrentUser()
  const {screenWidth} = useWindowWidth()

  const isMobile = screenWidth <= 767

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
        postId
      }

      dispatch(getAllCommentsByPostId(payload))
    }
    catch(error){
      console.log(error)
    }
    finally{
      dispatch(setPostFeedbackError(null))
    }
  }

  useEffect(() => {
    if(post?.comments.length > 0){
      getAllPostComments()
    }
  }, [postId, post])

  if( postFeedbackError && postFeedbackStatus === "failed"){
    alert(postFeedbackError) // For the error, Emma needs to return the comment
    dispatch(updatePostFeebackStatus("idle"))
  }

  if(!post){
    return <>
      {isMobile && <PageHeader />}
      <EmptyQueryResult emptySearchMessage={"Error! Couldn't find the page you're looking for."} />
    </>
  }

  return (
    <section className="post-page-section">
      <UserPostCard posts={post} />
    </section>
  )
}

export default PostPage
