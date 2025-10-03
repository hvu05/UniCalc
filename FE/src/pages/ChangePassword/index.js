import { useState } from 'react'
import './ChangePassword.scss'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { URL_BASE_API } from '../../constants'
import { Button } from 'antd'
import { showMessage } from '../../components/Message'

function ChangePassword() {
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [loadingSendOtp, setLoadingSendOtp] = useState(false)
  const [loadingSubmit, setLoadingSubmit] = useState(false)
  const [sendOtp, setSendOtp] = useState(false)
  const navigate = useNavigate()

  const HandleSendOtp = async () => {
    setLoadingSendOtp(true)
    if (!email) {
      showMessage('Please enter a valid email address.', 'error')
      setLoadingSendOtp(false)
      return
    }
    try {
      await axios.post(`${URL_BASE_API}/otp/request-otp`, { email })
      showMessage('Sent OTP to your email!', 'success')
      setSendOtp(true) // check nếu đã gửi OTP thì hiện ô nhập otp lên
    } catch (err) {
      showMessage('Failed when sending OTP', 'error')
    } finally {
      setLoadingSendOtp(false)
    }
  }

  const HandeSubmit = async () => {
    try {
      setLoadingSubmit(true)
      const data = await axios.post(`${URL_BASE_API}/otp/verify-otp`, {
        otp: otp,
        email: email,
      })
      navigate('/change-password/set-new-password', { state: { email: email } })
    } catch (err) {
      showMessage('OTP not correct', 'error')
    } finally {
      setLoadingSubmit(false)
    }
  }

  return (
    <div className="login">
      <img src="/images/change-password.svg" />
      <div className="form-login">
        <div className="title">
          <span className="webcome">Welcome to </span>
          <span className="unicalc">UniCalc</span>
        </div>

        <form>
          <div style={{ marginLeft: '100px' }}>
            Nhập email để nhận mã otp
          </div>
          <div className="form-container">
            <div className="form-group">
              <i className="fa-solid fa-envelope"></i>
              <div className="input-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  required
                  placeholder="exampleUsername"
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={sendOtp}
                />
              </div>
            </div>
          </div>

          {!sendOtp &&
            <div className="extra-info">
              {/* Antd Button với loading */}
              <Button
                type="primary"
                onClick={HandleSendOtp}
                loading={loadingSendOtp}
              >
                {loadingSendOtp ? 'Sending OTP...' : 'Send OTP'}
              </Button>
            </div>
          }

          {sendOtp &&
            <div className="form-container">
              <div className="form-group">
                <i className="fa-solid fa-key"></i>
                <div className="input-group">
                  <label htmlFor="otp">OTP</label>
                  <input
                    id="otp"
                    required
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>
              </div>
            </div>
          }


        </form>

        <div className="btn-submit-container">
          <Button
            type="primary"
            className="btn-submit"
            onClick={HandeSubmit}
            loading={loadingSubmit}
          >
            {loadingSubmit ? 'Submitting...' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ChangePassword
