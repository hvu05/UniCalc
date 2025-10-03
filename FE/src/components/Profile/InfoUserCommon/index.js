import axios from 'axios'
import { URL_BASE_API } from '../../../constants'
import { useState, useEffect } from 'react'
import { showMessage } from '../../Message'

function InfoUserCommon({ user, setStatusUI, loading }) {
    const [isEditing, setIsEditing] = useState(false)
    const [loadingSave, setLoadingSave] = useState(false)  // 👈 thêm state loading
    const [formData, setFromData] = useState({
        fullname: '',
        username: '',
    })

    useEffect(() => {
        if (!loading) {
            setFromData({
                fullname: user.fullname,
                username: user.username
            })
        }
    }, [loading, user])

    const HandleChange = (e) => {
        const { id, value } = e.target
        setFromData({ ...formData, [id]: value })
    }

    const HandleClick = async () => {
        if (!isEditing) {
            setIsEditing(true)
        } else {
            await HandleSave()
        }
    }

    const HandleSave = async () => {
        setLoadingSave(true)   // 👈 bật loading
        try {
            await axios.put(`${URL_BASE_API}/user`, {
                username: formData.username,
                fullname: formData.fullname
            }, { withCredentials: true })

            setIsEditing(false)
            showMessage('Thay đổi thông tin thành công!', 'success')
        } catch (err) {
            showMessage('Thay đổi thất bại, vui lòng nhập tên khác hoặc đăng nhập lại!', 'error')
        } finally {
            setLoadingSave(false) // 👈 tắt loading
        }
    }

    return (
        <form>
            <div>
                <label htmlFor='fullname'>Full name</label>
                <input
                    id='fullname'
                    placeholder='Full name'
                    value={formData.fullname}
                    disabled={!isEditing}
                    onChange={HandleChange}
                    className={isEditing ? 'active-change-user' : ''}
                />
            </div>

            <div>
                <label htmlFor='username'>Username</label>
                <input
                    id='username'
                    placeholder='Username'
                    value={formData.username}
                    disabled={!isEditing}
                    onChange={HandleChange}
                    className={isEditing ? 'active-change-user' : ''}
                />
            </div>

            <div>
                <label>Email</label>
                <input value={user.email} disabled />
            </div>

            <div>
                <label>Status account</label>
                <input
                    value={user.isPurchased === true ? 'Premium' : 'Trial'}
                    disabled
                />
            </div>

            <div>
                <label>Ngày hết hạn</label>
                <input
                    value={(new Date(user.expiredAt)).toLocaleString('vi-VN')}
                    disabled
                />
            </div>

            <div>
                <button
                    className={isEditing ? '' : 'user-edit-save'}
                    type='button'
                    onClick={HandleClick}
                    disabled={loadingSave} // disable khi đang loading
                >
                    {isEditing
                        ? (loadingSave ? 'ĐANG LƯU...' : 'LƯU')
                        : 'CHỈNH SỬA THÔNG TIN'}
                </button>
            </div>

            <div>
                <button type="button" onClick={() => setStatusUI(1)}>
                    THAY ĐỔI MẬT KHẨU
                </button>
            </div>
        </form>
    )
}

export default InfoUserCommon
