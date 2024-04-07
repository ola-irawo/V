import React from 'react'
import "./confidante.css"
import DynamicDecisionPrompter from '../../../../../../components/dynamicDecisionPrompt/DynamicDecisionPrompter'

const Confidante = () => {
    const promptMessage ="Do you want to become a Confidante?"
    const template = {
      confirmedBtnText: "Yes",
      deniedBtnText: "No"

    }
  return (
    <article className="confidante-article">
      <div className="confidante-container">
        {/* <DynamicDecisionPrompter template={template} promptMessage={promptMessage} className={"confidante-form"}/> */}
      </div>
    </article>
  )
}

export default Confidante
