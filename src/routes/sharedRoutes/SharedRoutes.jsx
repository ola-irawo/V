import React from 'react'
import { Outlet, Route } from 'react-router-dom'
import NavigationMenu from '../../layouts/navbar/NavigationMenu'
import Topbar from '../../layouts/topbar/Topbar'
import Home from '../../pages/home/Home'

const SharedRoutes = () => {
  return (
    <React.Fragment>
      <Route
        element={
          <div className="app-container">
            <NavigationMenu />
            <div className="flex">
              <Topbar />
              <Outlet />
            </div>
          </div>
          }
        >
          <Route path="/home" element={<Home />} />
      </Route>
    </React.Fragment>

  )
}

export default SharedRoutes
