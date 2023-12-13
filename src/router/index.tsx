import AdminApp from '@/views/Admin/AdminApp/AdminApp'
import UserApp from '@/views/User/UserApp/UserApp'
import React from 'react'

const withLoadingComponent = (comp: JSX.Element) => (
  <React.Suspense fallback={<div>loading...</div>}>{comp}</React.Suspense>
)
const routes = [
  {
    path: '/admin/*',
    element: withLoadingComponent(<AdminApp />)
  },
  {
    path: '/*',
    element: withLoadingComponent(<UserApp />)
  }
]

export default routes
