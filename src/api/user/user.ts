import Ax from '@/api/index'
export const userInfo = (params: any) =>
  Ax.get('/service-user/users/info', params)
