import React, { useEffect, useState } from 'react'
import "./societies-list.css"
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentUser } from '../../../../libs/getCurrentUser'
import {  getSoceityErrorMessage, getSoceityStatus, selectAllSociety, setSocietyErrorMessage, updateSocietyStatus } from '../../../../services/societies/reducers/societySlice'
import { useNavigate } from 'react-router-dom'
import { useWindowWidth } from '../../../landing'
import NetworkError from '../../../../components/networkError/NetworkError'
import Loader from '../../../../components/loader/Loader'

const SocietiesList = () => {
  const allSocieties = useSelector(selectAllSociety)
  const societyStatus = useSelector(getSoceityStatus)
  const societyErrorMessage = useSelector(getSoceityErrorMessage)
  const [filteredSocieties, setFilteredSocieties] = useState([]);

  const dispatch = useDispatch()
  const currentUser = getCurrentUser()
  const navigate = useNavigate()
  const {screenWidth} = useWindowWidth()
  const isMobile = screenWidth <= 767

  const userJoinedSocieties = allSocieties.filter(society => society.societyMembers?.includes(currentUser.userUid))

  useEffect(() => {
    const filtered = allSocieties?.filter(society =>
      userJoinedSocieties?.every(joinedSociety => joinedSociety?._id !== society?._id)
    );
    setFilteredSocieties(filtered);
  }, [allSocieties])


  const handleKeyDown = (e, society) => {
    if(e.target === "Enter" || e.target === " "){
      navigate(`/societies/${society.societyName}/${society._id}`, {state: {id: society._id}})
    }
  }

  if(societyStatus === "loading"){
    return <Loader text={"Loading societies"} />
  }

  if(!navigator.onLine && societyErrorMessage && societyStatus === "failed"){
    return <NetworkError />
  }

  if(societyStatus === "loading" || societyErrorMessage === "failed"){
    dispatch(updateSocietyStatus("idle"))
  }

  if(societyErrorMessage){
    dispatch(setSocietyErrorMessage(null))
  }

  return (
    <section className="society-container">
        <article className="societies-list-wrapper">
          {userJoinedSocieties?.length > 0 && <h2>Societies I joined</h2>}

            <ul className="societies-list">
              {userJoinedSocieties?.map(society => {
                return <li 
                  className="societies-list-item"
                  key={society?._id}
                  onClick={() => navigate(`/societies/${society?.societyName}/${society._id}`)}
                  onKeyDown={(e) => handleKeyDown(e, society)}
                  tabIndex="0"
                >
                  <div className="societies-list-image">
                      <img src={society?.image_url} alt={`${society?.societyName}`} />
                  </div>
                  <div className="societies-list-text">
                      <h3>{society?.societyName}</h3>
                      <small>{society?.societyMembers?.length}</small>
                  </div>
                </li>
              })}
            </ul>
          </article>
            
          <article className="societies-list-wrapper">
            <h2>{userJoinedSocieties?.length > 0 ? "Other societies you can join" : "Societies you can join"}</h2>

            <ul className="societies-list">
              {filteredSocieties?.map(society => {
                  return <li 
                    className="societies-list-item"
                    key={society._id}
                    onClick={() => navigate(`/societies/${society.societyName}/${society._id}`, {state: {id: society._id}})}
                    onKeyDown={(e) => handleKeyDown(e, society)}
                    tabIndex="0"
                  >
                    <div className="societies-list-image">
                        <img src={society?.image_url} alt={`${society?.societyName}`} />
                    </div>
                    <div className="societies-list-text">
                        <h3>{society?.societyName}</h3>
                        <small>{society?.societyMembers?.length}</small>
                    </div>
                  </li>
              })}
            </ul>
        </article>
    </section>
  )
}

export default SocietiesList


