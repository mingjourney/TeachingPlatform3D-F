import React, { useState, useEffect, useRef } from 'react'
import * as vision from '@mediapipe/tasks-vision'
import { message } from 'antd'

const { FaceLandmarker, FilesetResolver, DrawingUtils } = vision

const EyeMovementTest = () => {
  const [loading, setLoading] = useState(false)
  const [faceLandmarks, setFaceLandmarks] = useState([])
  const videoRef = useRef()
  const outputCanvasRef = useRef()
  const faceLandmarkerRef = useRef(null)
  const drawingUtilsRef = useRef(null)
  const videoWidth = 960
  let lastVideoTime = -1
  let faceLandmarkerResult

  useEffect(() => {
    const initialize = async () => {
      try {
        setLoading(true)
        const filesetResolver = await FilesetResolver.forVisionTasks(
          'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm'
        )
        faceLandmarkerRef.current = await FaceLandmarker.createFromOptions(
          filesetResolver,
          {
            baseOptions: {
              modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task`,
              delegate: 'GPU'
            },
            outputFaceBlendshapes: true,
            runningMode: 'IMAGE',
            numFaces: 1
          }
        )
        setLoading(false)
      } catch (error) {
        console.error('Error initializing FaceLandmarker:', error)
        message.error(
          'Error initializing FaceLandmarker. Please try again later.'
        )
      }
    }

    initialize()

    // Cleanup function
    return () => {
      // Cleanup tasks, if any
    }
  }, [])

  useEffect(() => {
    const getUserMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true
        })
        videoRef.current.srcObject = stream
        videoRef.current.addEventListener('loadeddata', predictWebcam)
      } catch (error) {
        console.error('Error accessing camera:', error)
        message.error(
          'Error accessing camera. Please make sure camera access is allowed.'
        )
      }
    }

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      getUserMedia()
    } else {
      console.error('getUserMedia() is not supported by your browser')
      message.error('getUserMedia() is not supported by your browser')
    }

    // Cleanup function
    return () => {
      // Cleanup tasks, if any
    }
  }, [])

  const predictWebcam = () => {
    const { current: video } = videoRef
    const { current: outputCanvas } = outputCanvasRef
    const { current: faceLandmarker } = faceLandmarkerRef
    const { current: drawingUtils } = drawingUtilsRef

    if (!video || !outputCanvas || !faceLandmarker || !drawingUtils) return

    const radio = video.videoHeight / video.videoWidth
    video.style.width = `${videoWidth}px`
    video.style.height = `${videoWidth * radio}px`
    outputCanvas.style.width = `${videoWidth}px`
    outputCanvas.style.height = `${videoWidth * radio}px`
    outputCanvas.width = video.videoWidth
    outputCanvas.height = video.videoHeight

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
      )
      // Draw other landmarks similarly
    })
    if (faceLandmarkerResult && faceLandmarkerResult.faceLandmarks) {
      setFaceLandmarks(faceLandmarkerResult.faceBlendshapes[0].categories)
    }
    requestAnimationFrame(predictWebcam)
  }

  return (
    <div className="p-8">
      <p className="h-[100px] leading-[100px] text-2xl">眼动姿态测试</p>
      <div
        className="flex justify-between gap-10"
        style={{ position: 'relative' }}
      >
        <div className="border-2 border-black-400 text-center p-4">
          <div className="relative">
            <video ref={videoRef} width={videoWidth} autoPlay playsInline />
            <canvas
              ref={outputCanvasRef}
              className="output-canvas absolute left-0 top-0"
            />
          </div>
        </div>
        <div className="flex-1 border-2 border-black-400 p-4">
          {faceLandmarks.map((item, index) => (
            <div key={index} className="flex flex-col gap-4">
              {item.categoryName.includes('eye') && (
                <p
                  className={`my-1 py-2 ${
                    item.score > 0.2 ? 'bg-blue-100' : ''
                  }`}
                >
                  <span className="inline-block w-[150px]">
                    {item.categoryName}
                  </span>
                  : {item.score.toFixed(3)}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default EyeMovementTest
