import React from 'react'
import "./query.css"
import RenderQueryPage from '../../features/query/components/renderQueryPage/RenderQueryPage'

const Query = () => {
  return (
    <main className="query-page">
      <div className="query-layout">
        <RenderQueryPage />
      </div>
    </main>
  )
}

export default Query
