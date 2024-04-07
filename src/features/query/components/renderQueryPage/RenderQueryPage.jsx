import React, { useEffect, useState } from 'react'
import "./render-query-page.css"
import QueryPosts from './components/queryPosts/QueryPosts'
import QueryUsers from './components/queryUsers/QueryUsers'
import QuerySocieties from './components/querySocieties/QuerySocieties'
import Button from '../../../../components/ui/Button'
import { useLocation, useSearchParams } from 'react-router-dom'

const RenderQueryPage = () => {
    const [queryPage, setQueryPage] = useState("Posts")
    const [searchParams, setSearchParams] = useSearchParams({q: ""})

    const location = useLocation()
    const queryResults = searchParams.get("q").toLowerCase()

    const renderQueryPage = () => {
        switch(queryPage){
            case "Posts":
                return <QueryPosts queryResults={queryResults} />;
            case "Users":
                return <QueryUsers queryResults={queryResults} />;
            case "Societies":
                return <QuerySocieties queryResults={queryResults} />;
            default:
                return <QueryPosts queryResults={queryResults} />;
        }
    }

    useEffect(() => {
        setSearchParams(oldData => {
            oldData.set("q", location.state)
            return oldData
        }, {replace: true})
        
    }, [])
   
  return (
    <section className="query-section">

       <ul className="query-list">
            <li className="query-list-item">
                <Button
                    text={"Posts"}
                    className={queryPage === "Posts" && "active-query"}
                    handleEvent={() => setQueryPage("Posts")}
                />
            </li>
            <li className="query-list-item">
                <Button
                    text={"Users"}
                    className={queryPage === "Users" && "active-query"}
                    handleEvent={() => setQueryPage("Users")}
                />
            </li>
            <li className="query-list-item">
                <Button
                    text={"Societies"}
                    className={queryPage === "Societies" && "active-query"}
                    handleEvent={() => setQueryPage("Societies")}
                />
            </li>
        </ul>

        <hr className="query-line-break" />
        
        <div className="query-container">
            {renderQueryPage()}
        </div>
        
    </ section>
  )
}

export default RenderQueryPage
