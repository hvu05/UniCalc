import './footer.scss'
function Footer() {
    return (
        <>
            <div className="footer">
                <div className='content'>
                    <img src="/images/logo.svg" />
                    <div className='quick-link'>
                        <p>Quick Links</p>
                        <div className='link'>
                            <a>About</a>
                            <a>Blog</a>
                            <a>Course</a>
                            <a>Contact</a>
                        </div>
                    </div>
                    <div className='quick-link'>
                        <p>Contact us</p>
                        <div className='sdt'>
                            <i className="fa-solid fa-phone"></i>
                            <div>Đang cập nhật ...</div>
                        </div>
                        <div className='email'>
                            <i className="fa-solid fa-envelope"></i>
                            <div>adpagegpa123@gmail.com</div>    
                        </div>
                    </div>
                    <div className='address'>
                        <i className="fa-solid fa-location-dot"></i>
                        <div>Ho Chi Minh, Viet Nam</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer