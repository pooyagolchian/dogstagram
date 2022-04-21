/* eslint-disable array-callback-return */
import { Fragment } from 'react'
import DogsService from '../services/DogsService'
import { dogAction } from '../store/dogs'
import { useToasts } from 'react-toast-notifications'
import { useDispatch } from 'react-redux'

export const DogCard = (currentItems: any) => {
  const dispatch = useDispatch()

  const dogsItem = currentItems['currentItems']
  const { addToast } = useToasts()

  const getFavDogs = async () => {
    const response = await DogsService.GetFavDogs()
    await dispatch(dogAction.setFavDogs(response?.data))
    return response
  }

  const handleFavDog = async (item: any) => {
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
  if (dogsItem.length === 0) {
    return <div> No items to display </div>
  }

  return (
    <>
      <div className="d-flex justify-content-center align-items-center flex-column py-5">
        {dogsItem.map((item: any, index: any) => {
          return (
            <div
              className="d-flex flex-column align-items-center justify-content-center col-4 py-5"
              key={item.id + index}
            >
              <img
                className="col col-12 figure-img card-img"
                src={item.url}
                alt={item.id}
              />

              {item.breeds.map((breed: any, breedIndex: any) => {
                return (
                  <Fragment key={breed.name + breedIndex}>
                    <div className="w-100 d-flex flex-row justify-content-between py-2">
                      <div className="col col-auto">
                        <div className="fs-5 fw-bold">{breed.name}</div>
                      </div>
                      <div
                        onClick={() => handleFavDog(item)}
                        key={item.reference_image_id}
                        className="col col-auto"
                      >
                        <button className="btn btn-sm btn-success">
                          Favorite
                        </button>
                      </div>
                    </div>
                  </Fragment>
                )
              })}
            </div>
          )
        })}
      </div>
    </>
  )
}
