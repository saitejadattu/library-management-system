import React, { useState, useEffect } from 'react'
import {Link} from "react-router-dom"
import "./index.css"
import axios from "axios"
import NavBar from '../NavBar'
const Home = () => {
  const [bookList, setBookList] = useState([])
  const fetchData = async () => {
    const response = await axios.get("http://localhost:5000/api/books")
    setBookList(response.data.result)
  }
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      <NavBar />
      <div>
        <table>
          <thead>
            <tr>
              <th>Book</th>
              <th>Author</th>
              <th>Quantity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookList && bookList.map((eachBook) =>
              <tr key={eachBook.id}>
                <td>{eachBook.title}</td>
                <td>{eachBook.author}</td>
                <td>{eachBook.quantity}</td>
                <td><Link className='request-button' to={`/request-book/${eachBook.id}`}>Request</Link></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Home