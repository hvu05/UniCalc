import { useEffect, useState } from "react"
import { Navigate, Outlet } from "react-router-dom"
import axios from 'axios'
import { URL_BASE_API } from "../../constants"
import Spinner from 'react-bootstrap/Spinner'

function Private() {
    const [status, setStatus] = useState('checking')

    useEffect(() => {
        const GetUser = async () => {
            try {
                const result = await axios.get(`${URL_BASE_API}/user`, {
                    withCredentials: true
                })
                setStatus('auth')
                console.log('GET user', result)
            } catch (err) {
                console.log('GET user at PRIVATE', err)
                setStatus('un_auth')
            }
        }
        GetUser()
    }, [])

    if (status === "checking") {
        return  <Spinner animation="border" />
    }
    if (status === "un_auth") return <Navigate to="/" replace />
    return <Outlet />
}

export default Private
