import React, { useEffect, useState } from 'react'
import axios from "axios"
import AdminNavBar from '../AdminNavBar'
import Cookies from "js-cookie"
import "./index.css"
import { useParams } from "react-router-dom"
const DetailedBorrowView = () => {
    const [borrowData, setBorrowData] = useState('')
    const [userData, setUserData] = useState("")
    const [bookData, setBookData] = useState('')
    const { id } = useParams()
    const adminJwtToken = Cookies.get("adminJwtToken")
    const fetchData = async () => {
        const borrowResponse = await axios.get(`http://localhost:5000/api/single-borrow-request/${id}`, {
            headers: {
                "Authorization": `Bearer ${adminJwtToken}`
            }
        })
        const userResponse = await axios.get(`http://localhost:5000/api/user/${borrowResponse.data.result.user_id}`, {
            headers: {
                "Authorization": `Bearer ${adminJwtToken}`
            }
        })
        const bookResponse = await axios.get(`http://localhost:5000/api/book-request/${borrowResponse.data.result.book_id}`, {
            headers: {
                "Authorization": `Bearer ${adminJwtToken}`
            }
        })
        setBorrowData(borrowResponse.data.result)
        setUserData(userResponse.data.result)
        setBookData(bookResponse.data.result)
    }
    const handleApprove = async () => {

        const response = await axios.put(`http://localhost:5000/api/borrow_requests/${id}/approve`, {}, {
            headers: {
                "Authorization": `Bearer ${adminJwtToken}`
            }
        })
        alert(response.data.message)
    }
    const handleDeney = async () => {

        const response = await axios.put(`http://localhost:5000/api/borrow_requests/${id}/deny`, {}, {
            headers: {
                "Authorization": `Bearer ${adminJwtToken}`
            }
        })
        alert(response.data.message)
    }
    useEffect(() => {
        fetchData()
    }, [])
    return (
        <div className='detailed-view-container'>
            <AdminNavBar />
            <div className='detailed-view-info-container'>
                <div>
                    <p><span>Book Name: </span>{bookData.title}</p>
                    <p><span>User Email: </span>{userData.email}</p>
                    <p><span>Start Date: </span>{borrowData.start_date}</p>
                    <p><span>End Date: </span>{borrowData.end_date}</p>
                    <div className='ap-dn-button-container'>
                        <button className='button' onClick={handleApprove}>Approve</button>
                        <button className='red-button' onClick={handleDeney}>Deney</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailedBorrowView