import React, { useState } from 'react'
import "./render-settings.css"
import useWindowWidth from '../../../hooks/useWindowWidth'
import { NavLink } from 'react-router-dom'

const RenderSettings = () => {
  const {screenWidth} = useWindowWidth()
  const isMobile = screenWidth <= 767

  return (
    <section className="settings">
      <ul className="render-settings-list">
        <li className="render-settings-list-item">
          <NavLink to={"account"} className="render-settings-link">Account setting</NavLink>

          <span aria-hidden="true">
            <svg width="10" height="10" viewBox="0 0 15 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.573599 0.550288C0.206324 0.902744 0 1.38071 0 1.87909C0 2.37746 0.206324 2.85543 0.573599 3.20788L10.2711 12.5113L0.573599 21.8148C0.216732 22.1693 0.0192653 22.6441 0.0237289 23.1368C0.0281926 23.6296 0.23423 24.101 0.597463 24.4495C0.960696 24.798 1.45206 24.9956 1.96573 24.9999C2.4794 25.0042 2.97428 24.8148 3.34377 24.4724L14.4264 13.8401C14.7937 13.4877 15 13.0097 15 12.5113C15 12.013 14.7937 11.535 14.4264 11.1826L3.34377 0.550288C2.97638 0.197939 2.47817 0 1.95868 0C1.4392 0 0.940984 0.197939 0.573599 0.550288Z" fill="#111111" fill-opacity="0.5"/>
            </svg>
          </span>
        </li>
        <li className="render-settings-list-item">
          <NavLink to={"profile"} className="render-settings-link">Profile setting</NavLink>

          <span aria-hidden="true">
           <svg width="10" height="10" viewBox="0 0 15 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.573599 0.550288C0.206324 0.902744 0 1.38071 0 1.87909C0 2.37746 0.206324 2.85543 0.573599 3.20788L10.2711 12.5113L0.573599 21.8148C0.216732 22.1693 0.0192653 22.6441 0.0237289 23.1368C0.0281926 23.6296 0.23423 24.101 0.597463 24.4495C0.960696 24.798 1.45206 24.9956 1.96573 24.9999C2.4794 25.0042 2.97428 24.8148 3.34377 24.4724L14.4264 13.8401C14.7937 13.4877 15 13.0097 15 12.5113C15 12.013 14.7937 11.535 14.4264 11.1826L3.34377 0.550288C2.97638 0.197939 2.47817 0 1.95868 0C1.4392 0 0.940984 0.197939 0.573599 0.550288Z" fill="#111111" fill-opacity="0.5"/>
            </svg>
          </span>
        </li>
        <li className="render-settings-list-item">
          <NavLink to={"notification"} className="render-settings-link">Notification setting</NavLink>

          <span aria-hidden="true">
            <svg width="10" height="10" viewBox="0 0 15 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.573599 0.550288C0.206324 0.902744 0 1.38071 0 1.87909C0 2.37746 0.206324 2.85543 0.573599 3.20788L10.2711 12.5113L0.573599 21.8148C0.216732 22.1693 0.0192653 22.6441 0.0237289 23.1368C0.0281926 23.6296 0.23423 24.101 0.597463 24.4495C0.960696 24.798 1.45206 24.9956 1.96573 24.9999C2.4794 25.0042 2.97428 24.8148 3.34377 24.4724L14.4264 13.8401C14.7937 13.4877 15 13.0097 15 12.5113C15 12.013 14.7937 11.535 14.4264 11.1826L3.34377 0.550288C2.97638 0.197939 2.47817 0 1.95868 0C1.4392 0 0.940984 0.197939 0.573599 0.550288Z" fill="#111111" fill-opacity="0.5"/>
            </svg>
          </span>
        </li>
        <li className="render-settings-list-item">
          <NavLink to={"block_and_mute"} className="render-settings-link">Blocked & Muted</NavLink>

          <span aria-hidden="true">
            <svg width="10" height="10" viewBox="0 0 15 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.573599 0.550288C0.206324 0.902744 0 1.38071 0 1.87909C0 2.37746 0.206324 2.85543 0.573599 3.20788L10.2711 12.5113L0.573599 21.8148C0.216732 22.1693 0.0192653 22.6441 0.0237289 23.1368C0.0281926 23.6296 0.23423 24.101 0.597463 24.4495C0.960696 24.798 1.45206 24.9956 1.96573 24.9999C2.4794 25.0042 2.97428 24.8148 3.34377 24.4724L14.4264 13.8401C14.7937 13.4877 15 13.0097 15 12.5113C15 12.013 14.7937 11.535 14.4264 11.1826L3.34377 0.550288C2.97638 0.197939 2.47817 0 1.95868 0C1.4392 0 0.940984 0.197939 0.573599 0.550288Z" fill="#111111" fill-opacity="0.5"/>
            </svg>
          </span>
        </li>
      </ul>
    </section>
  )
}

export default RenderSettings
