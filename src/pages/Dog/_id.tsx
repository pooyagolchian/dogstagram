/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import DogsService from '../../services/DogsService'
import { useDispatch } from 'react-redux'
import { dogAction } from '../../store/dogs'
import { useParams } from 'react-router-dom'
import { DogInfo } from '../../components/DogInfo'
export const Dog = () => {
  const dispatch = useDispatch()
  let { id } = useParams()
  const [dog, setDog] = useState([])

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

  return (
    <>
      <DogInfo dogInfo={dog} />
    </>
  )
}
