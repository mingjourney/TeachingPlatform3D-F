import { useEffect, useState } from 'react'
import io from 'socket.io-client'
import { Button, Input, message } from 'antd'
const WebRTCExample2: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const [userId, setUserId] = useState('')
  const [roomId, setRoomId] = useState('')
  const [socket, setSocket] = useState('')
  const handleConnect = () => {
    messageApi.open({
      type: 'success',
      content: '连接成功'
    })
  }
  const init = () => {
    // 连接到信令服务
    setEio('https://localhost:3000')
    socket.on('connect', () => {
      handleConnect()
    })
    socket.on('disconnect', (reason) => {
      console.log('reason', reason)
      if (reason === 'transport close') {
        socket.connect()
      }
      messageApi.open({
        type: 'error',
        content: '你已断开连接'
      })
    })
    socket.on('error', (data) => {
      messageApi.open({
        type: 'error',
        content: data
      })
    })
    socket.on('welcome', (data) => {
      messageApi.open({
        type: 'success',
        content: (data.userId = userId
          ? '成功进入房间'
          : `欢迎${data.userId}进入房间`)
      })
    })
    socket.on('leave', (data) => {
      messageApi.open({
        type: 'warning',
        content: (data.userId = userId
          ? '成功离开房间'
          : `${data.userId}离开房间`)
      })
    })
    setUserId(Math.random().toString(30).substring(2))
    const roomId = 11
  }
  const joinRoom = () => {
    socket.emit('join', { userId, roomId })
  }
  const handleRoomIdChange = (value) => {
    setRoomId(value)
  }
  useEffect(() => {
    init()
  }, [])
  return (
    <div>
      {contextHolder}
      <h3>信令服务器WebRTC</h3>
      房间号:<Input onChange={handleRoomIdChange}></Input>
      <Button onClick={joinRoom}>加入房间</Button>
    </div>
  )
}
export default WebRTCExample2
