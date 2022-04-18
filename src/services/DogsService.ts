import http from '../helper/Http'
import { Dog, FavDog, GetFavDog } from '../interfaces/IDog'
import { AxiosResponse } from 'axios'

const FetchDogs = async (): Promise<AxiosResponse> => {
  return await http.get<Dog[]>('/breeds')
}

const FavDogRequest = async (id: string): Promise<AxiosResponse> => {
  return await http.post<FavDog>('/favourites', {
    image_id: `${id}`,
    sub_id: 'your-user-1234',
  })
}
const DeleteFavDogRequest = async (id: string): Promise<AxiosResponse> => {
  return await http.delete<FavDog>(`/favourites/${id}`)
}

const GetFavDogs = async (): Promise<AxiosResponse> => {
  return await http.get<GetFavDog>('/favourites')
}

const DogsService = {
  FetchDogs,
  FavDogRequest,
  GetFavDogs,
  DeleteFavDogRequest,
}

export default DogsService
