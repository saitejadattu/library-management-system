import React, { useState } from 'react'
import { Link, useNavigate, Navigate } from "react-router-dom"
import NavBar from "../NavBar"
import Cookies from "js-cookie"
import axios from "axios"
import "./index.css"
const AdminLogin = () => {
  const [userDetails, setUserDetails] = useState({ email: "", password: "", role: "librarian" })
  const navigate = useNavigate()
  const handleInput = (e) => {
    const { name, value } = e.target
    setUserDetails((prevState) => ({ ...prevState, [name]: value }))
  }
  const handleForm = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post("http://localhost:5000/api/admin-login", userDetails, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      if (response.status === 200) {
        Cookies.set("adminJwtToken", response.data.jwtToken)
        navigate("/admin-home")
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message || "Login failed. Please try again.");
      } else if (error.request) {
        // Request was made but no response received
        alert("No response from server. Please try again later.");
      } else {
        // Something went wrong in setting up the request
        alert("An unexpected error occurred.");
      }
    }
  }
  const jwtToken = Cookies.get("adminJwtToken")
  if (jwtToken) {
    return <Navigate to="/admin-home" />
  }
  return (
    <div>
      <NavBar />
      <div  className='login-container'>
        <form className='login-form-container' onSubmit={handleForm}>
          <h1>Login</h1>
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input type="text" placeholder="Enter Your Email" id="email" name="email" onChange={handleInput} required />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input type="password" placeholder="Enter Your Password" id="password" name="password" onChange={handleInput} required />
          <br />
          <p className='log-text'>Already have an account <Link to="/">SignUp</Link></p>
          <button type="submit" className='login-button'>Login</button>
        </form>
      </div>
    </div>
  )
}

export default AdminLogin