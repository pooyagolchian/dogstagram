/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'
import { dogAction } from '../store/dogs'
import DogsService from '../services/DogsService'
import { useEffect } from 'react'
import { FavDogCard } from '../components/FavDogCard'
import { Loader } from '../components/Loader'

export const Favotites = () => {
  const favDogsList: any = useSelector(
    (state: RootState) => state?.dogs.favDogs
  )
  const isLoading: boolean = useSelector(
    (state: RootState) => state?.dogs.isLoading
  )
  const dispatch = useDispatch()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getFavDogs = async () => {
    await dispatch(dogAction.setLoader(true))
    const response = await DogsService.FetchFavDogs()
    await dispatch(dogAction.setLoader(false))
    dispatch(dogAction.setFavDogs(response?.data))
  }

  useEffect(() => {
    getFavDogs().catch((e) => {
      console.error('Error: ', e)
    })
  }, [])

  if (isLoading) {
    return (
      <div className="page-center col-1 m-0 m-auto">
        <Loader />
      </div>
    )
  }

  return <FavDogCard favDogItem={favDogsList} />
}
