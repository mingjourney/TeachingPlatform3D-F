import React, { useState, useEffect } from 'react'
import * as vision from '@mediapipe/tasks-vision'
import { message } from 'antd'
interface Props {
  handleTurnHead: any
}
const FaceTracker: React.FC<Props> = ({ handleTurnHead }) => {
  const { FaceLandmarker, FilesetResolver, DrawingUtils } = vision
  let outPutCanvas: HTMLCanvasElement
  let outPutCanvasCtx: CanvasRenderingContext2D
  let faceLandmarker: vision.FaceLandmarker
  let runningMode: 'IMAGE' | 'VIDEO' = 'IMAGE'
  let video: HTMLVideoElement
  let drawingUtils: vision.DrawingUtils

  useEffect(() => {
    video = document.getElementById('webcam') as HTMLVideoElement
    outPutCanvas = document.querySelector('#output-canvas') as HTMLCanvasElement
    outPutCanvasCtx = outPutCanvas.getContext('2d')!
    drawingUtils = new DrawingUtils(outPutCanvasCtx)
  }, [])

  async function createFaceLandmarker() {
    const filesetResolver = await FilesetResolver.forVisionTasks(
      'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm'
    )
    faceLandmarker = await FaceLandmarker.createFromOptions(filesetResolver, {
      baseOptions: {
        // modelAssetPath,
        modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task`,
        // modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task`,
        delegate: 'CPU'
      },
      outputFaceBlendshapes: true,
      runningMode,
      numFaces: 1
    })
  }

  const [faceLandmarks, setFaceLandmarks] = useState<any[]>([])
  const videoWidth = 300
  let lastVideoTime = -1
  let faceLandmarkerResult: vision.FaceLandmarkerResult
  async function predictWebcam() {
    if (!faceLandmarker) {
      message.error('Wait for faceLandmarker to load before clicking!')
      return
    }
    const radio = video.videoHeight / video.videoWidth
    video.style.width = `${videoWidth}px`
    video.style.height = `${videoWidth * radio}px`
    outPutCanvas.style.width = `${videoWidth}px`
    outPutCanvas.style.height = `${videoWidth * radio}px`
    outPutCanvas.width = video.videoWidth
    outPutCanvas.height = video.videoHeight

    runningMode = 'VIDEO'
    faceLandmarker.setOptions({ runningMode })

    const nowInMs = Date.now()
    if (lastVideoTime !== video.currentTime) {
      lastVideoTime = video.currentTime
      faceLandmarkerResult = faceLandmarker.detectForVideo(video, nowInMs)
    }
    faceLandmarkerResult.faceLandmarks.forEach((landmarks) => {
      drawingUtils.drawConnectors(
        landmarks,
        FaceLandmarker.FACE_LANDMARKS_TESSELATION,
        { color: '#FFA500', lineWidth: 1 }
      ) // Orange
      drawingUtils.drawConnectors(
        landmarks,
        FaceLandmarker.FACE_LANDMARKS_RIGHT_EYE,
        { color: '#800080' }
      ) // Purple
      drawingUtils.drawConnectors(
        landmarks,
        FaceLandmarker.FACE_LANDMARKS_RIGHT_EYEBROW,
        { color: '#FFFF00' }
      ) // Yellow
      drawingUtils.drawConnectors(
        landmarks,
        FaceLandmarker.FACE_LANDMARKS_LEFT_EYE,
        { color: '#008080' }
      ) // Teal
      drawingUtils.drawConnectors(
        landmarks,
        FaceLandmarker.FACE_LANDMARKS_LEFT_EYEBROW,
        { color: '#FF6347' }
      ) // Tomato
      drawingUtils.drawConnectors(
        landmarks,
        FaceLandmarker.FACE_LANDMARKS_FACE_OVAL,
        { color: '#00FF00' }
      ) // Lime
      drawingUtils.drawConnectors(
        landmarks,
        FaceLandmarker.FACE_LANDMARKS_LIPS,
        { color: '#0000FF' }
      ) // Blue
      drawingUtils.drawConnectors(
        landmarks,
        FaceLandmarker.FACE_LANDMARKS_RIGHT_IRIS,
        { color: '#FFFFE0' }
      ) // Ivory
      drawingUtils.drawConnectors(
        landmarks,
        FaceLandmarker.FACE_LANDMARKS_LEFT_IRIS,
        { color: '#800000' }
      ) // Maroon
    })
    if (faceLandmarkerResult && faceLandmarkerResult.faceLandmarks)
      setFaceLandmarks(faceLandmarkerResult.faceBlendshapes[0].categories)
    // window.requestAnimationFrame(predictWebcam)
    setTimeout(predictWebcam, 300) // Adjust the delay as needed
  }
  useEffect(() => {
    console.log('faceLandmarks', faceLandmarks)
    const turnLeftHeadScore = faceLandmarks.find(
      (item) => item.categoryName === 'eyeLookOutLeft'
    )?.score
    const turnRightHeadScore = faceLandmarks.find(
      (item) => item.categoryName === 'eyeLookOutRight'
    )?.score
    if (turnLeftHeadScore && turnRightHeadScore) {
      handleTurnHead(turnRightHeadScore - turnLeftHeadScore)
    }
  }, [faceLandmarks])
  function hasGetUserMedia() {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)
  }

  async function getUserMedia() {
    if (!hasGetUserMedia()) {
      message.error('getUserMedia() is not supported by your browser')
      return
    }
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true
    })
    video.srcObject = stream
    video.addEventListener('loadeddata', predictWebcam)
  }
  const init = async () => {
    await createFaceLandmarker()
    await getUserMedia()
  }
  useEffect(() => {
    init()
    return () => {
      if (video && video.srcObject) {
        const stream = video.srcObject as MediaStream
        stream.getTracks().forEach((track) => track.stop())
        video.srcObject = null
      }
      video.removeEventListener('loadeddata', predictWebcam)
    }
  }, [])
  return (
    <div className="p-2">
      <div className="flex flex-col gap-10">
        <div className="">
          <div className="relative">
            <video id="webcam" autoPlay playsInline></video>
            <canvas
              id="output-canvas"
              className="output-canvas absolute left-0 top-0"
            ></canvas>
          </div>
        </div>
        <div className="flex-1">
          {faceLandmarks.map((mark, index) => (
            <div className="flex flex-col gap-4" key={index}>
              {mark.categoryName.includes('eye') && (
                <p
                  className={`my-1 py-2 ${
                    mark.score > 0.2 ? 'bg-blue-100' : ''
                  }`}
                >
                  <span className="inline-block w-[150px]">
                    {mark.categoryName}
                  </span>
                  :<span>{mark.score.toFixed(3)}</span>
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
export default FaceTracker
