import React from 'react'
import "./query-societies.css"
import { useDispatch, useSelector } from 'react-redux'
import { selectAllSociety } from '../../../../../../services/societies/reducers/societySlice'
import { getCurrentUser } from '../../../../../../libs/getCurrentUser'
import Button from '../../../../../../components/ui/Button'
import { useNavigate } from 'react-router-dom'
import EmptyQueryResult from '../emptyQueryResult/EmptyQueryResult'
import { joinSociety } from '../../../../../../services/societies/action/joinSociety'

const QuerySocieties = ({queryResults}) => {
  const allSocieties = useSelector(selectAllSociety)
  const querySocieties =  allSocieties?.filter(society => society.societyName.toLowerCase().includes(queryResults))
  
  const currentUser = getCurrentUser()
  const member = querySocieties.find(society => society.societyMembers.includes(currentUser.userUid))
  const navigate = useNavigate()
  const dispatch = useDispatch()

  if(!querySocieties.length){
    return <EmptyQueryResult emptySearchMessage={`No Societies match "${queryResults}"`} />;
  }

  if(queryResults === ""){
    return <EmptyQueryResult emptySearchMessage={"Search for Societies"} />;
  }
    
  const handleJoinSociety = (societyId) => {
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

  return (
    <section className="query-society-section">
      {querySocieties?.map(society => {
        return <ul className="query-society-list">
            <li
              key={society._id}
              className="query-society-item"
              onClick={(e) =>  {
                e.stopPropagation()
                navigate(`/societies/${society.societyName}/${society._id}`)
              }}
              onKeyDown={(e) => {
                if(e.target === "Enter" || e.key === " "){
                  navigate(`/societies/${society.societyName}/${society._id}`)
                }
              }}
            >
              <div className="query-soceity-details">
                <a className="query-soceity-img-container">
                  <img src={society?.image_url} alt={`${society?.societyName}`} />
                </a>
                <h3 className="query-society-name">{society?.societyName}</h3>
              </div>
              
              <Button 
                className={`${member ? "b" : "query-btn"}`}
                text={`${member ? "Joined" : "join"}`}
                handleEvent=
                  {member ? 
                   undefined
                    :
                    (e) => {
                    e.stopPropagation()
                    handleJoinSociety(society._id) 
                  }
                }
              />
            </li>
        </ul>
      })}
    </section>
  )
}

export default QuerySocieties
