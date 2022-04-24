import http from '../helper/Http'
import {
  Dog,
  FavDog,
  ParamsData,
  SearchAllDogsByBreedBodyData,
} from '../interfaces/IDog'
import { AxiosResponse } from 'axios'

const model = {
  limit: 3,
  order: 'DESC',
  page: 0,
}

const SearchAllDogs = async (data: ParamsData): Promise<AxiosResponse> => {
  return await http.get<Dog[]>('/images/search', { params: data })
}

const FetchBreeds = async (): Promise<AxiosResponse> => {
  return await http.get<Dog[]>('/breeds')
}

const SearchAllDogsByBreed = async (
  data: SearchAllDogsByBreedBodyData
): Promise<AxiosResponse> => {
  return await http.get<Dog[]>('/images/search', { params: data })
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
  return await http.get<FavDog>('/favourites', {
    data: model,
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
