/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import DogsService from '../../services/DogsService'
import { useDispatch, useSelector } from 'react-redux'
import { dogAction } from '../../store/dogs'
import { useParams } from 'react-router-dom'
import { DogInfo } from '../../components/DogInfo'
import { Loader } from '../../components/Loader'
import { RootState } from '../../store'
import { Dog } from '../../interfaces/IDog'

export const DogDetails = () => {
  const dispatch = useDispatch()
  let { id } = useParams()
  const [dog, setDog] = useState<Dog[]>([])
  const isLoading: boolean = useSelector(
    (state: RootState) => state?.dogs.isLoading
  )

  useEffect(() => {
    const getDogs = async () => {
      await dispatch(dogAction.setLoader(true))
      const response = (await DogsService.FetchDogInfo(id))?.data
      setDog(response)
      await dispatch(dogAction.setDogs(response?.data))
      await dispatch(dogAction.setLoader(false))
    }

    getDogs().catch((e) => {
      console.error(e)
    })
  }, [])

  if (isLoading) {
    return (
      <div className="page-center col-1 m-0 m-auto">
        <Loader />
      </div>
    )
  }

  return (
    <>
      <DogInfo dogInfo={dog} />
    </>
  )
}
