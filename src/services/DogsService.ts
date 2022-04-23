import http from '../helper/Http'
import {
  Dog,
  FavDog,
  FetchFavDogBodyData,
  SearchAllDogBodyData,
  SearchAllDogsByBreedBodyData,
} from '../interfaces/IDog'
import { AxiosResponse } from 'axios'

const SearchAllDogs = async (
  data: SearchAllDogBodyData
): Promise<AxiosResponse> => {
  return await http.get<Dog[]>('/images/search', { params: data })
}

const FetchBreeds = async (): Promise<AxiosResponse> => {
  return await http.get<Dog[]>('/breeds')
}

const SearchAllDogsByBreed = async (
  data: SearchAllDogsByBreedBodyData
): Promise<AxiosResponse> => {
  return await http.get<any>('/images/search', { params: data })
}
const FetchDogInfo = async (id: string | undefined): Promise<AxiosResponse> => {
  return await http.get<Dog[]>(`/images/${id}`)
}

const FavDogRequest = async (
  id: string | undefined
): Promise<AxiosResponse> => {
  return await http.post<FavDog>('/favourites', {
    image_id: `${id}`,
    sub_id: 'User-123',
  })
}
const DeleteFavDogRequest = async (id: string): Promise<AxiosResponse> => {
  return await http.delete<FavDog>(`/favourites/${id}`)
}

const FetchFavDogs = async (): Promise<AxiosResponse> => {
  return await http.get<FetchFavDogBodyData>('/favourites', {
    data: {
      limit: 3,
      order: 'DESC',
      page: 0,
    },
  })
}

const DogsService = {
  SearchAllDogs,
  FavDogRequest,
  FetchFavDogs,
  DeleteFavDogRequest,
  FetchDogInfo,
  FetchBreeds,
  SearchAllDogsByBreed,
}

export default DogsService
