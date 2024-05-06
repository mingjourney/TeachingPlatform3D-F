export const getUserInfo = () => {
  return JSON.parse(sessionStorage.getItem('userInfo') || '')
}
