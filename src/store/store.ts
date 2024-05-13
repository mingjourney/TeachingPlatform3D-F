import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './features/counterSlice'
import messageReducer from './features/messageSlice'
import userReducer from './features/userSlice'
import { combineReducers } from 'redux'
import { persistReducer, persistStore } from 'redux-persist'
import storageSession from 'redux-persist/lib/storage/session' //sessionStorage
//import storageLocation  from 'redux-persist/lib/storage'; //存储到localStorage
const persistConfig = {
  key: 'root',
  storage: storageSession //指定存储到session中
}
const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    //数据切片
    counter: counterReducer,
    message: messageReducer,
    user: userReducer
  })
)
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})
export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
