import React from 'react'
import "./profile-widget.css"
import { useSelector } from 'react-redux'
import { selectAllSociety } from '../../../../services/societies/reducers/societySlice'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser } from '../../../../libs/getCurrentUser'

const ProfileWidget = () => {
  const allSocieties = useSelector(selectAllSociety)
  const navigate = useNavigate()
  const currentUser = getCurrentUser()

  const userJoinedSocieties = allSocieties.filter(society => society.societyMembers.includes(currentUser.userUid))

  return (
    <aside className="profile-widget">
      <div className="joined-societies-wrapper">
        <h3>Societies Joined</h3>

        <ul className="joined-societies-list">
          {userJoinedSocieties.map(society => {
            return <li 
              className="society-item" 
              key={society._id}
              onClick={() => navigate(`/societies/${society.societyName}/${society._id}`)}
            >
                <div>
                    <img src={society?.image_url} alt="society" />
                </div>

                <h4>{society.societyName}</h4>
            </li>
          })}
        </ul>
      </div>
    </aside>
  )
}

export default ProfileWidget
