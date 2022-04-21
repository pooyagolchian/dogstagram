/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch } from 'react-redux'
import DogsService from '../services/DogsService'
import { dogAction } from '../store/dogs'
import { useToasts } from 'react-toast-notifications'

export const FavDogCard = (favDogItem: any) => {
  const { addToast } = useToasts()
  const favDogsItems = favDogItem['favDogItem']
  const dispatch = useDispatch()
  const handleDeleteFavDog = async (id: string) => {
    try {
      await DogsService.DeleteFavDogRequest(id)
      const response = await DogsService.GetFavDogs()
      dispatch(dogAction.setFavDogs(response?.data))
      addToast('Remove this dog from favorite!', { appearance: 'success' })
    } catch (error: any) {
      if (error.response.status === 400) {
        console.error('Error: ', error)
        addToast('Duplicate unfavorite!', { appearance: 'error' })
      }
    }
  }

  if (favDogsItems.length === 0) {
    return <div>No fav dogs</div>
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
