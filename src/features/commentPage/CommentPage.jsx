import React, { useEffect } from 'react'
import "./comment-page.css"
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { getReplies } from '../../services/comment/reducers/commentSlice'
import { getRepliesByCommentId } from '../../services/comment/actions/crud/getRepliesByCommentId'
import { getCurrentUser } from '../../libs/getCurrentUser'
import CommentCard from './commentCard/CommentCard'
import CommentTextarea from '../../components/postCards/components/postInteraction/comment/components/commentTextarea/CommentTextarea'
import CommentUpvote from './commentCard/components/commentInteractions/commentUpvote/CommentUpvote'
import CommentDownvote from './commentCard/components/commentInteractions/commentDownvote/CommentDownvote'
import CommentShare from './commentCard/components/commentInteractions/commentShare/CommentShare'
import CommentReplies from './commentCard/components/commentInteractions/commentReplies/CommentReplies'
import UserOption from '../../components/userOptionModal/UserOption'
import useToggle from '../../hooks/useToggle'
import { selectBio } from '../../services/bio/reducers/bioSlice'
import options from "./commentCard/options.svg"
import PageHeader from '../../components/pageHeader/PageHeader'
import { useWindowWidth } from '../authentication'
import CommentActionOptions from '../../components/commentActionOptions/CommentActionOptions'
import { selectAllCommentReplies, selectCommentRepliesById } from '../../services/comment/reducers/commentRepliesSlice'

const CommentPage = () => {
  const [showCommentActionOptions, setShowCommentActionOptions] = useToggle(false)
    const currentUserBio = useSelector(selectBio)
    const commentReplies = useSelector(selectAllCommentReplies)
    const {commentId} = useParams()
    const commentRepliesData = useSelector(state => selectCommentRepliesById(state, commentId))

    const dispatch = useDispatch()
    const currentUser = getCurrentUser()
    const navigate = useNavigate()
    const location = useLocation()

    const getCurrentUserAvatar = (userId) => {
        const userBio = currentUserBio?.find(bio =>  bio?.user._id === userId);
        return userBio?.avatar
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
            commentId: commentId
          }
          dispatch(getRepliesByCommentId(payload))
        }
        catch(error){
          console.log(error)
        }
    }

    useEffect(() => {
        getRepliesByComment()
    }, [commentId, dispatch, commentRepliesData?.likes, commentRepliesData?.unlikes, commentRepliesData?.shares])

    const navigateToUserProfile = () => {
      if(commentRepliesData?.user._id === currentUser?.userUid && location.pathname.includes("/profile")){
        return;
      }
     navigate(`/profile/${commentRepliesData?.user.username}`)
    }

    console.log(commentReplies)
    
  return (
    <section className="comment-page">
    {commentReplies.map(comment => <article 
        className="comment-card" typeof="schema:Posting" tabIndex="0" 
    > 
        <div className="post-wrapper">
            <div className="comment-main-content">
                <div className="comment-head">
                    <div className="user-details">
                        <a 
                            className="user-image-container"
                            onClick={navigateToUserProfile}
                            onKeyDown={(e) => e.key === "Enter" && navigateToUserProfile()}
                            aria-label={`View profile of ${comment.user?.username}`}
                        >
                            <img src={getCurrentUserAvatar(comment.user?._id)} title="avatar" className="user-avatar" alt={`${comment.user?.username}'s profile avatar`}/>
                        </a>

                        <div className="name-date-container">
                            <h3 
                                className="user-name"
                                onClick={navigateToUserProfile}
                                onKeyDown={(e) => e.key === "Enter" && navigateToUserProfile()} 
                                tabIndex="0"
                            >
                                {comment.user?.username}
                            </h3>
                            <small className="post-time">{comment.createdAt}</small>
                        </div>
                    </div>
                    {
                    <div
                        className={`comment-menu-container`} 
                        onClick={(e) => {
                            e.stopPropagation()
                            setShowCommentActionOptions()
                        }}
                        onKeyDown={(e) => {
                            if(e.key === "Enter"){
                                return e.key === "Enter" && setShowCommentActionOptions()
                            }
                           
                        }}
                        tabIndex="0"
                    >
                        <img src={options} className="comment-menu" alt="Comment menu options icon" />
                        {showCommentActionOptions && <CommentActionOptions user={comment.user} commentId={comment._id}/>}
                    </div>}
                </div>

                <div className="comment-content-container">
                    <p className="comment-content">
                        {comment.comment}
                    </p>
                </div>
            </div>

            <hr 
                className="comment-line-break"
                style={
                    location.pathname.includes("comment") ? 
                    {  width: "99.2%", margin: "0 auto" } 
                    : 
                    {}
                }

            />

            <div className="comment-interactions-container">
                <div className="comment-btn-wrapper">
                    <CommentUpvote comments={comment} />
                    <CommentDownvote comments={comment} />
                    <CommentShare comments={comment}/>
                    <CommentReplies comments={comment}/>
                </div>
            </div>
        </div>

        { location.pathname.includes("comment") && 
          <>
            <hr 
                className="comment-line-break"
                style={{
                    width: "95.8%",
                    margin: "0 auto"
                }}
            />

            <CommentTextarea postId={comment.post} />
          </>
        }

        { location.pathname.includes("comment") && comment.replies?.length > 0 && <hr />}

        <CommentCard comments={comment} />
      </article>) }
    </section>
  )
}

export default CommentPage
