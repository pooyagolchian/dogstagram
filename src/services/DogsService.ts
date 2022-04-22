import http from '../helper/Http'
import { Dog, FavDog } from '../interfaces/IDog'
import { AxiosResponse } from 'axios'

const SearchAllDogs = async (data: any): Promise<AxiosResponse> => {
  return await http.get<Dog[]>('/images/search', { params: data })
}

const FetchBreeds = async (): Promise<AxiosResponse> => {
  return await http.get<any>('/breeds')
}

const SearchAllDogsByBreed = async (data: any): Promise<AxiosResponse> => {
  return await http.get<any>('/images/search', { params: data })
}
const FetchDogInfo = async (id: any): Promise<AxiosResponse> => {
  return await http.get<Dog[]>(`/images/${id}`)
}

const FavDogRequest = async (id: string): Promise<AxiosResponse> => {
  return await http.post<FavDog>('/favourites', {
    image_id: `${id}`,
    sub_id: 'User-123',
  })
}
const DeleteFavDogRequest = async (id: string): Promise<AxiosResponse> => {
  return await http.delete<FavDog>(`/favourites/${id}`)
}

const FetchFavDogs = async (): Promise<AxiosResponse> => {
  return await http.get<any>('/favourites', {
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
