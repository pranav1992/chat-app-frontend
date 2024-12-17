import { configureStore } from '@reduxjs/toolkit'
import userReduces from './slices/userSlice'

export const store = configureStore({
  reducer: {user: userReduces},
})