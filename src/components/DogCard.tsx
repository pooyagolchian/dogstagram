/* eslint-disable array-callback-return */
import { Fragment } from 'react'
import DogsService from '../services/DogsService'
import { dogAction } from '../store/dogs'
import { useToasts } from 'react-toast-notifications'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export const DogCard = (currentItems: any) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const dogsItem = currentItems['currentItems']
  const { addToast } = useToasts()

  const getFavDogs = async () => {
    const response = await DogsService.FetchFavDogs()
    await dispatch(dogAction.setFavDogs(response?.data))
    return response
  }

  const handleMoreinfo = async (item: any) => {
    navigate(`/dog/${item.id}`)
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
  if (dogsItem && dogsItem.length === 0) {
    return <div> No items to display </div>
  }

  return (
    <>
      <div className="d-flex justify-content-center align-items-center flex-column px-2">
        {dogsItem.map((item: any, index: any) => {
          return (
            <div
              className="d-flex flex-column align-items-center justify-content-center col-12 col-sm-12 col-md-6 col-lg-5 py-3"
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
                      <div className="col col-auto">
                        <button
                          onClick={() => handleFavDog(item)}
                          className="btn btn-sm btn-success col-auto"
                        >
                          Favorite
                        </button>
                        <button
                          onClick={() => handleMoreinfo(item)}
                          className="btn btn-outline-info btn-sm  col-auto ms-3"
                        >
                          show more
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
