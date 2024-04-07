import React, { useEffect, useRef, useState } from 'react'
import './topbar.css'
import Form from '../../components/Form'
import { NavLink, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import profileAvatarIcon from "./assets/svgs/profileAvatarIcon.svg"
import notification from "./assets/svgs/notification.svg"
import useWindowWidth from '../../hooks/useWindowWidth'
import { getCurrentUser } from '../../libs/getCurrentUser'
import { useSelector } from 'react-redux'
import { selectAllSociety } from '../../services/societies/reducers/societySlice'
import { selectAllUser } from '../../services/user/reducers/userSlice'
import Button from '../../components/ui/Button'
import { selectBio } from '../../services/bio/reducers/bioSlice'

const Topbar = () => {
    const recentSearchFromStorage = localStorage.getItem("recentSearch");
    const initialRecentSearch = recentSearchFromStorage ? JSON.parse(recentSearchFromStorage) : [];
    
    const [search, setSearch] = useState("")
    const [recentSearch, setRecentSearch] = useState(initialRecentSearch)
    const [showSearchedHistory, setShowSearchedHistory] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams({q: ""})
    const allSocieties = useSelector(selectAllSociety)
    const allUser = useSelector(selectAllUser)
    const currentUserBio = useSelector(selectBio)

    const {screenWidth} = useWindowWidth()
    const navigate = useNavigate()
    const location = useLocation()
    const {id, commentId, postId, searchId, societyId,societyName, username} = useParams()
    const idExist = id || commentId || postId || searchId || societyId || societyName || username
    const currentUser = getCurrentUser()
    const ulRef = useRef();

    const currentRoute = location.pathname
    const segments = currentRoute.split('/');
    const contentBeforeSecondSlash = segments.slice(0, 3).join('/');
    const errorRoute = (currentRoute !== "/" && !currentRoute.includes("societies") && !currentRoute.includes("bookmark") && !idExist && currentRoute.split("/").length === 2 && ("Error"))

    const template = {
        fields: [
            {
                name: "",
                type: "text",
                placeholder: " Search for societies, users or contents"
            }
        ]
    }
    
    const userBio =  currentUserBio?.find(bio => bio?.user._id === currentUser.userUid)

    const isMobile = screenWidth <= 767

    const querySocieties = allSocieties?.filter(society =>
        recentSearch.some(searchTerm => society.societyName.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    const queryUser = allUser?.filter(user => 
        recentSearch.some(searchTerm => user.username.toLowerCase().includes(searchTerm.toLowerCase())))
    
    const result = [...querySocieties, ...queryUser]
    const queryResults = searchParams?.get("q")?.toLowerCase().trim()
    
    const queryUserImage = (userId) => {
        const userBio = currentUserBio?.find(bio =>  bio?.user._id === userId);
        return userBio?.avatar
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault()
            const newRecentSearch = [...recentSearch, e.target.value.trim()];
            setRecentSearch(newRecentSearch);
            localStorage.setItem("recentSearch", JSON.stringify(newRecentSearch));
            location.pathname.includes("search") 
            ? 
            setSearchParams((oldParams) => {
                oldParams.set("q", e.target.value.trim())
                return oldParams
            }, {replace: true})
            :
             navigate("/search", {state: e.target.value.trim()})

        }
        setSearch("")
    }

    const removeItemFromResearchSearch = (e, index) => {
        e.stopPropagation()
        const updatedRecentSearch = [...recentSearch]; // Create a copy of the array
        updatedRecentSearch.splice(index, 1); // Remove the clicked item
        localStorage.setItem("recentSearch", JSON.stringify(updatedRecentSearch)); // Update localStorage
        setRecentSearch(updatedRecentSearch); // Update state with the filtered array
    }

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ulRef.current && showSearchedHistory && !ulRef.current.contains(e.target)) {
                // Click is outside the <ul>, hide it
                setShowSearchedHistory(false);
            }
        };

        // Attach the event listener to the document
        document.addEventListener('click', handleClickOutside);
    
        // Clean up the event listener on component unmount
        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
      }, [showSearchedHistory]);
    
    return (
        <header 
            className="topbar-header" 
            aria-label="Utility Bar" 
            role="toolbar"
        >
           <div className="topbar-wrapper">
                    {!isMobile 
                        && 
                        <h1 style={{display: "flex", alignItems: "center", gap: "1rem"}}>
                            {currentRoute !== "/" ? 
                                <svg className="topbar-header-svg" onClick={() => navigate(-1)} xmlns="http://www.w3.org/2000/svg" width="27" height="15" viewBox="0 0 28 15" fill="none">
                                    <path d="M0.292891 6.79289C-0.0976333 7.18342 -0.0976334 7.81658 0.29289 8.2071L6.65685 14.5711C7.04738 14.9616 7.68054 14.9616 8.07107 14.5711C8.46159 14.1805 8.46159 13.5474 8.07107 13.1569L2.41421 7.5L8.07107 1.84314C8.46159 1.45262 8.46159 0.819455 8.07107 0.42893C7.68054 0.038406 7.04738 0.038406 6.65685 0.42893L0.292891 6.79289ZM28 6.5L0.999998 6.5L0.999998 8.5L28 8.5L28 6.5Z" fill="#263238"/>
                                </svg>
                                :  "Home" 
                            } 
                    
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
                        </h1>
                    }

                    { isMobile &&  <div className="topbar-profile-icon">
                        <NavLink to={`/profile/${currentUser.userName}`} aria-label='Click on this to go to your profile details'>
                            <img src={userBio?.avatar} alt="Profile avatar - View your profile" />
                        </NavLink>
                    </div>}

                    <div className="query-input-container">
                        <form>
                            <label htmlFor="search-icon">
                                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 19 18" fill="none">
                                    <path d="M8.86491 15.749C12.9092 15.749 16.1878 12.5591 16.1878 8.62402C16.1878 4.68899 12.9092 1.49902 8.86491 1.49902C4.82057 1.49902 1.54199 4.68899 1.54199 8.62402C1.54199 12.5591 4.82057 15.749 8.86491 15.749Z" stroke="black" stroke-opacity="0.8" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M16.9596 16.499L15.418 14.999" stroke="black" stroke-opacity="0.8" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </label>

                            <input
                                onMouseDown={() => setShowSearchedHistory(true)}
                                // value={search}
                                onKeyDown={(e) => {
                                    handleKeyDown(e)
                                }}
                                onChange={(e) => setSearch(e.target.value)}
                                id="search-icon"
                                type='text'
                                placeholder='Search for users, posts, societies'
                            />
                        </form>
                        

                {
                    showSearchedHistory && <ul
                        className={`${recentSearch.length > 0 ? "recent-search-list" : "no-search"}`}
                        // ref={ulRef}
                        onMouseLeave={() => setShowSearchedHistory(false)}
                        onClick={(e) => {
                            handleKeyDown(e)
                        }}

                        onChange={(e) => {
                            // Access the selected value from the event
                            const selectedValue = e.target.value;
                        
                            setSearchParams(oldData => {
                            oldData.set("q", selectedValue); // Set the selected value
                            return oldData;
                            }, { replace: true });
                            navigate("/search", {state: e.target.value})  
                        }} 
                    >
                        { recentSearch.length > 0 && <div className="d">
                            <h3>Recent Searches</h3>

                            <Button
                                text={"Clear all"}
                                handleEvent={() => {
                                    localStorage.removeItem("recentSearch")
                                }}
                                
                                keyDownEvent={(e) => {
                                    if(e.key === "Enter" || e.key === " "){
                                        localStorage.removeItem("recentSearch")
                                    }
                                }}
                            />
                        </div>}

                        {
                            recentSearch.length 
                                ? 
                                result?.map((searchedItem, index) => {
                                return <li key={index} className="recent-search-item" >
                                    <div 
                                        className="recent-search-details" 
                                        onClick={() => {
                                            searchedItem.societyName 
                                            ?
                                            navigate(`/societies/${searchedItem.societyName}/${searchedItem._id}`)
                                            :
                                            navigate(`/profile/${searchedItem.username}`)
                                        }}
                                    >
                                        <div className="recent-search-img-container">
                                            <img src={searchedItem.image_url || queryUserImage(searchedItem?._id)} alt={searchedItem.societyName || searchedItem.username} />
                                        </div>
                                        <div className="recent-search-name">
                                            <h3>{searchedItem.societyName || searchedItem.username}</h3>
                                            {searchedItem.username && <small>@{searchedItem.username}</small>}
                                        </div>
                                    </div>

                                    <Button
                                        ariaLabel={"Remove search item"}
                                        className={"remove-search-item"}
                                        text={
                                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="13" viewBox="0 0 12 13" fill="none">
                                                <path d="M1 11.5L6 6.5L11 11.5M11 1.5L5.99905 6.5L1 1.5" stroke="#407BFF" strokeOpacity="0.71" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        }

                                        handleEvent={(e) => {
                                            removeItemFromResearchSearch(e, index)
                                        }}

                                        keyDownEvent={(e) => {
                                            if(e.key === "Enter" || e.key === " "){
                                                removeItemFromResearchSearch(e, index)
                                            }
                                        }}
                                    />
                                </li>
                            }) 
                            : 
                            <center>
                                <h3 className="empty-search-message">
                                    No recent searches found! Search Ventmoir...
                                </h3>
                            </center>
                        }
                    </ul>
                }

                    </div>

                {/* { <Form template={template} /> */}

                    {!isMobile && <nav className="topbar-nav">
                        <ul className="topbar-nav-list">
                            <li className="=nav-list-item">
                                <NavLink to={"/notification"}>
                                    <img src={notification} alt="Societies Icon - Explore societies" />
                                </NavLink>
                            </li>
                            <li className="=nav-list-item">
                                <NavLink to={`/profile/${currentUser.userName}`} aria-label='Click on this to go to your profile details'>
                                    <img src={userBio?.avatar ? userBio?.avatar : profileAvatarIcon} alt="Profile avatar - View your profile" />
                                </NavLink>
                            </li>
                        </ul>
                    </nav>}
            </div>

        </header>
    )
}

export default Topbar
