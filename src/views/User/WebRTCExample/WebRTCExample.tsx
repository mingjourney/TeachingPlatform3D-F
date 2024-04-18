import React, { useEffect, useState } from 'react'
const WebRTCExample: React.FC = () => {
  // 内网中用
  const pc = new RTCPeerConnection({
    iceServers: [
      {
        urls: 'stun:stun.voipbuster.com'
      }
    ]
  })!
  const [offerSdp, setOfferSdp] = useState<string>('')
  const [answerSdp, setAnswerSdp] = useState<string>('')
  const init = async () => {
    const videoLocal = document.getElementById('local') as HTMLVideoElement
    const videoRemote = document.getElementById('remote') as HTMLVideoElement
    const localStream = await navigator.mediaDevices.getUserMedia({
      video: { width: 300, height: 150 },
      audio: false
    })
    videoLocal.srcObject = localStream
    localStream.getTracks().forEach((track) => {
      pc.addTrack(track, localStream)
    })
    pc.ontrack = (event) => {
      videoRemote.srcObject = event.streams[0]
    }
  }
  const connection = async () => {
    const offer = await pc.createOffer()
    await pc.setLocalDescription(offer)
    pc.onicecandidate = async (event) => {
      if (event.candidate) {
        setOfferSdp(JSON.stringify(pc.localDescription))
      }
    }
    console.log('pc', pc.localDescription)
  }
  const createAnswer = async () => {
    // 解析字符串
    console.log()
    const offer = JSON.parse(offerSdp)
    pc.onicecandidate = async (event) => {
      // Event that fires off when a new answer ICE candidate is created
      if (event.candidate) {
        setAnswerSdp(JSON.stringify(pc.localDescription))
      }
    }
    await pc.setRemoteDescription(offer)
    const answer = await pc.createAnswer()
    await pc.setLocalDescription(answer)
  }
  const addAnswer = async () => {
    const answer = JSON.parse(answerSdp)
    if (!pc.currentRemoteDescription) {
      pc.setRemoteDescription(answer)
    }
  }
  useEffect(() => {
    async function webRTC() {
      await init()
      await connection()
      await createAnswer()
      await addAnswer()
    }
    webRTC()
  }, []) // 报错 仅允许在异步函数和模块顶级使用 "await" 表达式。ts(1308)
  return (
    <div>
      <div className="m-4"></div>

      <h2 className="text-lg">P2P测试</h2>
      <div className="m-4"></div>

      <h3>本地相机</h3>
      <div className="m-4"></div>

      <video
        id="local"
        autoPlay
        playsInline
        muted
        className="border border-gray-300"
      ></video>
      <div className="m-4"></div>

      <h3>远程相机</h3>
      <div className="m-4"></div>

      <video
        id="remote"
        autoPlay
        playsInline
        className="border border-gray-300"
      ></video>
      <div className="m-4"></div>
      <a
        href="https://localhost:54321/test-eye-tracker-video"
        className=" text-sky-600"
      >
        眼动上身姿态单机测试
      </a>
      <div className="m-4"></div>

      <a
        href="https://localhost:54321/test-signaling-p2p"
        className=" text-sky-600"
      >
        信服服务器webRTC共享室
      </a>
    </div>
  )
}
export default WebRTCExample
