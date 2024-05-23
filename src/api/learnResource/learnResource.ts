import Ax from '@/api/index'
export const fetchAllEssayCategory = (params: any) =>
  Ax.get('/service-essay/essay/getCourseTypeAll', { params })

export const fetchEssayByCategory = (params: any) =>
  Ax.get('/service-essay/essay/getEssayByType', { params })

export const fetchEssaysByInfo = (params: any) =>
  Ax.post('/service-essay/essay/getEssaysByInfo', params)

export const fetchEssayDetailById = (params: any) =>
  Ax.get('/service-essay/essay/getEssayDetailById', { params })
