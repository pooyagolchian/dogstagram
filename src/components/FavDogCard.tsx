/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from 'react-redux'
import DogsService from '../services/DogsService'
import { RootState } from '../store'
import { dogAction } from '../store/dogs'
import { useToasts } from 'react-toast-notifications'
import { Loader } from './Loader'
import { useNavigate } from 'react-router-dom'

export const FavDogCard = (favDogItem: any) => {
  const isLoading: boolean = useSelector(
    (state: RootState) => state?.dogs.isLoading
  )
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { addToast } = useToasts()
  const favDogsItems = favDogItem['favDogItem']

  const handleDeleteFavDog = async (id: string) => {
    try {
      await dispatch(dogAction.setLoader(true))
      await DogsService.DeleteFavDogRequest(id)
      const response = await DogsService.GetFavDogs()
      dispatch(dogAction.setFavDogs(response?.data))
      await dispatch(dogAction.setLoader(false))
      addToast('Remove this dog from favorite!', { appearance: 'success' })
    } catch (error: any) {
      if (error.response.status === 400) {
        console.error('Error: ', error)
        addToast('Duplicate unfavorite!', { appearance: 'error' })
      }
    }
  }

  if (isLoading) {
    return (
      <div className="page-center col-1 m-0 m-auto">
        <Loader />
      </div>
    )
  }

  if (favDogsItems.length === 0) {
    return (
      <>
        <div className="page-center flex-column d-flex justify-content-center align-items-center">
          <div className="col col-auto">There is no favorite dogs :(</div>
          <img
            onClick={() => navigate('/')}
            className="col col-1 flex-row d-flex pt-5 cursor-pointer"
            src="/img/happy.png"
            alt=""
          />
        </div>
      </>
    )
  }

  return (
    <>
      <div className="container py-5">
        <div className="row">
          {favDogsItems &&
            favDogsItems.map((item: any) => (
              <div
                key={item.id}
                className="col col-12 col-sm-12 col-md-6 col-lg-2"
              >
                <img
                  className="card-img w-100 ratio-16x9 figure-img"
                  src={item.image.url}
                  alt=""
                />
                <button
                  onClick={() => handleDeleteFavDog(item.id)}
                  className="btn btn-sm btn-danger"
                >
                  Unfavorite
                </button>
              </div>
            ))}
        </div>
      </div>
    </>
  )
}
