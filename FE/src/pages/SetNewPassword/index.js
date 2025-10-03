
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { URL_BASE_API } from "../../constants";
import { showMessage } from '../../components/Message'

function SetNewPassword() {
    const navigate = useNavigate();
    const email = useLocation().state.email || null
    console.log('mail', email)
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmNewPassword] = useState('')
    const otpToken = localStorage.getItem('otpToken')
    const [loadingSetNewPassword, setLoadingSetNewPassword] = useState(false)
    useEffect(() => {
        if (!otpToken) {
            showMessage("Please verify your OTP before setting a new password.", 'error')
            navigate("/change-password"); // quay lại nếu chưa xác thực
        }
    }, [navigate]);
    const HandleSetNewPassword = async (e) => {
        e.preventDefault()
        setLoadingSetNewPassword(true)
        try {
            if (newPassword === confirmPassword) {
                await axios.put(`${URL_BASE_API}/remember-password`, {
                    email: email, new_password: newPassword
                })
                showMessage('Change password success', 'success')
                setNewPassword('')
                setConfirmNewPassword('')
                navigate('/log-in')
            } else {
                showMessage('Passwords do not match', 'error')
            }
        } catch (e) {
            showMessage('Error at set password', 'error')
        } finally {
            setLoadingSetNewPassword(false)
        }
    }
    return (
        <>
            <div className="login">
                <img src="/images/set-new-password.svg" />
                <div className='form-login'>
                    <div className='title'>
                        <span className='webcome'>Welcome to </span>
                        <span className='unicalc'>UniCalc</span>
                    </div>

                    <form onSubmit={(e) => HandleSetNewPassword(e)}>
                        <div style={{ marginLeft: '100px' }}>Thay đổi mật khẩu</div>


                        <div className='form-container'>
                            <div className='form-group'>
                                <i className="fa-solid fa-key"></i>
                                <div className='input-group'>
                                    <label htmlFor='pw'>Nhập mật khẩu mới</label>
                                    <input id='pw' required type="password"
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className='form-container'>
                            <div className='form-group'>
                                <i className="fa-solid fa-key"></i>
                                <div className='input-group'>
                                    <label htmlFor='pw-confirm'>Xác nhận mật khẩu</label>
                                    <input id='pw-confirm' required type="password"
                                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='btn-submit-container'>
                            <button className='btn-submit' type="submit">
                                {loadingSetNewPassword ? 'Submitting...' : 'Next'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default SetNewPassword