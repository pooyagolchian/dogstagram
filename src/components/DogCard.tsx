/* eslint-disable array-callback-return */
import { Fragment } from 'react'
import DogsService from '../services/DogsService'
import { dogAction } from '../store/dogs'
import { useToasts } from 'react-toast-notifications'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Dog, FavDog } from '../interfaces/IDog'

interface Props {
  currentItems: Dog[]
}

export const DogCard = ({ currentItems }: Props) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { addToast } = useToasts()

  const getFavDogs = async (): Promise<FavDog[]> => {
    const response = (await DogsService.FetchFavDogs())?.data
    await dispatch(dogAction.setFavDogs(response))
    return response
  }

  const handleMoreinfo = async (item: Dog): Promise<void> => {
    navigate(`/dog/info/${item.id}`)
  }

  const handleFavDog = async (item: Dog) => {
    try {
      await DogsService.FavDogRequest(item.id)
      await getFavDogs()
      addToast('Dog favorite!', { appearance: 'success' })
    } catch (error: any) {
      if (error.response.status === 400) {
        addToast('Duplicate favorite!', { appearance: 'error' })
      }
    }
  }

  if (currentItems.length === 0) {
    return <div className="text-center py-5"> No dogs to display! </div>
  }

  return (
    <div className="d-flex justify-content-center align-items-center flex-column px-2 dogs-list">
      {currentItems?.map((item: Dog): JSX.Element => {
        return (
          <div
            className="d-flex flex-column align-items-center justify-content-center app-container py-3"
            key={item.id}
          >
            <img
              className="col col-12 figure-img card-img"
              src={item.url}
              alt=""
            />

            {item.breeds?.map(
              (breed: {
                reference_image_id: string
                name: string
              }): JSX.Element => {
                return (
                  <Fragment key={breed.reference_image_id}>
                    <div className="w-100 d-flex flex-column flex-sm-column flex-md-column flex-lg-row justify-content-between py-2">
                      <div className="col col-12 col-sm-12 col-md-6 col-lg-auto">
                        <div className="fs-5 fw-bold">{breed.name}</div>
                      </div>
                      <div className="col col-12 col-sm-12 col-md-6 col-lg-auto">
                        <button
                          data-testid="seemore-btn"
                          onClick={() => handleMoreinfo(item)}
                          className="btn btn-seemore btn-sm col-auto"
                        >
                          See More
                        </button>
                        <button
                          onClick={() => handleFavDog(item)}
                          className="btn favorite-btn btn-sm col-auto ms-3"
                          data-testid="favorite-btn"
                        >
                          Favorite
                        </button>
                      </div>
                    </div>
                  </Fragment>
                )
              }
            )}
          </div>
        )
      })}
    </div>
  )
}
