import AdminApp from '@/views/Admin/AdminApp/AdminApp'
import Login from '@/views/Login/Login'
import OnlineClassroom3D from '@/views/OnlineClassroom3D/OnlineClassroom3D'
import UserApp from '@/views/User/UserApp/UserApp'
import React from 'react'
import { Navigate } from 'react-router-dom'

const withLoadingComponent = (comp: JSX.Element) => (
  <React.Suspense fallback={<div>loading...</div>}>{comp}</React.Suspense>
)
const RequireAuth = ({ children }: any) => {
  const token = localStorage.getItem('token')
  return token ? children : <Navigate to="/login" replace />
}
const routes = [
  {
    path: '/login',
    element: withLoadingComponent(<Login />)
  },
  {
    path: '/admin/*',
    element: withLoadingComponent(
      <RequireAuth>
        <AdminApp />
      </RequireAuth>
    )
  },
  // 3D课堂
  {
    path: '/onlineClassroom3D/:roomId',
    element: withLoadingComponent(<OnlineClassroom3D />)
  },
  {
    path: '/*',
    element: withLoadingComponent(<UserApp />)
  }
]

export default routes