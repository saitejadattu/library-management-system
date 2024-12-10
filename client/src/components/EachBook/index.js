import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import Cookies from "js-cookie"
import axios from "axios"
import NavBar from '../NavBar'
import "./index.css"
const EachBook = () => {
    const [book, setBook] = useState('')
    const [borrowData, setBoroowData] = useState({ start_date: '', end_date: '' })
    const { id } = useParams()
    const jwtToken = Cookies.get("jwtToken")
    const fetchData = async () => {
        const response = await axios.get(`http://localhost:5000/api/book-request/${id}`, {
            headers: {
                "Authorization": `Bearer ${jwtToken}`
            }
        })
        setBook(response.data.result)
        // console.log(response)
    }
    useEffect(() => {
        fetchData()
    }, [])
    const handleInput = (e) => {
        const { name, value } = e.target
        setBoroowData((prevState) => ({ ...prevState, [name]: value }))
    }
    const handleForm = async (e) => {
        e.preventDefault()
        const jwtToken = Cookies.get("jwtToken")
        try {
            const response = await axios.post(`http://localhost:5000/api/borrow_request/${id}`, borrowData, {
                headers: {
                    "Authorization": `Bearer ${jwtToken}`,
                    "Content-Type": "application/json",
                }
            })
            if(response.status===200){
                alert(response.data.message)
            }
        } catch (error) {
            if (error.response) {
                if(error.response.status===405){
                    alert(error.response.data.message)
                }else if(error.response.status===401){
                    alert(error.response.data.message)
                }else if(error.response.status===404){
                    alert(error.response.data.message)
                }
            } else if (error.request) {
                // Request was made but no response received
                alert("No response from server. Please try again later.");
            } else {
                // Something went wrong in setting up the request
                alert("An unexpected error occurred.");
            }
            
        }
    }
    return (
        <div className='each-book-container'>
            <NavBar />
            <div className='each-book-bg-container'>
                <form onSubmit={handleForm} className='each-book-form-container'>
                    <h1>Barrow Request</h1>
                    <br />
                    <div className='each-book-div-container'>
                        <div className='book-info-container'>
                            {book && <>
                                <p><span>Book Name:</span> {book.title}</p>
                                <p><span>Author:</span> {book.author}</p>
                                <p><span>Quantity:</span> {book.quantity}</p>
                            </>}
                        </div>
                        <div className='borrow-date-input-container'>
                            <label>Start Date</label>
                            <input type="date" name="start_date" onChange={handleInput} required />
                            <span>to</span>
                            <label>End Date</label>
                            <input type="date" name="end_date" onChange={handleInput} required />
                        </div>

                    </div>
                    <button type="submit" className='request-button'>Request</button>
                </form>
            </div>
        </div>
    )
}

export default EachBook