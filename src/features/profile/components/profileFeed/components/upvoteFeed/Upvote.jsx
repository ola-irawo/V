import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentUser } from '../../../../../../libs/getCurrentUser'
import { UserPostCard } from '../../../../../societies'
import { getPostUserUpvoted } from '../../../../../../services/post/actions/interactions/getPostUserUpvoted'
import { selectAllUpvotedPosts } from '../../../../../../services/post/reducers/upvoteSlice'

const Upvote = ({profileOptions, userId}) => {
  const userUpvotedPosts = useSelector(selectAllUpvotedPosts)
  const dispatch = useDispatch()
  const currentUser = getCurrentUser()
 
  const upvotedPostsByUser = () => {
    const payload = {
      options: {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.userToken}
          `,
        },
      },
      userUid: userId ? userId : currentUser.userUid
    }

    dispatch(getPostUserUpvoted(payload))
  }

  useEffect(() => {
    upvotedPostsByUser()
  }, [dispatch, userId])

  return (
    <article className="upvote-feed">
      {userUpvotedPosts.map(post => {
          return <UserPostCard options={profileOptions} key={post._id} posts={post} />
      })}
    </article>
  )
}

export default Upvote
