import React from 'react'
import "./not-found-page.css"
import PageHeader from '../../components/pageHeader/PageHeader'
import { useLocation } from 'react-router-dom'

const NotFoundPage = ({head, text}) => {
  const location = useLocation()

  const errorMessage = location.state
  return (
    <main>
      <PageHeader />
      <center>
        <h1>
          {errorMessage 
          ? errorMessage
          : "Couldn't find the page you're looking for."}
        </h1>
        <p>Try searching for something else</p>
      </center>
    </main>
  )
}

export default NotFoundPage
