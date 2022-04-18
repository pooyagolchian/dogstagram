import { useDispatch } from 'react-redux'
import { useToasts } from 'react-toast-notifications'
import { Dog } from '../interfaces/IDog'
import DogsService from '../services/DogsService'
import { dogAction } from '../store/dogs'
import { FaRegHeart, FaHeart } from 'react-icons/fa'
import { useState } from 'react'

interface Props {
  dogs: Dog[]
}

export const DogCard = ({ dogs }: Props) => {
  const [fav, setFav] = useState(false)

  const dispatch = useDispatch()

  const { addToast } = useToasts()

  const getFavDogs = async () => {
    const response = await DogsService.GetFavDogs()
    await dispatch(dogAction.setFavDogs(response?.data))
  }

  const handleDeleteFavDog = async (id: string) => {
    try {
      await DogsService.DeleteFavDogRequest(id)
      await getFavDogs()
    } catch (error: any) {
      if (error.response.status === 400) {
        addToast('Remove favorite!', { appearance: 'error' })
      }
    }
  }

  const handleFavDog = async (item: Dog, index: number) => {
    try {
      await DogsService.FavDogRequest(item.id)
      await getFavDogs()
      const dogFilterByid = dogs.find(
        (dog: Dog) => dog.image.id === item.image.id
      )
      if (dogFilterByid && fav && Number(item.id) === Number(index + 1)) {
        setFav(!fav)
      } else {
        setFav(fav)
      }
    } catch (error: any) {
      if (error.response.status === 400) {
        addToast('Duplicate favorite!', { appearance: 'error' })
        setFav(fav)
      }
    }
  }

  if (!dogs) {
    return <>Result not found!</>
  }

  return (
    <div className="row gx-5 gy-5 dog-item">
      {dogs.map((dog: Dog, index) => (
        <div className="col col-12" key={dog.id + index} data-testid="dog-card">
          <div
            onDoubleClick={() => handleFavDog(dog, index)}
            key={dog.id + index}
            className="ratio-16x9 img-thumbnail dog-item__img"
            style={{ backgroundImage: `url(${dog.image.url})` }}
          ></div>

          <div className="row justify-content-between pt-3">
            <div className="fs-5 fw-bold text-capitalize col col-auto">
              {dog.name}
            </div>
            <div
              onClick={() => handleFavDog(dog, index)}
              key={dog.id + index}
              className="col col-auto"
            >
              {dog.id && fav ? (
                <FaRegHeart className="fs-3" />
              ) : (
                <FaHeart className="fs-3" />
              )}
            </div>
          </div>
          <div className="text-black-50">{dog.temperament}</div>
        </div>
      ))}
    </div>
  )
}
