import React, { useEffect } from 'react'
import { getDownvotePosts, selectAllPosts } from '../../../../../../services/post/reducers/postSlice'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentUser } from '../../../../../../libs/getCurrentUser'
import { UserPostCard } from '../../../../../societies'
import { getPostsUserDownvoted } from '../../../../../../services/post/actions/interactions/getPostsUserDownvoted'
import { selectDownvotedPost } from '../../../../../../services/post/reducers/downvoteSlice'

const Downvote = ({profileOptions, userId}) => {
  const userDownvotedPosts = useSelector(selectDownvotedPost)
  const dispatch = useDispatch()
  const currentUser = getCurrentUser()

  const downvotedPostByUser = () => {
    const payload = {
      options: {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.userToken}`,
        },
      },
      userUid: userId ? userId : currentUser.userUid

    }

    dispatch(getPostsUserDownvoted(payload))
  }

  useEffect(() => {
    downvotedPostByUser()
  }, [dispatch, userId])

  return (
    <article className="downvote-feed">
      {userDownvotedPosts.map(post => {
          return <UserPostCard options={profileOptions} key={post._id} posts={post} />
      })}
    </article>
  )
}

export default Downvote
