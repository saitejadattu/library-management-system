import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import "./index.css"
import Cookies from "js-cookie"
import axios from "axios"
import AdminNavBar from '../AdminNavBar'
const AdminHome = () => {
  const [borrowList, setBorrowList] = useState([])
  const adminJwtToken = Cookies.get("adminJwtToken")
  const fetchData = async () => {
    const response = await axios.get("http://localhost:5000/api/borrow_requests", {
      headers: {
        "Authorization": `Bearer ${adminJwtToken}`
      }
    })

    setBorrowList(response.data.result)
  }
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      <AdminNavBar />
      <div>
        <table>
          <thead>
            <tr>
              <th>Book Id</th>
              <th>User Id</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {borrowList && borrowList.map((each) =>
              <tr key={each.id}>
                <td>{each.book_id}</td>
                <td>{each.user_id}</td>
                <td>{each.status}</td>
                <td><Link className='request-button' to={`/detailed-borrow-view/${each.id}`}>View</Link></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminHome