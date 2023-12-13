import React from 'react'

import Favorates from '@/views/Favorates/Favorates'
import BrowsingHistory from '@/views/BrowsingHistory/BrowsingHistory'
import PersonalCenter from '@/views/PersonalCenter/PersonalCenter'

const withLoadingComponent = (comp: JSX.Element) => (
  <React.Suspense fallback={<div>loading...</div>}>{comp}</React.Suspense>
)
const UserRoutesPersonal = [
  {
    path: 'personal-center',
    children: [
      {
        path: 'dashboard',
        element: withLoadingComponent(<PersonalCenter />)
      },
      {
        path: 'browsing-history',
        element: withLoadingComponent(<BrowsingHistory />)
      },
      {
        path: 'favorites',
        element: withLoadingComponent(<Favorates />)
      }
    ]
  }
]

export default UserRoutesPersonal
