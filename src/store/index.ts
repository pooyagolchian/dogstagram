import { configureStore } from '@reduxjs/toolkit'
import dogsReducers from './dogs'

const store = configureStore({
  reducer: { dogs: dogsReducers },
})

export type RootState = ReturnType<typeof store.getState>

export default store
