export interface Dog {
  id: string
  sub_id: string
  name: string
  temperament: string
  life_span: string
  wikipedia_url: string
  origin: string
  weight: object
  country_code: string
  height: object
  image: {
    id: string
    url: string
  }
}
export interface FavDog {
  image_id: string
}
