import { Select, Space } from 'antd'
import React, { useEffect, useState } from 'react'
const WebRTCExample: React.FC = () => {
  const [imgList, setImgList] = useState<string[]>([])
  const [videoDeviceList, setVideoDeviceList] = useState<any>([
    { label: 'dd', value: 'dea' }
  ])

  const getLocalStream = async (constraints: MediaStreamConstraints) => {
    // 获取媒体流
    const stream = await navigator.mediaDevices.getUserMedia(constraints)
    playLocalStream(stream)
  }
  const playLocalStream = (stream: any) => {
    const videoEl = document.getElementById('localVideo') as HTMLVideoElement
    videoEl.srcObject = stream
  }
  const getDevices = async () => {
    const devices = await navigator.mediaDevices.enumerateDevices()
    const videoDevices = devices.filter(
      (device) => device.kind === 'videoinput'
    )
    const videoDevicesOption = videoDevices.map((item: any) => ({
      label: item.label,
      value: item.deviceId
    }))
    setVideoDeviceList(videoDevicesOption)
  }
  const handleCurVideoDeviceChange = (value: string) => {
    console.log('changevalue', value)
  }

  useEffect(() => {
    getDevices()
    getLocalStream({ video: { width: 192, height: 108 }, audio: false })
    // console.log(
    //   '🚀🚀🚀 / SupportedConstraints',
    //   navigator.mediaDevices.getSupportedConstraints()
    // )
  }, [])
  const takePhoto = () => {
    const videoEl = document.getElementById('localVideo') as HTMLVideoElement
    const canvas = document.createElement('canvas')
    canvas.width = videoEl.videoWidth
    canvas.height = videoEl.videoHeight
    const ctx = canvas.getContext('2d')!
    ctx.drawImage(videoEl, 0, 0, canvas.width, canvas.height)
    setImgList((preImgList) => [...preImgList, canvas.toDataURL('image/png')])
    console.log('🚀🚀🚀 / imgList', imgList)
  }
  return (
    <div>
      <h2>WebRTCExample</h2>
      <Select
        style={{ width: 120 }}
        options={[
          { value: 'jack', label: 'Jack' },
          { value: 'lucy', label: 'Lucy' },
          { value: 'Yiminghe', label: 'yiminghe' },
          { value: 'disabled', label: 'Disabled', disabled: true }
        ]}
      />
      <video id="localVideo" autoPlay playsInline muted></video>
      <button onClick={takePhoto}>拍照</button>
      <h3>拍照列表</h3>
      <Space wrap>
        <Select
          style={{ width: 120 }}
          onChange={handleCurVideoDeviceChange}
          options={videoDeviceList}
        ></Select>
      </Space>

      <div style={{ display: 'flex', gap: '1rem' }}>
        {imgList.map((item, index) => (
          <span key={index}>
            <h4>{index}</h4>
            <img src={item} alt={item} />
          </span>
        ))}
      </div>
    </div>
  )
}
export default WebRTCExample
