import React from 'react'
import "./query-users.css"
import { useSelector } from 'react-redux'
import { selectAllUser } from '../../../../../../services/user/reducers/userSlice'
import { useNavigate } from 'react-router-dom'
import EmptyQueryResult from '../emptyQueryResult/EmptyQueryResult'
import { selectBio } from '../../../../../../services/bio/reducers/bioSlice'

const QueryUsers = ({queryResults}) => {
  const allUsers = useSelector(selectAllUser)
  const currentUserBio = useSelector(selectBio)
  const queryUser = allUsers?.filter(user => user.username.toLowerCase().includes(queryResults))
  const navigate = useNavigate()

  const getQueryUserAvatar = (userId) => {
    const userBio = currentUserBio?.find(bio =>  bio?.user._id === userId);
    return userBio?.avatar
  }

  if(!queryUser?.length){
    return <EmptyQueryResult  emptySearchMessage={`No Users  match "${queryResults}"`}/>
  }

  if(queryResults === ""){
    return <EmptyQueryResult emptySearchMessage={"Search for Users"} />
  }

  return (
    <section className="query-user-section">
      {queryUser?.map(user => {
        return <ul className="query-user-list">
            <li 
              className="query-user-item"
              onClick={() => navigate(`/profile/${user.username}`)}
              onKeyDown={(e) => {
                if(e.target === "Enter" || e.key === " "){
                  navigate(`/profile/${user.username}`)
                }
              }}
            >
              <a className="query-user-details">
                <div className="query-user-img-container">
                  <img src={getQueryUserAvatar(user?._id)} alt={`${user.username} profile avatar`} />
                </div>

                <div className="query-username-container">
                  <h3 className="query-user-name">{user.username}</h3>
                  <small className="query-user-handle">@{user.username}</small>
                </div>
              </a>
            </li>

            {/* <Button 
              className={`${member ? "b" : "query-btn"}`}
              text={`${member ? "Joined" : "join"}`}
            /> */}
        </ul>
      })}
    </section>
  )
}

export default QueryUsers
