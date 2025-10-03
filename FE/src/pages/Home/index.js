import { useNavigate } from 'react-router-dom'
import Footer from '../../components/Footer'
import './home.scss'
import AboutUs from '../../components/About-us'
import Contact from '../../components/Contact'
function Home() {
    const navigate = useNavigate()
    const HandleSignUp = () => {
        navigate('/sign-up')
    }
    const HandleLogIn = () => {
        navigate('/log-in')
    }
    return (
        <>
            <nav className='nav'>
                <div className='content'>
                    <img src='/images/logo.svg' alt='Logo' onClick={() => navigate('/')}/>
                    <div className='info'>
                        <div className='link'>
                            <a>About us</a>
                            <a>Contact</a>
                        </div>
                        <div className='group-btn'>
                            <button className='btn-signup' onClick={HandleSignUp}>Sign up</button>
                            <button className='btn-login' onClick={HandleLogIn}>Log in</button>
                        </div>
                    </div>
                </div>
            </nav>

            <div className='hero'>
                <div className='content'>
                    <div className='intro'>
                        <p className='title'>Knowledge for everyone, everywhere.</p>
                        <p className='sub-title'>Accessible education for all.</p>
                    </div>
                    <img src='/images/homepage.svg' />
                </div>
            </div>
{/* 
            <div className='aboutme'>
                <div className='height-button'>
                    <button className='btn-homepage'>About us</button>
                </div>

                <AboutUs />
            </div>

            <div className='contact'>
                <div className='height-button'>
                    <button className='btn-homepage'>Contact</button>
                </div>

                <Contact />
            </div> */}

            <Footer />
        </>
    )
}
export default Home