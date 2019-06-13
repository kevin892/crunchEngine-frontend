import React from 'react'
import './Navbar.css'
import Weather from './Weather'
import logo from'./images/crunchengine.png'

const Navbar = props => {

  return (localStorage.getItem('jwt')?<div>
    <nav className="uk-navbar uk-margin" uk-navbar="mode: click" uk-navbar>
        <div className="uk-navbar-right">
            <ul className="uk-navbar-nav">
              <img className="logo uk-navbar-item uk-logo" src={logo}></img>
                <li className="uk-parent"><a className='nav-button'href="/">Search</a></li>
                <li className="uk-parent"><a className='nav-button' href="/search-history" >Search History</a></li>
                <li className="uk-parent"><a className='nav-button' href="/saved-gifs" >Saved GIFs</a></li>
                <li onClick={() => localStorage.clear()} className="uk-parent"><a className='nav-button' href="/sign-in">Logout</a></li>
            </ul>
        </div>
        <Weather />
        {props.gif?<span className='user-icon'><img className ="profile-gif"src={props.gif}></img>
      <span className="username"><strong>{localStorage.getItem('username')}</strong></span></span>:<span className='user-icon'><img className ="profile-gif"src={localStorage.getItem('profile_gif')}></img>
    <span className="username"><strong>{localStorage.getItem('username')}</strong></span></span>}
    </nav><hr/>
  </div>:<div></div>
    )
}
export default Navbar
