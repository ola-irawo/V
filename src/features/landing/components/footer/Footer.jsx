import React from 'react'
import "./footer.css"
import { NavLink } from 'react-router-dom'
import { X, facebook, instagram } from '../..'

const Footer = () => {
  return (
    <footer role="contentinfo">
        <div className="footer-wrapper">

            <nav className="footer-nav" role="navigation" aria-label="secondary navigation">
                <ul className="footer-nav-list">
                    <li className="footer-nav-item">
                        <NavLink aria-label="Learn more about how we help people">How we help</NavLink>
                    </li>
                    <li className="footer-nav-item">
                        <NavLink aria-label="Learn more about our organization">About Us</NavLink>
                    </li>
                    <li className="footer-nav-item">
                        <NavLink aria-label="Answers to frequently asked questions">FAQS</NavLink>
                    </li>
                    <li className="footer-nav-item">
                        <NavLink aria-label="Contact us with any questions or feedback">Contact Us</NavLink>
                    </li>
                </ul>
            </nav>

            <div className="footer-sub">
                <ul className="footer-social-list"  aria-label="Social links">
                    <li className="footer-social-link">
                        <NavLink  aria-label="Facebook link">
                            <img src={facebook} alt="facebook-icon"/>
                        </NavLink>
                    </li>
                    <li className="footer-social-link">
                        <NavLink aria-label="Instagram link">
                            <img src={instagram} alt="instagram-icon"/>
                        </NavLink>
                    </li>
                    <li className="footer-social-link">
                        <NavLink aria-label="X link">
                            <img src={X} alt="X-icon"/>
                        </NavLink>
                    </li>
                </ul>

                <ul className="footer-policy-list">
                    <li className="footer-policy-item">
                        <NavLink aria-label="Learn about our privacy policy">Privacy Policy</NavLink>
                    </li>
                    <li className="footer-policy-item">
                        <NavLink aria-label="Learn about our terms of use">Terms of use</NavLink>
                    </li>
                </ul>
            </div>

        </div>

        <div className="copyright-container">
            <p className="copyright-text">Copyright 2023, Ventmoir. </p>
            <p className="copyright-text"> All rights reserved</p>
        </div>
    </footer>
  )
}

export default Footer
