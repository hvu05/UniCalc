import { useState } from 'react'
import './Login.scss'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { URL_BASE_API } from '../../constants'
import { showMessage } from '../../components/Message'

function Login() {
    const [usernameOrEmail, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    
    const HandleSubmitLogin = async () => {
        setLoading(true)
        if (password.length < 6) {
            showMessage("Password must be at least 6 characters long.", 'error')
            return
        }
        if (usernameOrEmail.length < 2) {
            showMessage("Username must be at least 3 characters long.", 'error')
            return
        }
        try {
            const user = await axios.post(`${URL_BASE_API}/auth/login`, {
                usernameOrEmail, password
            }, { withCredentials: true })
            if (user) {
                showMessage("Thành công!");
                navigate(`/dashboard`)
            }
            else {
                showMessage("Login failed! Because server", 'error')
            }

        } catch (error) {
            showMessage("Login failed! Please check your username and password.", 'error')
        }
        setLoading(false)
    }

    const HandleLoginWithGG = async () => {
        try {
            window.location.href = `${URL_BASE_API}/auth/google`
        } catch (e) {
            showMessage('Error when sign up with Google', 'error')
        }
    }
    return (
        <>
            <div className="login">
                <img className='logo' src="/images/login.svg" />
                <div className='form-login'>
                    <div className='title'>
                        <span className='webcome'>Welcome to </span>
                        <span className='unicalc'>UniCalc</span>
                    </div>

                    <div className='google-container'>
                        <button className='login-google' onClick={HandleLoginWithGG}>
                            <img src='/images/gg.png' alt='google' className="google-icon" />
                            <span className='g'>Login with Google</span>
                        </button>
                    </div>


                    <div className="divider">
                        <span>OR</span>
                    </div>

                    <form onSubmit={(e) => {
                        e.preventDefault();
                        HandleSubmitLogin();
                    }}>
                        <div className='form-container'>
                            <div className='form-group'>
                                <i className="fa-solid fa-envelope"></i>
                                <div className='input-group'>
                                    <label htmlFor='email'>Username</label>
                                    <input type='text' id='email' required
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className='form-container'>
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

                        <div className='extra-info'>
                            <div className='remember'>
                                <input type='checkbox' />
                                Remember me
                            </div>

                            <div className='forgot' onClick={() => navigate('/change-password')}>
                                Forgot password?
                            </div>
                        </div>

                        <div className='btn-submit-container'>
                            <button className='btn-submit' type="submit">
                                {loading ? 'Logging in...' : 'Log in'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login