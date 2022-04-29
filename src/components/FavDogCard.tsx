/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from 'react-redux'
import DogsService from '../services/DogsService'
import { RootState } from '../store'
import { dogAction } from '../store/dogs'
import { useToasts } from 'react-toast-notifications'
import { Loader } from './Loader'
import { useNavigate } from 'react-router-dom'
import { FavDog } from '../interfaces/IDog'

interface Props {
  favDogItem: FavDog[]
}

export const FavDogCard = ({ favDogItem }: Props) => {
  const isLoading: boolean = useSelector(
    (state: RootState) => state?.dogs.isLoading
  )
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { addToast } = useToasts()

  const handleDeleteFavDog = async (id: string) => {
    try {
      await dispatch(dogAction.setLoader(true))
      await DogsService.DeleteFavDogRequest(id)
      const response = await DogsService.FetchFavDogs()
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
      <div className="page-center laoder col-2 col-md-1 m-0 m-auto">
        <Loader />
      </div>
    )
  }

  if (favDogItem.length === 0) {
    return (
      <div className="flex-column d-flex justify-content-center align-items-center py-5">
        <div data-testid="there-is-no-fav-dog" className="col col-auto">
          There is no favorite dogs :(
        </div>
        <img
          onClick={() => navigate('/')}
          className="col col-1 flex-row d-flex pt-5 cursor-pointer"
          src="/img/happy.png"
          alt=""
        />
      </div>
    )
  }

  return (
    <div className="app-container py-2">
      <div className="row">
        {favDogItem?.map((item: FavDog) => (
          <div
            key={item.id}
            className="col col-12 col-sm-12 col-md-6 col-lg-4 my-3"
          >
            <div
              className="card-img w-100 ratio-16x9 figure-img fav-dog-img"
              style={{ backgroundImage: `url(${item?.image.url})` }}
            ></div>
            <button
              onClick={() => handleDeleteFavDog(item.id as string)}
              className="btn btn-sm unfavorite-btn small"
              data-testid="unfavorite-btn"
            >
              Unfavorite
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
