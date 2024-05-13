import { createSlice, PayloadAction } from '@reduxjs/toolkit'
interface UserState {
  id: number
  nickname: string
  role: string
}

const initialState: UserState = {
  id: 999,
  nickname: '未登录',
  role: ''
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveUser: (state, action: PayloadAction<UserState>) => {
      return { ...state, ...action.payload }
    }
  }
})

export const { saveUser } = userSlice.actions
export default userSlice.reducer
