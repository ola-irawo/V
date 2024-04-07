import React, { useEffect } from 'react'
import "./comment-card.css"
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from '../../../libs/getCurrentUser';
import useToggle from '../../../hooks/useToggle';
import CommentUpvote from './components/commentInteractions/commentUpvote/CommentUpvote';
import CommentDownvote from './components/commentInteractions/commentDownvote/CommentDownvote';
import CommentShare from './components/commentInteractions/commentShare/CommentShare';
import CommentReplies from './components/commentInteractions/commentReplies/CommentReplies';
import options from "./options.svg"
import profileImg from "./profileImg.svg"
import { selectBio } from '../../../services/bio/reducers/bioSlice';
import CommentActionOptions from '../../../components/commentActionOptions/CommentActionOptions';

const CommentCard = ({comments}) => {
    const [showCommentActionOptions, setShowCommentActionOptions] = useToggle(false)
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()
    const {commentId} = useParams()
    const currentUser = getCurrentUser()
    const currentUserBio = useSelector(selectBio)

    const {replies, user } = comments

    const navigateToUserProfile = (e) => {
        e.stopPropagation()
        if(user._id === currentUser.userUid && location.pathname.includes("/profile")){
            return;
        }
       navigate(`/profile/${user.username}`, {state: user._id})
    }
    
    const getCurrentUserAvatar = (userId) => {
        const userBio = currentUserBio?.find(bio =>  bio?.user._id === userId);
        return userBio?.avatar
    }
    
  return (
    <article >
        {
            replies &&  
            <ul 
                className="reply-list"
            >
                {replies?.map(comment => {
                    return <li 
                        className="reply-list-item"
                        key={comment._id}
                        onClick={(e) => {
                            e.stopPropagation()
                            navigate(`/comment/${comment.user.username}/${comment._id}`)
                        }}
                    >
                        <div className="reply-wrapper">
                            <div className="reply-profile-container">
                                <a 
                                    className="reply-profile-avatar-container"
                                    onClick={(e) => navigateToUserProfile(e)}
                                    onKeyDown={(e) => e.key === "Enter" && navigateToUserProfile()}
                                    aria-label={`View profile of ${comment.user.username}`}
                                >
                                    <img src={getCurrentUserAvatar(comment.user._id)} title="profile avatar" className="reply-profile-avatar" alt={`${comment.user.username}'s profile avatar`}/>
                                </a>
                                <div className="reply-line"></div>
                            </div>

                            <div className="mc">

                                <div className="reply-main-content">
                                    <div className="reply-head">
                                            <div className="reply-name-date-container">
                                                <h3 
                                                    className="reply-user-name"
                                                    onClick={navigateToUserProfile}
                                                    onKeyDown={(e) => e.key === "Enter" && navigateToUserProfile()} 
                                                    tabIndex="0"
                                                >
                                                    {comment.user.username}
                                                </h3>
                                                <small className="reply-time">{comment.createdAt}</small>
                                            </div>
                                        {
                                        <div
                                            className={`reply-menu-container`} 
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
                                            <img src={options} className="reply-menu" alt="Reply menu options icon" />
                                            {showCommentActionOptions && <CommentActionOptions user={comment.user} commentId={comment._id}/>}
                                        </div>}
                                    </div>

                                    <div className="reply-content-container">
                                        <p className="reply-content">
                                        {comment.comment}
                                        </p>
                                    </div>
                                </div>

                                <div className="reply-interactions-container">
                                    <div className="reply-btn-wrapper">
                                        <CommentUpvote comments={comment} />
                                        <CommentDownvote comments={comment} />
                                        <CommentShare comments={comment}/>
                                        <CommentReplies comments={comment}/>
                                    </div>
                                </div>

                            </div>
                            
                        </div>
                    </li>
                })}
            </ul>
        }


    </article>
  )
}

export default CommentCard
