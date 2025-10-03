import axios from "axios";
import { useEffect, useState } from "react";
import { URL_BASE_API } from "../constants";
import { message } from "antd";
import { getTokenFromUrl } from "./getTokenFromURL";

function useGetAllGrade(refresh) {
    const [grades, setGrades] = useState([])
    const [loading, setLoading] = useState(true)
    const token = localStorage.getItem('token')
    
    useEffect(() => {
        const getAllGrade = async() => {
            try {
                const response = await axios.get(`${URL_BASE_API}/grade`, { withCredentials: true })
                setLoading(false)
                setGrades(response.data.data)
                // console.log('grades',response.data.data)

            } catch (err) {
                message.error('Vui lòng đăng nhập lại')
                // console.log(err);
                
                // setLoading(false)
            }
        }
        getAllGrade()
    }, [refresh])
    
    return {grades, loading}
}

export default useGetAllGrade