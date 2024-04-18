import Ax from '@/utils/axiosInstance'
export const loginUser = (params: any) =>
  Ax.post('/service-user/users/login', params)
