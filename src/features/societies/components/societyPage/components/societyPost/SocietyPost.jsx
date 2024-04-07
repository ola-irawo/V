import React from 'react'
import UserPostCard from '../../../../../../components/postCards/UserPostCard'
import {  useSelector } from 'react-redux'
import { selectSocietyPosts } from '../../../../../../services/societyPost/reducers/societyPostSlice'
import { useParams } from 'react-router-dom'
import PostModal from '../../../../../../components/ui/postModal/PostModal'

const SocietyPost = ({showPostModal, setShowPostModal}) => {
    const allSocietyPosts = useSelector(selectSocietyPosts)
    const {societyId} = useParams()

  return (
    <>
      {<article className='society-page-article' style={{position: "relative"}}>
        {allSocietyPosts?.map(society => {
          return <UserPostCard key={society._id} posts={society} />
        })}

        { showPostModal && <PostModal setShowPostModal={setShowPostModal} id={societyId}  />}
      </article>}
    </>
  )
}

export default SocietyPost
