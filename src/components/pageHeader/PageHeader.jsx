import React from 'react'
import "./page-header.css"
import Button from '../ui/Button'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import BrandLogo from '../../assets/svgs/brandLogo.svg'

const PageHeader = ({setModal}) => {
    const navigate = useNavigate()
    const location = useLocation()
    const currentRoute = location.pathname
    const {id, commentId, postId, searchId, societyId,societyName, username} = useParams()
    const idExist = id || commentId || postId || searchId || societyId || societyName || username
    const segments = currentRoute.split('/');
    const contentBeforeSecondSlash = segments.slice(0, 3).join('/');
    const errorRoute = (currentRoute !== "/" && !currentRoute.includes("societies") && !currentRoute.includes("bookmark") && !idExist && currentRoute.split("/").length === 2 && ("Error"))

  return (
    <header className="mobile-page-header">
        <div className="mobile-page-header-container">
        <Button
            handleEvent={() => setModal ? setModal(false) : navigate(-1)}
            keyDownEvent={() => setModal ? setModal(false) : navigate(-1)}
            ariaLabel="Navigate back"
            text={
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 19 16" fill="none">
                    <path d="M0.292893 7.29289C-0.0976314 7.68342 -0.0976315 8.31658 0.292892 8.70711L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41421 8L8.07107 2.34314C8.46159 1.95262 8.46159 1.31946 8.07107 0.928931C7.68054 0.538407 7.04738 0.538407 6.65686 0.928931L0.292893 7.29289ZM19 7L1 7L1 9L19 9L19 7Z" fill="#263238" fill0pacity="0.7"/>
                </svg> 
            }
        />
        
            <img src={BrandLogo} alt="Brand Logo" />
        </div>
        
       {currentRoute.includes("profile") ? "" : <h1 className="mobile-page-header-title">
            {
                currentRoute.includes("notification") && "Notification" || currentRoute.includes("settings") && "Settings" || societyName || errorRoute || (idExist 
                ? 
                    contentBeforeSecondSlash
                    .slice(1)
                    .charAt(0)
                    .toUpperCase() + contentBeforeSecondSlash.slice(2, contentBeforeSecondSlash.lastIndexOf("/"))
                :
                    currentRoute.slice(1).charAt(0).toUpperCase() + currentRoute.slice(2)) 
            }
        
        </h1>}
       { <hr className="mobile-page-header-line-break" />}
    </header>
  )
}

export default PageHeader
