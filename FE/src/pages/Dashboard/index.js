import axios from 'axios'
import DashboardComponent from '../../components/DashboardComponent'
import GpaCalc from '../../components/GpaCalc'
import Profile from '../../components/Profile'
import { getTokenFromUrl } from '../../func/getTokenFromURL'
import './Dashboard.scss'
import { useState } from 'react'
import { URL_BASE_API } from '../../constants'
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'
import SePay from '../../components/SePay'

function Dashboard() {
    const [isOpen, setIsOpen] = useState(true)
    const [activeItem, setActiveItem] = useState('Dashboard')
    // const token = getTokenFromUrl()
    // localStorage.setItem('token', token)
    const navigate = useNavigate()
    const components = {
        'Dashboard': <DashboardComponent />,
        'GPA Calculator': <GpaCalc />,
        'profile': <Profile />,
        'sepay': <SePay />,
    }
    const HandleLogout = async () => {
        try {
            const result = await axios.post(`${URL_BASE_API}/auth/logout`, {}, { withCredentials: true })
            navigate('/')
        } catch (err) {
            message.error('Log Out System ERROR')
        }
    }
    return (
        <>
            <div className={`dashboard ${isOpen ? 'open' : 'closed'}`}>
                <aside className="sidebar">
                    <div className='logo-container'><img src='/images/logo.svg' /></div>

                    <div className='sidebar__item'>
                        <div
                            className={`item ${activeItem == 'Dashboard' ? 'item-active' : ''}`}
                            onClick={() => setActiveItem("Dashboard")}
                        >
                            <i class="fa-solid fa-house"></i> Dashboard
                        </div>

                        <div
                            className={`item ${activeItem == 'GPA Calculator' ? 'item-active' : ''}`}
                            onClick={() => setActiveItem("GPA Calculator")}
                        >
                            <i class="fa-solid fa-calculator"></i> GPA Calculator
                        </div>

                        {/* <div
                            className={`item ${activeItem == 'statistical' ? 'item-active' : ''}`}
                            onClick={() => setActiveItem("statistical")}
                        >
                            <i class="fa-solid fa-chart-simple"></i> Statistical
                        </div> */}

                        <div
                            className={`item ${activeItem == 'profile' ? 'item-active' : ''}`}
                            onClick={() => setActiveItem("profile")}
                        >
                            <i class="fa-solid fa-id-badge"></i> Profile
                        </div>
                        <div
                            className={`item ${activeItem == 'Setting' ? 'item-active' : ''}`}
                            onClick={() => setActiveItem("Setting")}
                        >
                            <i class="fa-solid fa-gear"></i> Setting
                        </div>

                        <div
                            className={`item ${activeItem == 'sepay' ? 'item-active' : ''}`}
                            onClick={() => setActiveItem("sepay")}
                        >
                            <i class="fa-solid fa-award"></i> To Premium
                        </div>

                        <div
                            className={`item  ${activeItem == 'Logout' ? 'item-active' : ''}`}
                            onClick={HandleLogout}
                        >
                            <i class="fa-solid fa-arrow-right-from-bracket"></i> Log out
                        </div>
                    </div>
                </aside>
                {!isOpen &&  <div
                    className='item-logout'
                    onClick={HandleLogout}
                >
                    <i class="fa-solid fa-arrow-right-from-bracket"></i> Log out
                </div>}

                <main className='main'>
                    <div className='header-main'>
                        <button onClick={() => setIsOpen(!isOpen)} className='button-control'>
                            {isOpen ?
                                <i class="fa-solid fa-backward"></i> :
                                <i class="fa-solid fa-bars"></i>
                            }
                        </button>

                        <button className='button-control avt'>
                            <i class="fa-solid fa-circle-user"></i>
                        </button>
                    </div>
                    {components[activeItem] || <p>Tính năng đang được phát triển</p>}


                </main>
            </div>
        </>
    )
}

export default Dashboard