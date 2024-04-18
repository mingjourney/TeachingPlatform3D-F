import React from 'react'
import WebRTCExample from '../WebRTCExample/WebRTCExample'
import 'webrtc-adapter'

const CourseRetracePanel: React.FC = () => {
  return (
    <div>
      <h1 className="text-lg">难点功课测试阶段 成果展示</h1>
      <WebRTCExample />
    </div>
  )
}
export default CourseRetracePanel
