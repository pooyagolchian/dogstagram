export interface Dog {
  id: string
  url: string
  width: number
  height: number
  breeds: {
    weight: {
      imperial: string
      metric: string
    }
    height: {
      imperial: string
      metric: string
    }
    id: number
    name: string
    bred_for: string
    breed_group: string
    life_span: string
    temperament: string
    reference_image_id: string
  }[]
}

export interface FavDog {
  id: number
  user_id: string
  image_id: string
  sub_id: string
  created_at: string
  image: {
    id: string
    url: string
  }
}

export interface DogInfoBreed {
  weight: { imperial: string; metric: string }
  height: { imperial: string; metric: string }
  id: string
  name: string
  bred_for: string
  breed_group: string
  life_span: string
  temperament: string
  reference_image_id: string
}

export interface SearchAllDogsByBreedBodyData {
  breed_ids: number[]
  limit: number
}

export interface ParamsData {
  limit: number
  order: string
  page: number
}
