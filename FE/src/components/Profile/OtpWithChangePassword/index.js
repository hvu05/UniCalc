import { useState } from 'react'
import axios from 'axios'
import { URL_BASE_API } from '../../../constants'
import { message } from 'antd'
import { showMessage } from '../../Message'

function OtpWithChangePassword({ email, setStatusUI, loading }) {
    const [otp, setOtp] = useState('')
    const [loadingSave, setLoadingSave] = useState(false)
    const [loadingVerify, setLoadingVerify] = useState(false)

    const HandleSendOtp = async () => {
        if (!loading) {
            setLoadingSave(true)
            try {
                await axios.post(`${URL_BASE_API}/otp/request-otp`,
                    { email: email }, { withCredentials: true })
                showMessage('Đã gửi mã otp', 'success')
            } catch (err) {
                showMessage('Gửi mã thất bại, vui lòng thử lại!', 'error')
            }
        }
        setLoadingSave(false)
    }
    const HandleNextWithOtp = async () => {
        if (otp) {
            setLoadingVerify(true)
            try {
                await axios.post(`${URL_BASE_API}/otp/verify-otp`, {
                    email: email,
                    otp: otp
                }, { withCredentials: true })

                setStatusUI(2)
            } catch (err) {
                showMessage('Mã OTP sai hoặc đã hết hạn, vui lòng thử lại!', 'error')
            }
        }
        setLoadingVerify(false)
    }
    return (
        <form>
            <div>
                <label for='otp'>OTP</label>
                <input
                    id='otp'
                    placeholder='Nhập mã otp'
                    onChange={(e) => setOtp(e.target.value)}
                    className='active-change-user'
                />
            </div>
            <div>
                <button
                    type='button'
                    onClick={HandleSendOtp}
                    className='user-edit-save' >
                    {loadingSave === false ? 'GỬI MÃ OTP' : 'ĐANG GỬI ...'}
                </button>
            </div>
            <div>
                <button
                    type='button'
                    onClick={HandleNextWithOtp} >
                    {loadingVerify === false ? 'TIẾP TỤC' : 'ĐANG XÁC NHẬN'}
                </button>
            </div>
        </form>
    )
}

export default OtpWithChangePassword