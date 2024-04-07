import React, { useEffect } from 'react'
import "./profile-avatar-selector.css"
import { useDispatch, useSelector } from 'react-redux'
import { selectAllAvatars } from '../../../services/avatar/reducers/avatarSlice'
import { getCurrentUser } from '../../../libs/getCurrentUser'
import { getAllAvatars } from '../../../services/avatar/actions/getAllAvatars'
import Button from '../Button'
import PageHeader from '../../pageHeader/PageHeader'
import useWindowWidth from '../../../hooks/useWindowWidth'

const ProfileAvatarSelector = ({ setAvatarModal, setProfileSetUp}) => {
    const allPofileAvatars = useSelector(selectAllAvatars)
    const dispatch = useDispatch()
    const currentUser = getCurrentUser()
    const {screenWidth} = useWindowWidth()

    const isMobile = screenWidth <= 767

    const getAvatars = () => {
        try{
          const options = {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${currentUser.userToken}`
            }
          }
          dispatch(getAllAvatars(options))
        }
        catch(error){
          console.log(error)
        }
      }
    
      useEffect(() => {
        getAvatars()
      }, [])

  return (
    <article className="profile-avatar-container" aria-labelledby="choose-profile-avatar"  aria-modal="true">
      <div className="profile-avatar-wrapper">
       { isMobile && <PageHeader setModal={setAvatarModal} />}

        <div className="profile-avatar-head">
            <h2 id="choose-profile-avatar">Choose Profile Avatar</h2>
            
           {!isMobile && <Button
              text={<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 30 35" fill="none">
                  <path d="M2.15967 32.7438L15.2558 17.4432L28.3519 32.7438M28.3519 2.14258L15.2533 17.4432L2.15967 2.14258" stroke="#111111" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>} 
              handleEvent={() => setAvatarModal(false)}
              ariaLabel="Click to close modal"
            />}  
        </div>

        <ul className="profile-avatar-list">
            {allPofileAvatars?.map(profileAvatar => {
                return <li 
                    key={profileAvatar._id} 
                    className="profile-avatar-item" 
                    tabIndex="0"
                    aria-label="Click to select profile avatar"
                  >
                    <img src={profileAvatar.avatar} 
                      onClick={() =>{
                        setProfileSetUp(oldData => {
                          return {
                            ...oldData,
                            avatar: profileAvatar.avatar
                          }
                        })
                        setAvatarModal(false)
                      }} 
                    alt="Profile avatar" />
                </li>
            })}
        </ul>
      </div>
    </article>
  )
}

export default ProfileAvatarSelector
