import Ax from '@/api/index'
export const getAllClassroom = (params: any) =>
  Ax.get('/service-classroom/classroom/getAllClassroom', { params: { params } })
export const getClassroomDetailById = (params: any) =>
  Ax.get('/service-classroom/classroom/getClassroomDetailById', {
    params
  })
export const addClassroom = (params: any) =>
  Ax.post('/service-classroom/classroom/addClassroom', params)
