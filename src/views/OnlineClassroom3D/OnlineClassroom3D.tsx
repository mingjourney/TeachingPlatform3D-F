import { Button, Drawer, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import io, { Socket } from 'socket.io-client'

const OnlineclassNameroom3D: React.FC = () => {
  const { roomId } = useParams()
  console.log('id', roomId)
  const peerConnection = new RTCPeerConnection({
    iceServers: [
      {
        urls: 'stun:stun.voipbuster.com '
      }
    ]
  })

  const userId = Math.random().toString(36).substring(2)
  // const roomId = ref('3333')
  let socket: Socket
  let localStream: MediaStream
  let remoteStream: MediaStream
  let offerSdp = ''

  function initConnect() {
    socket = io('http://localhost:3000')
    // socket = io('https://signaling.fedtop.com')
    // socket = io('https://192.168.1.126:12345')

    // 连接成功时触发
    socket.on('connect', () => {
      handleConnect()
    })

    // 断开连接时触发
    socket.on('disconnect', (reason) => {
      if (reason === 'io server disconnect') {
        // 断线是由服务器发起的，重新连接。
        socket.connect()
      }
      message.warning('您已断开连接')
    })
    // 服务端发送报错信息
    socket.on('error', (data) => {
      message.error(data)
    })
    // 当有用户加入房间时触发
    socket.on('welcome', (data) => {
      message.success(
        data.userId === userId ? '成功加入房间' : `${data.userId}加入房间`
      )
    })
    // 当有用户离开房间时触发
    socket.on('leave', (data) => {
      message.warning(
        data.userId === userId ? '成功离开房间' : `${data.userId}离开房间`
      )
    })
    // 当有用户发送消息时触发
    socket.on('message', (data) => {
      console.log('message', data)
    })
    // 创建offer,发送给远端
    socket.on('createOffer', (data) => {
      console.log('createOffer', data)
      // 发送 offer
      if (offerSdp) {
        socket.emit('offer', {
          userId,
          roomId: roomId,
          sdp: offerSdp
        })
        return
      }
      createOffer()
    })
    // 收到offer,创建answer
    socket.on('offer', (data) => {
      createAnswer(data.sdp)
    })
    // 收到answer,设置远端sdp
    socket.on('answer', (data) => {
      addAnswer(data.sdp)
    })
  }

  // 连接成功
  function handleConnect() {
    socket.emit('join', { userId, roomId: roomId })
  }

  const init = async () => {
    const localVideo = document.getElementById('local') as HTMLVideoElement
    const remoteVideo = document.getElementById(
      'remote-video'
    ) as HTMLVideoElement
    localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false
    })
    remoteStream = new MediaStream()
    localVideo.srcObject = localStream
    remoteVideo.srcObject = remoteStream

    localStream.getTracks().forEach((track) => {
      peerConnection.addTrack(track, localStream)
    })

    peerConnection.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        remoteStream.addTrack(track)
      })
    }
    initConnect()
  }

  // 创建 offer
  async function createOffer() {
    // 当一个新的offer ICE候选人被创建时触发事件
    peerConnection.onicecandidate = async (event) => {
      if (event.candidate) {
        offerSdp = JSON.stringify(peerConnection.localDescription)
        // 发送 offer
        if (offerSdp) {
          socket.emit('offer', {
            userId,
            roomId: roomId,
            sdp: offerSdp
          })
        }
      }
    }
    const offer = await peerConnection.createOffer()
    await peerConnection.setLocalDescription(offer)
  }

  // 创建 answer
  async function createAnswer(val: string) {
    const offer = JSON.parse(val)
    peerConnection.onicecandidate = async (event) => {
      // 当一个新的 answer ICE candidate 被创建时
      if (event.candidate) {
        socket.emit('answer', {
          userId,
          roomId: roomId,
          sdp: JSON.stringify(peerConnection.localDescription)
        })
      }
    }
    await peerConnection.setRemoteDescription(offer)
    const answer = await peerConnection.createAnswer()
    await peerConnection.setLocalDescription(answer)
  }

  // 添加 answer
  async function addAnswer(answerSdp: string) {
    const answer = JSON.parse(answerSdp)
    if (!peerConnection.currentRemoteDescription) {
      peerConnection.setRemoteDescription(answer)
    }
  }

  // 打关摄像头
  const [cameraOpen, setCameraOpen] = useState(true)
  function handleCamera() {
    setCameraOpen(!cameraOpen)
    localStream.getVideoTracks().forEach((track) => {
      track.enabled = cameraOpen
    })
  }

  // 离开房间
  function handleLeave() {
    // 关闭对等连接
    peerConnection.close()
    // 发送离开的消息
    socket.emit('leave', { userId, roomId: roomId })
    // 关闭socket连接
    socket.disconnect()
  }

  useEffect(() => {
    init()
  })
  const [cemaraWindowOpen, setCemaraWindowOpen] = useState(false)

  const showDrawer = () => {
    setCemaraWindowOpen(true)
  }

  const onClose = () => {
    setCemaraWindowOpen(false)
  }
  return (
    <div className="flex flex-col">
      <Drawer
        title="摄像头和共享屏幕"
        onClose={onClose}
        open={cemaraWindowOpen}
        destroyOnClose={false}
      >
        <div className="w-20">
          <div className="video-title">远程视频</div>
          <video
            id="remote-video"
            className="remote-video"
            autoPlay
            playsInline
          ></video>
        </div>
        <div className="w-20">
          <div className="video-box">
            <div className="video-title">我</div>
            <video id="local" autoPlay playsInline></video>
            <div className="operation">
              <Button onClick={handleCamera}>
                {cameraOpen ? '关闭' : '打开'}视频
              </Button>
              <Button onClick={handleLeave}>离开</Button>
            </div>
          </div>
        </div>
      </Drawer>
      <div className="w-full text-center">教室编号：{roomId}</div>
      <div className="flex w-full">
        <Button type="primary" onClick={showDrawer}>
          Open
        </Button>
      </div>
    </div>
  )
}
export default OnlineclassNameroom3D
