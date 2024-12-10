import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './components/Home'
import Login from './components/Login'
import SignUp from './components/SignUp'
import EachBook from "./components/EachBook"
import AdminLogin from './components/AdminLogin'
import AdminHome from "./components/AdminHome"
import DetailedBorrowView from './components/DetailedBorrowView'
import ProtechtedRoute from './components/ProtectedRoute'
import ProtectedRouteLibrary from './components/ProtectedRouteLibrary'
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtechtedRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/request-book/:id" element={<EachBook />} />
        </Route>
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route element={<ProtectedRouteLibrary />}>
          <Route path="/admin-home" element={<AdminHome />} />
          <Route path="/detailed-borrow-view/:id" element={<DetailedBorrowView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App