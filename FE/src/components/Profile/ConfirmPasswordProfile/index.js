import { useState } from 'react'
import axios from 'axios'
import { URL_BASE_API } from '../../../constants'
import { message } from 'antd'
import { showMessage } from '../../Message'

function ConfirmPasswordProfile({email, setStatusUI}) {
    const [newPass, setNewPass] = useState({ new_password: '', confirm_password: '' })
    const [loadingChangePass, setLoadingChangePass] = useState(false)

    const HandleConfirmPassword = async () => {
        setLoadingChangePass(true)
        if (newPass.new_password.length < 6) {
            showMessage('Mật khẩu không hợp lệ', 'error')
            return
        }
        else if (newPass.new_password != newPass.confirm_password) {
            showMessage('Mật khẩu không trùng khớp', 'error')
            return
        }
        if (newPass.new_password === newPass.confirm_password) {
            try {
                axios.put(`${URL_BASE_API}/reset-password`, {
                    email: email,
                    new_password: newPass.new_password
                }, { withCredentials: true })
                showMessage('Thay đổi mật khẩu thành công', 'success')
                setStatusUI(0)
            } catch (err) {
                showMessage('Có lỗi xảy ra', 'error')
            }
        }
        setLoadingChangePass(false)
    }
    return (
        <form>
            <div>
                <label for='otp'>Nhập mật khẩu mới</label>
                <input
                    type='password'
                    id='otp'
                    className='active-change-user'
                    onChange={(e) => setNewPass({
                        ...newPass,
                        new_password: e.target.value
                    })}
                />
            </div>

            <div>
                <label for='otp'>Xác nhận mật khẩu</label>
                <input
                    type='password'
                    id='otp'
                    className='active-change-user'
                    onChange={(e) => setNewPass({
                        ...newPass,
                        confirm_password: e.target.value
                    })}
                />
            </div>

            <div>
                <button
                    type='button'
                    onClick={HandleConfirmPassword} >
                    {loadingChangePass ? 'ĐANG THAY ĐỔI ...' : 'XÁC NHẬN THAY ĐỔI'}
                </button>
            </div>
        </form>
    )
}

export default ConfirmPasswordProfile