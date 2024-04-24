import Ax from '@/api/index'
export const loginUser = (params: any) =>
  Ax.post('/service-user/users/login', params)
