import React from 'react'
import "./index.css"
import Cookies from "js-cookie"
import {Link, useNavigate} from "react-router-dom"
const NavBar = () => {
  const navigate = useNavigate()
  const handleLogout = ()=>{
    Cookies.remove("jwtToken")
    navigate("/login")
  }
  return (
    <div className='nav-container'>
        <Link to="/home">Library</Link>
        <Link to="/admin-login">Admin</Link>
        <button className='button' onClick={handleLogout}>LogOut</button>
    </div>
  )
}

export default NavBar