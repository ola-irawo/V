import React, { useEffect, useState } from 'react'
import "./user-post-card.css"
import profileAvatar from "./assets/svgs/profileAvatarIcon.svg"
import postMenu from "./assets/svgs/postMenuIcon.svg"
import Loader from "../loader/Loader"
import { useDispatch, useSelector } from 'react-redux'
import Upvote from './components/postInteraction/upvote/Upvote'
import Downvote from './components/postInteraction/downvote/Downvote'
import Share from './components/postInteraction/share/Share'
import UserOption from '../userOptionModal/UserOption'
import useToggle from '../../hooks/useToggle'
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom'
import Comment from './components/postInteraction/comment/Comment'
import { getCurrentUser } from '../../libs/getCurrentUser'
import useWindowWidth from '../../hooks/useWindowWidth'
import CommentTextarea from './components/postInteraction/comment/components/commentTextarea/CommentTextarea'
import { getPostFeedbackError, getPostFeedbackStatus, selectAllCommentPost, selectAllPostComment, selectAllPostComments, selectAllPostFeedback, setPostFeedbackError, updatePostFeebackStatus } from '../../services/comment/reducers/commentPostSlice'
import { selectBio } from '../../services/bio/reducers/bioSlice'
import CommentUpvote from '../../features/commentPage/commentCard/components/commentInteractions/commentUpvote/CommentUpvote'
import CommentDownvote from '../../features/commentPage/commentCard/components/commentInteractions/commentDownvote/CommentDownvote'
import CommentShare from '../../features/commentPage/commentCard/components/commentInteractions/commentShare/CommentShare'
import CommentReplies from '../../features/commentPage/commentCard/components/commentInteractions/commentReplies/CommentReplies'
import CommentActionOptions from '../commentActionOptions/CommentActionOptions'

const UserPostCard = ({posts}) => {
    const [showUserOptionsMenu, setShowUserOptionsMenu] = useToggle(false)
    const [showCommentActionOptions, setShowCommentActionOptions] = useToggle(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const {screenWidth} = useWindowWidth()
    const activeUser = getCurrentUser()
    const {id} = useParams()
    const currentUserBio = useSelector(selectBio)
    const postFeedback = useSelector(selectAllPostFeedback)
    const postFeedbackStatus = useSelector(getPostFeedbackStatus)

    const {user, post, _id, createdAt} = posts
    const isMobile = screenWidth <= 767
    const postLength = isMobile ? 300 : 500
    const userBio =  currentUserBio?.find(bio => bio?.user._id === user?._id)
    const postPage = location.pathname.split('/').slice(1)[0] === 'post';
    // const u =location.pathname.split('/')[1]

    const commentLoader = postFeedbackStatus === "loading"

    const navigateToUserProfile = (e) => {
        e.stopPropagation()
        if(user._id === activeUser.userUid && location.pathname.includes("/profile")){
            return;
        }
       navigate(`/profile/${user.username}`, {state: user._id})
    }

    const getCurrentUserAvatar = (userId) => {
        const userBio = currentUserBio?.find(bio =>  bio?.user._id === userId);
        return userBio?.avatar
    }

    return (
        <>
            <article 
                className="post-card" 
                typeof="schema:Posting"  
                tabIndex="0" 
                onClick={(e) => {
                    e.stopPropagation();
                    !postPage && navigate(`/post/${user.username}/${_id}`)}
                }
            > 
                <div className="post-wrapper">
                    <div className="post-main-content">
                        <div className="post-head">
                            <div className="user-details">
                                <a 
                                    className="user-image-container"
                                    onClick={(e) => navigateToUserProfile(e)}
                                    onKeyDown={(e) => e.key === "Enter" && navigateToUserProfile(e)}
                                    aria-label={`View profile of ${user.username}`}
                                >
                                    <img src={userBio?.avatar ? userBio?.avatar : profileAvatar} title="avatar" className="user-avatar" alt={`${user.username}'s profile avatar`}/>
                                </a>

                                <div className="name-date-container">
                                    <h3 
                                        className="user-name"
                                        onClick={navigateToUserProfile}
                                        onKeyDown={(e) => e.key === "Enter" && navigateToUserProfile()} 
                                        tabIndex="0"
                                    >
                                        {user.username}
                                    </h3>
                                    <small className="post-time">{createdAt}</small>
                                </div>
                            </div>
                            {!id &&
                            <div
                                className={`post-menu-container`} 
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setShowUserOptionsMenu()
                                }}
                                onKeyDown={(e) => {
                                    if(e.key === "Enter"){
                                        return e.key === "Enter" && setShowUserOptionsMenu()
                                    }
                                
                                }}
                                tabIndex="0"
                            >
                                <img src={postMenu} className="post-menu" alt="Post menu options icon" />
                                {showUserOptionsMenu && <UserOption user={user} postId={_id}/>}
                            </div>}
                        </div>

                        <div className="post-content-container">
                            {
                            postPage 
                            ?
                                <p className="post-content">{post}</p>
                            :
                            <p className="post-content">
                            {
                                post.length > postLength
                                ?
                                <>
                                    {post.slice(0, postLength)}
                                    {post.length > postLength && <NavLink style={{color: "blue"}}>... read more</NavLink> }
                                </>
                                :
                                post
                            }
                        </p>
                            }
                            {!postPage && post.length > postLength && <div className="read-more"  style={{height: "30%"}}></div>}
                        </div>
                    </div>
                    
                    <hr 
                        className="post-line-break"
                        style={
                            postPage ? 
                            {  width: "99.2%", margin: "0 auto", marginTop: "1rem" } 
                            : 
                            {}
                        }
                    />

                    <div className="post-interactions-container">
                        <div className="post-btn-wrapper">
                            <Upvote posts={posts} />
                            <Downvote posts={posts} />
                            <Share posts={posts}/>
                            <Comment posts={posts}/>
                        </div>
                    </div>
                </div>

                {postPage && 
                <>
                    <hr 
                        className="post-line-break"
                        style={{
                            width: "95.8%",
                            margin: "0 auto"
                        }}
                    />

                    <CommentTextarea />
                    {postPage && postFeedback.length > 0 && posts.comments?.length > 0 && <hr />}

                    <div style={{position: "relative"}}>
                        { postFeedback?.length === 0 && commentLoader && <Loader text={"Fetching comment"} isSmallLoader={true} />}

                    </div>

                    <ul className="reply-list">
                        {posts.comments?.length === 0 ? "" : postFeedback?.map(comment => {
                            return <li 
                                className="reply-list-item"
                                key={comment?._id}
                                onClick={(e) => {
                                    e.stopPropagation()
                                    navigate(`/comment/${user?.username}/${comment?._id}`)
                                }}
                            >
                                <div className="reply-wrapper">
                                    <div className="reply-profile-container">
                                        <a 
                                            className="reply-profile-avatar-container"
                                            onClick={navigateToUserProfile}
                                            onKeyDown={(e) => e.key === "Enter" && navigateToUserProfile()}
                                            aria-label={`View profile of ${comment?.user.username}`}
                                        >
                                            <img src={getCurrentUserAvatar(comment?.user._id)} title="avatar" className="reply-profile-avatar" alt={`${comment?.user.username}'s profile avatar`}/>
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
                                                            {comment?.user.username}
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
                                                    <img src={postMenu} className="reply-menu" alt="Reply menu options icon" />
                                                    {showCommentActionOptions && <CommentActionOptions user={comment.user} commentId={comment._id}/>}
                                                </div>}
                                            </div>

                                            <div className="reply-content-container">
                                                <p className="reply-content">
                                                {comment?.comment}
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
                </> }
            </article>
        </>
    )
}

export default UserPostCard
