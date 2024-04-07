import React from 'react'
import Profile from '../../pages/profile/Profile'
import Societies from '../../pages/societies/Societies'
import SocietyPage from '../../features/societies/components/societyPage/SocietyPage'
import Ts from '../../utils/Ts'
import LandingPage from '../../pages/LandingPage'
import Register from '../../pages/Register'
import Login from '../../pages/Login'
import OTP from '../../pages/OTP'
import Onboarding from '../../pages/Onboarding'
import { Outlet, Route, Routes } from 'react-router-dom'
import NavigationMenu from '../../layouts/navbar/NavigationMenu'
import Topbar from '../../layouts/topbar/Topbar'
import Home from '../../pages/home/Home'

const MobileRoutes = () => {
  return (
    <Routes>
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/otp" element={<OTP/>} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route
            element={
                <div className="app-container">
                <NavigationMenu />
                <div className="flex">
                    <Topbar/>
                    <Outlet />
                </div>
                </div>
                }
            >
            <Route path="/home" element={<Home />} />
        </Route>
        <Route path="/profile" element={<Profile />}>
        <Route path="/profile/:id" element={<h1>Profile</h1>} />
        </Route>
        <Route path="/societies" element={<Societies />} />
        <Route path="/societies/:id" element={<SocietyPage />} />
        <Route path="/ts" element={<Ts />} />
    </Routes>
  )
}

export default MobileRoutes
