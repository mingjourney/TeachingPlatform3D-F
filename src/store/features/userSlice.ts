import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/store/store'
interface UserState {
  name: string
}

const initialState: UserState = {
  name: 'hh'
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveUser: (state, action: PayloadAction<UserState>) => {
      const { name } = action.payload
      state.name = name
    }
  }
})

export const { saveUser } = userSlice.actions
export const selectCount = (state: RootState) => state.counter.value
export default userSlice.reducer
