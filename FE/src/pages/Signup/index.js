import { use, useState } from 'react'
import axios from "axios"
import './Signup.scss'
import { URL_BASE_API } from '../../constants'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { showMessage } from '../../components/Message'

function Signup() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [otp, setOtp] = useState('')
    const navigate = useNavigate()
    const [loadingSignUp, setLoadingSignUp] = useState(false)
    const [loadingOtp, setLoadingOtp] = useState(false)

    const HandleSubmit = async () => {
        setLoadingSignUp(true)
        // check username valid
        if(username.includes('@') || username.includes('.'))
        {
            showMessage('Tên đăng nhập không chứ ký tự đặc biệt', 'success')
            return
        }
        try {
            await axios.post(`${URL_BASE_API}/otp/verify-otp`, {
                otp: otp,
                email: email
            })
        } catch (err) {
            showMessage('OTP not correct', 'error')
            return
        }

        // verify username, email, ...
        try {
            await axios.post(`${URL_BASE_API}/auth`, {
                username, email, password, loginMethod: 'username'
            })
            showMessage('Registration successful', 'success')
            navigate('/dashboard')
        }
        catch (err) {
            if (err.response && err.response.data) {
                showMessage(err.response.data.message, 'error');
            } else {
                showMessage("Something went wrong, please try again", 'error');
            }
        }
        setUsername('')
        setEmail('')
        setPassword('')
    }
    const HandleSendOtp = async () => {
        setLoadingOtp(true)
        try {
            await axios.post(`${URL_BASE_API}/otp/request-otp`, { email })
            showMessage('Sent OTP to your email!', 'success')
        } catch (err) {
            showMessage('Failed when send OTP', 'error')
        } finally {
            setLoadingOtp(false)
        }
    }
    const HandleSignUpWithGG = async () => {
        try {
            window.location.href = `${URL_BASE_API}/auth/google`
        } catch (e) {
            showMessage('Error when sign up with Google', 'error')
        }
    }
    return (
        <>
            <div className="login">
                <img src="/images/signup.svg" />
                <div className='form-login'>
                    <div className='title signup-title'>
                        <span className='webcome'>Welcome to </span>
                        <span className='unicalc'>UniCalc</span>
                    </div>

                    <div className='google-container'>
                        <button className='login-google' onClick={HandleSignUpWithGG}>
                            <img src='/images/gg.png' alt='google' className="google-icon" />
                            <span className='g'>Login with Google</span>
                        </button>
                    </div>

                    <div className="divider signup-divider">
                        <span>OR</span>
                    </div>

                    <form onSubmit={(e) => {
                        e.preventDefault();
                        HandleSubmit();
                    }}>

                        <div className='form-container signup'>
                            <div className='form-group'>
                                <i className="fa-solid fa-user-plus"></i>
                                <div className='input-group'>
                                    <label htmlFor='username'>Username</label>
                                    <input type='text' id='username' required
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className='form-container signup'>
                            <div className='form-group'>
                                <i className="fa-solid fa-envelope"></i>
                                <div className='input-group'>
                                    <label htmlFor='email'>Email</label>
                                    <input type='email' id='email' required
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className='form-container signup'>
                            <div className='form-group'>
                                <i className="fa-solid fa-key"></i>
                                <div className='input-group'>
                                    <label htmlFor='password'>Password</label>
                                    <input id='password' required type='password'
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className='form-container signup'>
                            <div className='form-group'>
                                <i className="fa-solid fa-lock"></i>
                                <div className='input-group'>
                                    <label htmlFor='OTP'>OTP</label>
                                    <input id='OTP' required
                                        onChange={(e) => setOtp(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    
                        <div className='extra-info'>
                            <Button
                                type="primary"
                                onClick={HandleSendOtp}
                                loading={loadingOtp}
                            >
                                {loadingOtp ? 'Sending OTP...' : 'Send OTP'}
                            </Button>
                        </div>

                        <div className='btn-submit-container'>
                            <button className='btn-submit' type="submit">
                                {loadingSignUp ? 'Signing up...' : 'Sign up'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Signup