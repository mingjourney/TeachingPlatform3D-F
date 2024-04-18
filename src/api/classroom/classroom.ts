import Ax from '@/utils/axiosInstance'
export const getAllClassroom = (params: any) =>
  Ax.get('/service-classroom/classroom/getAllClassroom', params)
