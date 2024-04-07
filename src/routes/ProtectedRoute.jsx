import React, { Suspense } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { getCurrentUser } from '../libs/getCurrentUser'
import Loader from '../components/loader/Loader'

const ProtectedRoute = () => {
    const currentUser = getCurrentUser()
    const isAuth = true
    
   {isAuth
     ? 
        <Suspense fallback={<Loader />}>
            <Outlet />
        </Suspense>
    : 
        Navigate("/login")}
    ;
}

export default ProtectedRoute
