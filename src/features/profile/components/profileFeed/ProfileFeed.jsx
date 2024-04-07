import React, { useEffect, useState } from 'react'
import "./profile-feed.css"
import Button from '../../../../components/ui/Button'
import { useLocation, useParams } from 'react-router-dom'
import PostFeed from './components/postFeed/PostFeed'
import Comment from './components/commentFeed/Comment'
import Upvote from './components/upvoteFeed/Upvote'
import Downvote from './components/downvoteFeed/Downvote'

const ProfileFeed = () => {
  const [activeFeed, setActiveFeed] = useState(() => {
    return localStorage.getItem('activeFeed') || 'Posts';
  });
  
  const location = useLocation()
  const userId = location.state

  const profileOptions = [
    {label: `Pin to profile`, action: () => console.log("link")},
    {label: `Delete Post`, action:  () =>  console.log("link")},
    {label: `Edit post`, action:  () =>  console.log("mute")},
    {label: `Change who can reply`, action: () =>  console.log("block")},
  ]

  // const postsByUser = () => {
  //   try{

  //     const payload = {
  //       options: {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${currentUser.userToken}
  //           `,
  //         },
  //       },
  //       _id: profileId ? profileId : currentUser.userUid

  //     }

  //     dispatch(getPostsByUser(payload))

  //   }

  //   catch(error){
  //     console.log(error)
  //   }
  // // }

  // useEffect(() => {
  //   postsByUser()
  // }, [dispatch, profileId])

    const handleActiveFeed = (activeFeed) => {
      setActiveFeed(activeFeed)
    }

    const renderActiveFeed = () => {
      switch(activeFeed){
        case "Posts":
          return <PostFeed profileOptions={profileOptions}  userId={userId} />
        case "Comments":
          return <Comment profileOptions={profileOptions} userId={userId} />
        case "Upvotes":
          return <Upvote profileOptions={profileOptions}  userId={userId} />
        case "Downvotes":
          return <Downvote profileOptions={profileOptions}  userId={userId} />
        default:
          return "Posts"
      }
    }

    useEffect(() => {
      localStorage.setItem('activeFeed', activeFeed);
    }, [activeFeed]);

  return (
    <section className="profile-feed">        
      <div className="profile-engagement-container">
        <div>
          <ul className="profile-engagement-list">
            <li className="engagement-item">
              <Button text={"Posts"} className={activeFeed === "Posts" && "active-feed"} handleEvent={() => handleActiveFeed("Posts")} />
            </li>
            <li className="engagement-item">
              <Button text={"Comments"}  className={activeFeed === "Comments" && "active-feed"} handleEvent={() => handleActiveFeed("Comments")} />
            </li>
            <li className="engagement-item" >
              <Button text={"Upvotes"}  className={activeFeed === "Upvotes" && "active-feed"} handleEvent={() => handleActiveFeed("Upvotes")} />
            </li>
            <li className="engagement-item">
              <Button text={"Downvotes"}  className={activeFeed === "Downvotes" && "active-feed"} handleEvent={() => handleActiveFeed("Downvotes")} />
            </li>
          </ul>
         </div>

          <hr className="profile-feed-line-break" />

      </div>


      <div className="render-active-feed-container">
        {renderActiveFeed()}

      </div>
    </section>
  )
}

export default ProfileFeed
