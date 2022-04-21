/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'
import { dogAction } from '../store/dogs'
import DogsService from '../services/DogsService'
import { useEffect } from 'react'
import { FavDogCard } from '../components/FavDogCard'

export const Favotites = () => {
  const favDogsList: any = useSelector(
    (state: RootState) => state?.dogs.favDogs
  )
  const dispatch = useDispatch()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getFavDogs = async () => {
    const response = await DogsService.GetFavDogs()
    dispatch(dogAction.setFavDogs(response?.data))
  }

  useEffect(() => {
    getFavDogs().catch((e) => {
      console.error('Error: ', e)
    })
  }, [])

  return <FavDogCard favDogItem={favDogsList} />
}
