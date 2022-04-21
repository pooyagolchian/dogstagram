import { Fragment } from 'react'

export const DogInfo = (dogInfo: any) => {
  const dogInfoItem = [dogInfo['dogInfo']]
  return (
    <div className="container py-4">
      <div className="row">
        {dogInfoItem.map((item: any, itemIndex: any) => (
          <Fragment key={item.id + itemIndex}>
            <div className="col col-12 col-sm-12 col-md-4 col-lg-4">
              <img className="col col-12 card-img" src={item.url} alt="" />
            </div>

            {item &&
              item?.breeds?.map((breed: any, breedIndex: any) => {
                return (
                  <Fragment key={breed.name + breedIndex}>
                    <div
                      key={breed.id}
                      className="col col-12 col-sm-12 col-md-8 col-lg-8"
                    >
                      <div className="fs-2 fw-bold">{breed.name}</div>
                      <div className="fs-5">{breed.bred_for}</div>
                      <div className="fs-5">{breed.breed_group}</div>
                      <div className="fs-5">{breed.life_span}</div>
                      <div className="fs-5 small mt-3">
                        {breed.temperament.split(',').map((tag: any) => (
                          <span
                            key={tag}
                            className="bg-black me-1 text-white-50 rounded-2 p-2 m-1"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Fragment>
                )
              })}
          </Fragment>
        ))}
      </div>
    </div>
  )
}
