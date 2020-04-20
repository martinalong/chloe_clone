import React, { Component } from 'react'
import Navbar from './components/Navbar';
import {Link} from 'react-router-dom';

export default function Error() {
    return (
        <div>
            <Navbar home={false}/>
            <div id="grey-error-box">
                <div id="error-content">
                    <h3 id="error-number">404</h3>
                    <h4 id="error-text">We’re sorry, the page or product you are looking for cannot be found right now.</h4>
                    <Link to="/"><h3 id="error-button" className="link-button button-transparent">Keep Browsing</h3></Link>
                </div>
            </div>
        </div>
    )
}

