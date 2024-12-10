import React from 'react'
import Cookies from "js-cookie"
import { Navigate, Outlet } from "react-router-dom"

const ProtectedRouteLibrary = () => {
    const jwtToken = Cookies.get("adminJwtToken")
    return jwtToken ? <Outlet /> : <Navigate to="/adminLogin" />
}

export default ProtectedRouteLibrary