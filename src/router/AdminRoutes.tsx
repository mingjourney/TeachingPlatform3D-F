import React from "react";

const withLoadingComponent = (comp: JSX.Element) => (
    <React.Suspense fallback={<div>loading...</div>}>{comp}</Reac.Suspense>
  )
const adminRoutes = [
    {
      path: '/',
      element: withLoadingComponent(<Dashboard />)
    },
    {
      path: '/user-management',
      element: withLoadingComponent(<UserManagement />)
    },
    {
      path: '/platform-analysis',
      element: withLoadingComponent(<PlatformAnalysis />)
    },
    {
      path: '/realtime-algorithm-optimization',
      element: withLoadingComponent(<RealtimeAlgorithmOptimization />)
    },
    {
      path: '/permissions',
      element: withLoadingComponent(<Permissions />),
      children: [
        {
          path: '/roles-management',
          element: withLoadingComponent(<RolesManagement />)
        },
        {
          path: '/permissions-management',
          element: withLoadingComponent(<PermissionsManagement />)
        }
      ]
    },
    {
      path: '/upload-resources',
      element: withLoadingComponent(<UploadResources />),
      children: [
        {
          path: '/classroom-template',
          element: withLoadingComponent(<ClassroomTemplate />)
        },
        {
          path: '/teacher-template',
          element: withLoadingComponent(<TeacherTemplate />)
        },
        {
          path: '/student-template',
          element: withLoadingComponent(<StudentTemplate />)
        }
      ]
    },
    {
      path: '/todo',
      element: withLoadingComponent(<Todo />)
    }
  ];
  export default adminRoutes;