import React from 'react'
import "./empty-query-result.css"
const EmptyQueryResult = ({emptySearchMessage}) => {
  return (
    <aside className="empty-query">
        <center>
        <h3 className="empty-query-message">{emptySearchMessage}</h3>
        </center>
    </aside>
  )
}

export default EmptyQueryResult
