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
      video: { width: 198, height: 108 },
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
      <h2>WebRTCExample</h2>
      <h3>本地相机</h3>
      <video id="local" autoPlay playsInline muted></video>
      <h3>远程相机</h3>
      <video id="remote" autoPlay playsInline></video>
    </div>
  )
}
export default WebRTCExample
