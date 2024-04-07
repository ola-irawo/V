import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAllPosts } from '../../../../../../services/post/reducers/postSlice'
import { getCurrentUser } from '../../../../../../libs/getCurrentUser'
import { getPostsByUser } from '../../../../../../services/user/actions/getPostsByUser'
import { UserPostCard } from '../../../../../societies'

const PostFeed = ({profileOptions, userId}) => {
  const allPosts = useSelector(selectAllPosts)
  const dispatch = useDispatch()
  const currentUser = getCurrentUser()

  const userPost = allPosts.filter(post => userId ? post.user._id === userId :  post.user._id === currentUser.userUid)
  const postsByUser = () => {
      try{
  
        const payload = {
          options: {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${currentUser.userToken}
              `,
            },
          },
          _id: userId ? userId : currentUser.userUid
  
        }
  
        dispatch(getPostsByUser(payload))
      }
  
      catch(error){
        console.log(error)
      }
  }

  // useEffect(() => {
  //     postsByUser()
  // }, [dispatch, userId])

  return (
    <article className="post-feed">
      {userPost.map(post => {
        return <UserPostCard options={profileOptions} key={post._id} posts={post} />
      })}
    </article>
  )
}

export default PostFeed
