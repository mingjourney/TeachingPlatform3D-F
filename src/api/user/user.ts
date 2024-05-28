import Ax from '@/api/index'
export const userInfo = (params: any) =>
  Ax.get('/service-user/users/info', params)
export const getUserCourseHistory = (params: any) =>
  Ax.get('/service-classroom/classroom/getUserCourseHistory', {
    params
  })
export const getUserFavorites = (params: any) =>
  Ax.get('/service-essay/essay/getUserFavorites', {
    params
  })
export const savePassword = (params: any) =>
  Ax.post('/service-user/users/savePassword', params)
