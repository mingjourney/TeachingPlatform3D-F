import { Button, Drawer, message } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import io, { Socket } from 'socket.io-client'
import ThreeScene from '../Three/ThreeScene/ThreeScene'
import { getClassroomDetailById } from '@/api/classroom/classroom'
import { getUserInfo } from '@/utils/userHelper'

const OnlineclassNameroom3D: React.FC = () => {
  const { roomId } = useParams()
  const [rowColumn, setRowColumn] = useState({ rows: 0, columns: 0 })
  const localVideoRef = useRef<HTMLVideoElement>(null)
  const remoteVideoRef = useRef<HTMLVideoElement>(null)
  const [localStream, setLocalStream] = useState<MediaStream | null>(null)
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null)
  const [cameraOpen, setCameraOpen] = useState(true)
  const peerConnection = new RTCPeerConnection({
    iceServers: [
      {
        urls: 'stun:stun.voipbuster.com '
      }
    ]
  })
  const fetchClassroomDetail = async (id: number) => {
    const {
      data: { rows, columns }
    } = await getClassroomDetailById({ id })
    setRowColumn({ rows, columns })
  }
  useEffect(() => {
    fetchClassroomDetail(roomId)
  }, [])
  const { id: userId } = getUserInfo()
  // const roomId = ref('3333')
  let socket: Socket
  let offerSdp = ''
  function initConnect() {
    socket = io('http://localhost:3456')
    // socket = io('https://signaling.fedtop.com')

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

  useEffect(() => {
    console.log('gggg')
    const leaveWhenClose = () => {
      if (peerConnection) {
        peerConnection.close()
      }
      if (socket) {
        console.log('leave')
        socket.emit('leave', { userId, roomId })
        socket.disconnect()
      }
    }
    leaveWhenClose()
    const init = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false
        })
        setLocalStream(stream)
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream
        }

        const pc = new RTCPeerConnection()
        pc.ontrack = (event) => {
          const remoteStream = new MediaStream()
          event.streams[0]
            .getTracks()
            .forEach((track) => remoteStream.addTrack(track))
          setRemoteStream(remoteStream)
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = remoteStream
          }
        }

        stream.getTracks().forEach((track) => {
          pc.addTrack(track, stream)
        })

        // 初始化连接
        console.log('调用initConnect')

        initConnect()
      } catch (error) {
        console.error('Error accessing media devices.', error)
      }
    }

    init()

    // cleanup
    return () => {
      console.log('leave')
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop())
      }
      if (peerConnection) {
        peerConnection.close()
      }
      if (socket) {
        socket.emit('leave', { userId, roomId })
        socket.disconnect()
      }
    }
  }, [])

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
  function handleCamera() {
    setCameraOpen(!cameraOpen)
    localStream!.getVideoTracks().forEach((track) => {
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
        title="数据情况"
        onClose={onClose}
        open={cemaraWindowOpen}
        destroyOnClose={false}
      >
        <div className="w-20">
          <div className="video-title">远程视频</div>
          <video
            id="remote-video"
            ref={remoteVideoRef}
            className="remote-video"
            autoPlay
            playsInline
          ></video>
        </div>
        <div className="w-20">
          <div className="video-box">
            <div className="video-title">我</div>
            <video ref={localVideoRef} autoPlay playsInline></video>
            <div className="operation">
              <Button onClick={handleCamera}>
                {cameraOpen ? '关闭' : '打开'}视频
              </Button>
              <Button onClick={handleLeave}>离开</Button>
            </div>
          </div>
        </div>
      </Drawer>
      <div className="absolute w-full text-center ">教室编号：{roomId}</div>
      <div className="absolute w-full p-4">
        <Button onClick={showDrawer}>打开摄像头页面</Button>
        {userId}
      </div>
      <ThreeScene rows={rowColumn.rows} columns={rowColumn.columns} />
    </div>
  )
}
export default OnlineclassNameroom3D
