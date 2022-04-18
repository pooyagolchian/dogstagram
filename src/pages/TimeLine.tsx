import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import { dogAction } from '../store/dogs'
import DogsService from '../services/DogsService'
import { DogCard } from '../components/DogCard'
import { SVGLoader } from '../components/SVGLoader'
import { Dog } from '../interfaces/IDog'
import { RootState } from '../store'

export const TimeLine = () => {
  const dogs: Dog[] = useSelector((state: RootState) => state?.dogs.dogs)
  const isLoading: boolean = useSelector(
    (state: RootState) => state?.dogs.isLoading
  )
  const dispatch = useDispatch()

  useEffect(() => {
    const getDogs = async () => {
      await dispatch(dogAction.setLoader(true))
      const response = await DogsService.FetchDogs()
      await dispatch(dogAction.setDogs(response?.data))
      await dispatch(dogAction.setLoader(false))
    }

    getDogs().catch((e) => {
      console.error(e)
    })
  }, [dispatch])

  const handleRefresh = () => {
    window.location.reload()
  }

  if (isLoading) {
    return (
      <div className="page-center col-1 m-0 m-auto">
        <SVGLoader />
      </div>
    )
  }

  if ((!dogs || Object.keys(dogs).length === 0) && !isLoading) {
    return (
      <div className="page-center flex-column">
        <div className="fs-2" data-testid="no-user-title">
          NO Dogs! <i className="lnr lnr-users" />
        </div>

        <div className="cursor-pointer mb-3 fs-4" onClick={handleRefresh}>
          <i className="lnr lnr-redo" data-testid="refresh-link" /> Refresh
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="col col-12 col-sm-12 col-md-6 m-0 m-auto px-5 py-5">
        <DogCard dogs={dogs} />
      </div>
    </div>
  )
}
