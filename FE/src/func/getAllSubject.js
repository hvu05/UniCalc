import { useEffect, useState } from "react";
import axios from "axios"
import { URL_BASE_API } from '../constants/index'

function getAllSubject(refresh) {
    const [subjects, setSubjects] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getSubjects = async() => {
            try {
                const reponse = await axios.get(`${URL_BASE_API}/`)
            } catch (e) {
                
            }
        }
    }, [])
}
export default getAllSubject