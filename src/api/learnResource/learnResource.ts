import Ax from '@/api/index'
export const fetchAllEssayCategory = (params: any) =>
  Ax.get('/service-essay/essay/getEssayTypeAll', { params })

export const fetchEssayByCategory = (params: any) =>
  Ax.get('/service-essay/essay/getEssayByType', { params })

export const fetchEssayDetailById = (params: any) =>
  Ax.get('/service-essay/essay/getEssayDetailById', { params })
