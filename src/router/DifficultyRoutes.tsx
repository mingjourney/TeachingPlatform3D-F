import React from 'react'
import BrowsingHistory from '@/views/BrowsingHistory/BrowsingHistory'
import { LaptopOutlined } from '@ant-design/icons'
import EyeTracker from '@/views/EyeTracker/EyeTracker'

const withLoadingComponent = (comp: JSX.Element) => (
  <React.Suspense fallback={<div>loading...</div>}>{comp}</React.Suspense>
)
const DifficultyRoutes = [
  {
    path: 'frontend-difficult',
    label: '前端难点',
    icon: <LaptopOutlined />,
    children: [
      {
        path: 'eye-tracker',
        label: 'tensorflow.js眼动识别',
        element: withLoadingComponent(<EyeTracker />)
      },
      {
        path: 'webRTC',
        label: 'WebRTC直播同步屏幕和摄像头',
        element: withLoadingComponent(<BrowsingHistory />)
      }
    ]
  }
]

export default DifficultyRoutes
