import { useRef, useEffect, useState } from 'react'
import useInfoAUser from '../../func/getInfoAUser'
import io from "socket.io-client"
import { message, Card, Spin, Typography } from 'antd'
import { CheckCircleTwoTone } from '@ant-design/icons'

const { Title, Text } = Typography

const host = process.env.BACKEND_URL

function SePay() {
    const socketRef = useRef()
    const [statusPayment, setStatusPayment] = useState(false)
    const { user, loading } = useInfoAUser()

    const bankCode = 'BIDV'
    const accountNumber = '96247N8F3Q'
    const amount = 10000
    const transferContent = user?._id || 'GUEST'
    const qrUrl = `https://qr.sepay.vn/img?acc=${accountNumber}&bank=${bankCode}&amount=${amount}&des=${transferContent}`

    useEffect(() => {
        socketRef.current = io(host)

        socketRef.current.on('payment_success', (res) => {
            message.success('Thanh toán thành công')
            setStatusPayment(true)
        })

        return () => {
            socketRef.current.disconnect()
        }
    }, [])

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
                <Spin tip="Đang tải thông tin..." size="large" />
            </div>
        )
    }

    const isPaid = statusPayment || user?.isPurchased

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh', background: '#f5f5f5' }}>
            <Card style={{ width: 380, textAlign: 'center', borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                {!isPaid ? (
                    <>
                        <Title level={4}>Thanh toán đơn hàng</Title>
                        <Text type="secondary">Quét mã QR để thanh toán <b>{amount.toLocaleString()}₫</b></Text>
                        <div style={{ margin: '20px 0' }}>
                            <img src={qrUrl} alt="qr" style={{ width: 200, height: 200, border: '1px solid #eee', borderRadius: 8 }} />
                        </div>
                        <Text type="secondary">Ngân hàng: <b>{bankCode}</b></Text><br />
                        <Text type="secondary">Tài khoản: <b>{accountNumber}</b></Text><br />
                        <Text type="secondary">Nội dung: <b>{transferContent}</b></Text>
                    </>
                ) : (
                    <>
                        <CheckCircleTwoTone twoToneColor="#52c41a" style={{ fontSize: 60, marginBottom: 16 }} />
                        <Title level={4}>Thanh toán thành công</Title>
                        <Text type="secondary">Cảm ơn bạn đã mua hàng 🎉</Text>
                        <br/>
                        <Text type="secondary">Bạn sẽ nhận được mọi đặc quyền của thành viên Premiun</Text>
                    </>
                )}
            </Card>
        </div>
    )
}

export default SePay
