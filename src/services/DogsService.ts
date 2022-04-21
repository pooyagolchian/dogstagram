import http from '../helper/Http'
import { Dog, FavDog } from '../interfaces/IDog'
import { AxiosResponse } from 'axios'

const FetchDogs = async (data: any): Promise<AxiosResponse> => {
  return await http.get<Dog[]>('/images/search', { params: data })
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

const GetFavDogs = async (): Promise<AxiosResponse> => {
  return await http.get<any>('/favourites', {
    data: {
      limit: 3,
      order: 'DESC',
      page: 0,
    },
  })
}

const DogsService = {
  FetchDogs,
  FavDogRequest,
  GetFavDogs,
  DeleteFavDogRequest,
}

export default DogsService
