import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './features/counterSlice'
import messageReducer from './features/messageSlice'
import userReducer from './features/userSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    message: messageReducer,
    user: userReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
