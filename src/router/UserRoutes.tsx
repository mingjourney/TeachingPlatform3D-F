import React, { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import ClassroomPage from '@/views/ClassroomPage/ClassroomPage'
import ClassroomExample from '@/views/ClassroomExample/ClassroomExample'
import ClassroomHome from '@/views/ClassroomHome/ClassroomHome'
import MyPage from '@/views/User/MyPage/MyPage'
import CourseRetracePanel from '@/views/User/CourseRetracePanel/CourseRetracePanel'

const Home = lazy(() => import('../views/User/Home/Home'))

const withLoadingComponent = (comp: JSX.Element) => (
  <React.Suspense fallback={<div>loading...</div>}>{comp}</React.Suspense>
)
const userRoutes = [
  {
    path: '/',
    element: <Navigate to="/home" />
  },
  {
    path: '/home',
    element: withLoadingComponent(<Home />)
  },
  {
    path: 'my',
    element: <Navigate to="/my/personal-center/dashboard" />
  },
  {
    path: 'my/*',
    element: withLoadingComponent(<MyPage />)
  },
  {
    path: 'classroom',
    element: <Navigate to="/classroom/home" />
  },
  {
    path: 'classroom',
    element: withLoadingComponent(<ClassroomPage />),
    children: [
      {
        path: 'home',
        element: withLoadingComponent(<ClassroomHome />)
      },
      {
        path: 'example',
        element: withLoadingComponent(<ClassroomExample />)
      }
    ]
  },
  {
    path: 'learnboard',
    element: withLoadingComponent(<CourseRetracePanel />)
  },
  {
    path: 'teachboard',
    element: withLoadingComponent(<CourseRetracePanel />)
  }
  // {
  //   path: '*',
  //   element: <Navigate to="/home" />
  // }
]

export default userRoutes
