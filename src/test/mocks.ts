import { Dog, FavDog } from '../interfaces/IDog'

export const MOCKED_DOG: Dog[] = [
  {
    breeds: [
      {
        weight: {
          imperial: '23 - 28',
          metric: '10 - 13',
        },
        height: {
          imperial: '15.5 - 20',
          metric: '39 - 51',
        },
        id: 111,
        name: 'Finnish Spitz',
        bred_for: 'Hunting birds, small mammals',
        breed_group: 'Non-Sporting',
        life_span: '12 - 15 years',
        temperament: 'Playful, Loyal, Independent, Intelligent, Happy, Vocal',
        reference_image_id: '3PjHlQbkV',
      },
    ],
    id: 'buxVXCo9V',
    url: 'https://cdn2.thedogapi.com/images/buxVXCo9V.jpg',
    width: 500,
    height: 313,
  },
]

export const MOCKED_FAV_DOG: FavDog[] = [
  {
    id: 32781,
    user_id: 'xqjg6r',
    image_id: 'rkZRggqVX',
    sub_id: 'User-123',
    created_at: '2022-04-23T14:28:48.000Z',
    image: {
      id: 'rkZRggqVX',
      url: 'https://cdn2.thedogapi.com/images/rkZRggqVX.jpg',
    },
  },
]
