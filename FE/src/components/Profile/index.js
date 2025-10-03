import { useState } from 'react'
import useInfoAUser from '../../func/getInfoAUser'
import './Profile.scss'
import { Steps } from 'antd'
import InfoUserCommon from './InfoUserCommon'
import OtpWithChangePassword from './OtpWithChangePassword'
import ConfirmPasswordProfile from './ConfirmPasswordProfile'

function Profile() {
    const [refresh, setRefresh] = useState(true)
    const { user, loading } = useInfoAUser(refresh)

    const [statusUI, setStatusUI] = useState(0)

    return (
        <>
            <p className='info-account'>THÔNG TIN TÀI KHOẢN</p>

            <div className='steps'>
                <Steps
                    size="small"
                    current={statusUI}
                    items={[
                        {
                            title: 'Thay đổi thông tin',
                        },
                        {
                            title: 'Xác thực OTP',
                        },
                        {
                            title: 'Thay đổi mật khẩu mới',
                        },
                    ]}
                />
            </div>

            {!loading &&
                <div className='profile-container'>
                    <div className="profile-user">
                        <div className='profile-avt'>
                            <img src='/images/Avatar.svg' alt='avatar' />
                            <p>{user.fullname}</p>
                            <div className='avt-email'>{user.email}</div>
                        </div>

                        {statusUI == 0 && <>

                            <InfoUserCommon
                                loading={loading}
                                user={user}
                                setStatusUI={setStatusUI}
                            />
                        </>}

                        {statusUI == 1 && <>
                            <button className='btn-back' onClick={() => setStatusUI(0)}>
                                <i class="fa-solid fa-backward"></i>
                            </button>
                            <OtpWithChangePassword
                                email={user.email}
                                setStatusUI={setStatusUI}
                                loading={loading}
                            />
                        </>}

                        {
                            statusUI == 2 && <>
                                <button className='btn-back' onClick={() => setStatusUI(1)}>
                                    <i class="fa-solid fa-backward"></i>
                                </button>
                                <ConfirmPasswordProfile
                                    email={user.email}
                                    setStatusUI={setStatusUI}
                                />
                            </>
                        }
                    </div>
                </div>}
        </>
    )
}

export default Profile