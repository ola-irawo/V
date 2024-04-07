import React from 'react'
import Button from '../../../../../components/ui/Button'
import { cross } from '../../..'

const FaqList = ({question, answer}) => {
  return (
    <li className='faq-list-item'>
      <div className="faq-question-container">
        <h3 className="faq-question">{question}</h3>
        <Button className={"toggle-faq-answer"} text={<img src={cross} alt="cross"/>} />
      </div>
      {false && <p className="faq-answer">{answer}</p>}
    </li>
  )
}

export default FaqList
