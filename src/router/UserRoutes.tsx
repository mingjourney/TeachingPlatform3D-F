import React, { lazy } from 'react'
import { Navigate } from 'react-router-dom'
// import ClassroomPage from '@/views/Classroom/ClassroomPage/ClassroomPage'
import ClassroomExample from '@/views/Classroom/ClassroomExample/ClassroomExample'
import ClassroomHome from '@/views/Classroom/ClassroomHome/ClassroomHome'
import MyPage from '@/views/User/MyPage/MyPage'
import Difficulty from '@/views/Difficulty/Difficulty'
import CourseRetracePanel from '@/views/User/CourseRetracePanel/CourseRetracePanel'
import ResourceBoard from '@/views/ResourceBoard/ResourceBoard'
import AddClassroom from '@/views/Classroom/AddClassroom/AddClassroom'
import CourseDetail from '@/views/CourseDetail/CourseDetail'
import { Spin } from 'antd'
const Home = lazy(() => import('../views/Home/Home'))

const withLoadingComponent = (comp: JSX.Element) => (
  <React.Suspense fallback={<Spin tip="Loading">loading</Spin>}>
    {comp}
  </React.Suspense>
)
interface routesType {
  path: string
  element?: JSX.Element
  label?: string
  children?: routesType[]
}
const userRoutes: routesType[] = [
  {
    path: '/',
    element: <Navigate to="/home" />
  },
  {
    path: '/home',
    label: '首页',
    element: withLoadingComponent(<Home />)
  },
  {
    path: 'classroom',
    label: '教室',
    children: [
      {
        path: '',
        element: withLoadingComponent(<ClassroomHome />)
      },
      {
        path: 'home',
        element: withLoadingComponent(<ClassroomHome />)
      },
      {
        path: 'example',
        element: withLoadingComponent(<ClassroomExample />)
      },
      {
        path: 'add',
        element: withLoadingComponent(<AddClassroom />)
      }
    ]
  },
  {
    path: 'learnboard',
    label: '学习面板',
    element: withLoadingComponent(<CourseRetracePanel />)
  },
  {
    path: 'resourceboard',
    label: '学习资源',
    children: [
      {
        path: '',
        element: withLoadingComponent(<ResourceBoard />)
      },
      {
        path: 'course/:courseId',
        element: withLoadingComponent(<CourseDetail />)
      }
    ]
  },
  {
    path: 'teachboard',
    label: '教学面板',
    element: withLoadingComponent(<CourseRetracePanel />)
  },
  {
    path: 'my',
    label: '我的',
    element: <Navigate to="/my/personal-center/dashboard" />
  },
  {
    path: 'my/*',
    element: withLoadingComponent(<MyPage />)
  },
  {
    path: 'difficulty',
    label: '技术点demo',
    element: <Navigate to="/difficulty/eye-tracker" />
  },
  {
    path: 'difficulty/*',
    element: withLoadingComponent(<Difficulty />)
  }
  // {
  //   path: '*',
  //   element: <Navigate to="/home" />
  // }
]

export default userRoutes
