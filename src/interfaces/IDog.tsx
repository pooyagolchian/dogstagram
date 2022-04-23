export interface Dog {
  breeds: {
    weight: {
      imperial: string
      metric: string
    }
    height: {
      imperial: string
      metric: string
    }
    id: string | number
    name: string
    bred_for: string
    breed_group: string
    life_span: string
    temperament: string
    reference_image_id: string
  }[]
  id: string | number
  url: string
  width: number
  height: number
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
