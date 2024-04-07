import React from 'react'
import societyImg from "./assets/images/society.png"
import "./join-society.css"
import { useDispatch, useSelector } from 'react-redux'
import { getSoceityStatus, selectAllSociety } from '../../../../../../services/societies/reducers/societySlice'
import { useWindowWidth } from '../../../../../landing'
import { getCurrentUser } from '../../../../../../libs/getCurrentUser'
import { joinSociety } from '../../../../../../services/societies/action/joinSociety'
import Button from '../../../../../../components/ui/Button'

const JoinSociety = ({handleNextStep}) => {
  const allSociety = useSelector(selectAllSociety)
  const societyStatus = useSelector(getSoceityStatus)
  const dispatch = useDispatch()
  const {screenWidth} = useWindowWidth()
  const currentUser = getCurrentUser()

  const joinASociety = (societyId) => {
    try{
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.userToken}
          `,
        },
        body: JSON.stringify({societyId, userId: currentUser.userUid})
      }
      console.log("joinning")
      dispatch(joinSociety(options))
    }
    catch(error){
      console.log(error)
    }
    finally{
      societyStatus = "idle"
    }
  }

  return (
    <article className="society-article">
      <div className="society-header">
        <div className="society-image-container">
          <img src={societyImg} className="society-image" alt="society" />
        </div>

        <div className="society-text-container">
          <h2>Join a Society</h2>
          <p>Select a society you’d like to join.</p>
        </div>
      </div>

      <div className="society-support-container">
        {
          allSociety.map(society => {
            return <div className="society-support" key={society._id}>
                <div className="support-image-container">
                  <img src={society.image_url} className="support-image" alt="society" />
                </div>

                <div className="support-info-container" onClick={() => joinASociety(society._id)}>
                  <h3>{society.societyName}</h3>
                  <p>{society?.societyMembers?.length}</p>
                </div>
            </div>
          })
        }
      </div>

      <div className="next-onboarding-step">
        <Button text={"Continue"} handleEvent={handleNextStep} />
      </div>
    </article>
  )
}

export default JoinSociety
