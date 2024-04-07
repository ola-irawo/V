import React from 'react'
import Form from '../Form'

const DynamicDecisionPrompter = ({promptMessage, template, onSubmit, onCancel, className}) => {
  return (
    <aside className={className}>
      <h3>{promptMessage}</h3>
      {<Form template={template} onSubmit={onSubmit} onCancel={onCancel}/>}
    </aside>
  )
}

export default DynamicDecisionPrompter
//  if textarea return this height and if not return this height