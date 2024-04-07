import React, { useEffect } from 'react'
import "./home.css"
import { HomeWidget, UserPost, fetchPosts } from '../../features/home/index'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentUser } from '../../libs/getCurrentUser'
import { useNavigate } from 'react-router-dom'
import { getPostError, selectAllPosts } from '../../services/post/reducers/postSlice'

const Home = () => {
  const navigate = useNavigate()
  const currentUser = getCurrentUser()
  const postErrorStatus = useSelector(getPostError)
  const allPosts = useSelector(selectAllPosts)
  const dispatch = useDispatch()

  useEffect(() => {
    if (Object.keys(currentUser).length === 0) {
      navigate("/login")
    }
  }, [])
  
  // useEffect(() => {
  //   if(!allPosts.length){
  //     dispatch(fetchPosts())
  //   }
  // }, [])

  console.log(allPosts, "yes")
  // if( postErrorStatus?.includes(401)){
  //   localStorage.removeItem("token")
  //   navigate("/login")
  // }

  return (
    <main className="home-container">
      <div className="home-layout">
        <UserPost />
      </div>
      <HomeWidget />
    </main>
  )
}

export default Home