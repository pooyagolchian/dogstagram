import { createSlice } from '@reduxjs/toolkit'
import { Dog, FavDog } from '../interfaces/IDog'

export interface DogsState {
  dogs: Dog[]
  favDogs: FavDog[]
  isLoading: boolean
}

const initialDogsState: DogsState = {
  dogs: [],
  favDogs: [],
  isLoading: false,
}

const dogSlice = createSlice({
  name: 'dogs',
  initialState: initialDogsState,
  reducers: {
    setDogs(state: DogsState, action: { payload: Dog[] }): void {
      state.dogs = action.payload
    },
    setFavDogs(state: DogsState, action: { payload: FavDog[] }): void {
      state.favDogs = action.payload
    },
    setLoader(state: DogsState, action: { payload: boolean }): void {
      state.isLoading = action.payload
    },
  },
})

export const dogAction = dogSlice.actions

export default dogSlice.reducer
