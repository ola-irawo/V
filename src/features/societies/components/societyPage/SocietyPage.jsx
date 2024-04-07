import React, { useEffect, useState } from 'react'
import "./society-page.css"
import { useWindowWidth } from '../../../landing'
import { useDispatch, useSelector } from 'react-redux'
import {  useParams } from 'react-router-dom'
import SocietyWidget from '../societyWidget/SocietyWidget'
import PostButton from '../../../../components/postButton/PostButton'
import { getCurrentUser } from '../../../../libs/getCurrentUser'
import {  selectSocietyById } from '../../../../services/societies/reducers/societySlice'
import SocietyPost from './components/societyPost/SocietyPost'
import Button from '../../../../components/ui/Button'
import SocietyRule from './components/societyRule/SocietyRule'
import { joinSociety } from '../../../../services/societies/action/joinSociety'
import { exitSociety } from '../../../../services/societies/action/exitSociety'
import AboutSociety from './components/aboutSociety/AboutSociety'
import { getSocietyPosts } from '../../../../services/societyPost/actions/getSocietyPosts'
import { getSocietyPostErrorMessage, getSocietyPostStatus, setSocietyPostErrorMesssage, updateSocietyPostStatus } from '../../../../services/societyPost/reducers/societyPostSlice'
import Loader from '../../../../components/loader/Loader'
import NetworkError from '../../../../components/networkError/NetworkError'

const SocietyPage = () => {
  const societyPostStatus = useSelector(getSocietyPostStatus)
  const societyPostErrorMessage = useSelector(getSocietyPostErrorMessage)
  const [societyFeed, setSocietyFeed] = useState("Posts");
  const {screenWidth} = useWindowWidth()
  const currentUser = getCurrentUser()
  const dispatch = useDispatch()
  const isTab = screenWidth <= 1029
  const {societyId, societyName} = useParams()
  const [showPostModal, setShowPostModal] = useState(false)

  const currentSociety = useSelector(state => selectSocietyById(state, societyId))
  const userInSociety = currentSociety?.societyMembers.find(society => society?.includes(currentUser.userUid))

  const fetchSocietyPosts = () => {
    try{    
      const payload = {
        options : {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser.userToken}
            `,
          },
        },
        societyId
      }
      dispatch(getSocietyPosts(payload))
    }
    catch(error){
      console.log(error.message)
    }
    finally{
      dispatch(setSocietyPostErrorMesssage(null))
    }
  }

  useEffect(() => {
    fetchSocietyPosts()
  }, [societyId])

  const handleJoinSociety = () => {
    try{
      const payload = {
        options: {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser.userToken}
            `,
          },
          body: JSON.stringify({societyId, userId: currentUser.userUid})
        },
        societyId,
        userId: currentUser.userUid
      }
      dispatch(joinSociety(payload))
    }
    catch(error){
      console.log(error)
    }
  }

  if(societyPostStatus === "loading"){
    return <Loader text={"Fetching Post"} isSmallLoader={true} />
  }

  if(!navigator.onLine && societyPostErrorMessage && societyPostStatus === "failed"){
    return <NetworkError />
  }

  if(societyPostStatus === "fulfilled"){
    dispatch(updateSocietyPostStatus("idle"))
  }

  const handleExitSociety = async () => {
    try{
      const payload = {
        options: { method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.userToken}
          `,
        },
        body: JSON.stringify({societyId, userId: currentUser.userUid})
      },
      societyId,
      userId: currentUser.userUid

      }
      dispatch(exitSociety(payload))
    }
    catch(error){
      console.log(error)
    }
  }

  const handleActiveFeed = (activeFeed) => {
    setSocietyFeed(activeFeed)
  }

  const renderActiveFeed = () => {
    switch (societyFeed) {
      case "Posts":
        return <SocietyPost showPostModal={showPostModal} setShowPostModal={setShowPostModal} />;
      case "Guidelines":
        return <SocietyRule societyName={societyName} />;
      case "About":
        return <AboutSociety currentSociety={currentSociety} societyName={societyName} />;
      default:
        return "";
    }
  };
  
  const handleKeyDown = (e, activeFeed) => {
    if(e.target === "Enter" || e.target === " "){
      handleActiveFeed(activeFeed)
    }
  }
  return (
    <section className='society-page-section'>
      <div className="society-feed">
      
        <ul className="society-feed-list">
          <li style={{color: societyFeed === "Posts" && "white" }} className={`society-feed-item ${societyFeed === "Posts" && "underline"}`}>
            <Button 
              text={"Posts"} 
              handleEvent={() => handleActiveFeed("Posts")}
              keyDownEvent={(e) => handleKeyDown(e, "Posts")}
            />
          </li>
          <li className={`society-feed-item ${societyFeed === "Guidelines" && "underline"}`}>
            <Button 
              text={"Guidelines"}
              handleEvent={() => handleActiveFeed("Guidelines")} 
              keyDownEvent={(e) => handleKeyDown(e, "Guidelines")}

            />
          </li>
          <li className="society-feed-item">
            <Button 
              text={"About"} 
              handleEvent={() => handleActiveFeed("About")} 
            />
          </li>
        </ul>

       {isTab && <Button
          text={userInSociety ? "Exit" : "Join"}
          className={"join-society-btn"}
          handleEvent={() => userInSociety ? handleExitSociety() : handleJoinSociety()}
          keyDownEvent={() => userInSociety ? handleExitSociety() : handleJoinSociety()}
        />}
      </div>
      
      <h1>{societyId.societyName}</h1>
      {screenWidth <= 1029 && <h2 className="society-name">{societyId.societyName}</h2>}

      <div className="society-page-wrapper" style={{position: "relative"}}> 
        {renderActiveFeed()}

        { screenWidth >= 1030 && <SocietyWidget id={societyId} />}
      </div>
      
      { screenWidth <= 1029 && userInSociety && <PostButton id={societyId} setShowPostModal={setShowPostModal} />}
    </section>
  )
}

export default SocietyPage

