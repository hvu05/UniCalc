import axios from "axios";
import { useEffect, useState } from "react";
import { URL_BASE_API } from "../constants";
import { message } from "antd";
import { getTokenFromUrl } from "./getTokenFromURL";

function useSemesterByUserId(refresh) {
    const [semesters, setSemesters] = useState([])
    const [loading, setLoading] = useState(true)
    const token = getTokenFromUrl()
    useEffect(() => {
        const getSemester = async() => {
            try {
                const response = await axios.get(`${URL_BASE_API}/semester`, { withCredentials: true })
                setLoading(false)
                setSemesters(response)
            } catch (err) {
                message.error('Error at get all semester')
                // console.log(err);
                
                // setLoading(false)
            }
        }
        getSemester()
    }, [refresh])
    return {semesters, loading}
}

export default useSemesterByUserId