import axios from "axios";
import { useEffect, useState } from "react";
import { URL_BASE_API } from "../constants";
import { message } from "antd";

function useInfoAUser(refresh) {
    const [user, setuser] = useState()
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        const getAUser = async() => {
            try {
                const response = await axios.get(`${URL_BASE_API}/user`, { withCredentials: true })
                setLoading(false)
                setuser(response.data.data[0])

            } catch (err) {
                message.error('Vui lòng đăng nhập lại')
                // console.log(err);
                
                // setLoading(false)
            }
        }
        getAUser()
    }, [refresh])
    
    return {user, loading}
}

export default useInfoAUser