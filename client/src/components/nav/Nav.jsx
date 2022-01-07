import React from 'react'
import './nav.css'
const Nav = (state) => {

    return (
        <div className='navigation'>
           <img src="logo.png" alt="chatter" className="logo-nav" /> 
           <h2 className='nav-text'>Chatter, Make instant connections</h2>
        </div>
    )
}

export default Nav
