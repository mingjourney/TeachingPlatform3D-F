import React from 'react'

import Favorites from '@/views/Favorites/Favorites'
import BrowsingHistory from '@/views/BrowsingHistory/BrowsingHistory'
import PersonalCenter from '@/views/PersonalCenter/PersonalCenter'
import { LaptopOutlined } from '@ant-design/icons'
import { Spin } from 'antd'

const withLoadingComponent = (comp: JSX.Element) => (
  <React.Suspense fallback={<Spin tip="Loading">loading</Spin>}>
    {comp}
  </React.Suspense>
)
const UserRoutesPersonal = [
  {
    path: 'personal-center',
    label: '个人中心',
    icon: <LaptopOutlined />,
    children: [
      {
        path: 'dashboard',
        label: '个人中心概览',
        element: withLoadingComponent(<PersonalCenter />)
      },
      {
        path: 'browsingHistory',
        label: '浏览记录',
        element: withLoadingComponent(<BrowsingHistory />)
      },
      {
        path: 'favorites',
        label: '收藏夹',
        element: withLoadingComponent(<Favorites />)
      }
    ]
  }
]

export default UserRoutesPersonal
