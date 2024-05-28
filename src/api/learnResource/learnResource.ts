import Ax from '@/api/index'
export const fetchAllEssayCategory = (params: any) =>
  Ax.get('/service-essay/essay/getCourseTypeAll', { params })

export const fetchEssayByCategory = (params: any) =>
  Ax.get('/service-essay/essay/getEssayByType', { params })

export const fetchEssaysByInfo = (params: any) =>
  Ax.post('/service-essay/essay/getEssaysByInfo', params)

export const fetchEssayDetailById = (params: any) =>
  Ax.get('/service-essay/essay/getEssayDetailById', { params })

export const addUserFavorite = (params: any) =>
  Ax.post('/service-essay/essay/addUserFavorite', params)

export const deleteUserFavorite = (params: any) =>
  Ax.post('/service-essay/essay/deleteUserFavorite', params)

export const addComment = (params: any) =>
  Ax.post('/service-essay/essay/addComment', params)

export const getComments = (params: any) =>
  Ax.get('/service-essay/essay/getComments', { params })

export const getCommendEssay = (params: any) =>
  Ax.get('/service-essay/essay/getEssayCommendByUser', { params })
