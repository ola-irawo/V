import React, { useEffect } from 'react'
import "./bookmark-post.css"
import { UserPostCard, useWindowWidth } from '../../../societies'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentUser } from '../../../../libs/getCurrentUser'
import emptyBookmark from "../../assets/svgs/emptyBookmark.svg"
import {getBookmarkError, getBookmarkStatus, selectAllBookmarks, updateBookmarkStatus } from '../../../../services/post/reducers/bookmarkSlice'
import { getUserBookmarks } from '../../../../services/post/actions/interactions/getUserBookmarks'
import Loader from '../../../../components/loader/Loader'
import { setErrorStatus } from '../../../authentication/reducers/authSlice'
import NetworkError from '../../../../components/networkError/NetworkError'

const BookmarkPost = () => {
    const currentUser = getCurrentUser()
    const allUserBookmarks = useSelector(selectAllBookmarks)
    const bookmarkStatus = useSelector(getBookmarkStatus)
    const bookmarkErrorMessage = useSelector(getBookmarkError)
    const dispatch = useDispatch()
    const {screenWidth} = useWindowWidth()

    const isMobile = screenWidth <= 767

    const getAllBookmarks = () => {
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
          userUid: currentUser.userUid,
        }
        dispatch(getUserBookmarks(payload))
      }
      catch(error){
        console.log(error)
      }
      finally{
        dispatch(setErrorStatus(null))
      }
    }

    useEffect(() => {
      // if(!allUserBookmarks.length){
        getAllBookmarks()
      // }
    }, [])

    if(!navigator.onLine && bookmarkErrorMessage && bookmarkStatus === "failed"){
      return <NetworkError />
    }

    if(bookmarkStatus === "loading"){
      return <Loader text={"Getting bookmark"} isSmallLoader={true} />
    }

    if(!allUserBookmarks.length){
      return(
        <section className="empty-section">
          <div className="empty-bookmark-container">
            <img src={emptyBookmark} alt='empty bookmark image' />
            <h2>You have no bookmark... Yet!</h2>
          </div>
        </section>
      )
    }

    if(bookmarkStatus === "fulfilled" || bookmarkStatus === "failed"){
      dispatch(updateBookmarkStatus("idle"))
    }

  return (
    <section className="bookmark-section" id="bookmark">
      {allUserBookmarks.map(post => {
        return <UserPostCard key={post._id} posts={post} />
      })}
    </section>
  )
}

export default BookmarkPost
