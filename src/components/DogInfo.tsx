import { Fragment } from 'react'

export const DogInfo = (dogInfo: { [x: string]: any }) => {
  const dogInfoItem = [dogInfo['dogInfo']]
  return (
    <div className="col-12 col-sm-12 col-md-12 col-lg-5 m-auto m-0 py-4 px-3 px-lg-0">
      <div className="row">
        {dogInfoItem.map((item, itemIndex) => {
          return (
            <Fragment key={item.id + itemIndex}>
              <div className="col col-12 col-sm-12 col-md-5 col-lg-5">
                <img className="col col-12 card-img" src={item.url} alt="" />
              </div>

              {item &&
                item?.breeds?.map(
                  (
                    breed: {
                      name: string
                      id: number
                      bred_for: string
                      breed_group: string
                      life_span: string
                      temperament: string
                    },
                    breedIndex: any
                  ) => {
                    return (
                      <Fragment key={breed.name + breedIndex}>
                        <div
                          key={breed.id}
                          className="col col-12 col-sm-12 col-md-7 col-lg-7"
                        >
                          <div className="fs-2 fw-bold">{breed.name}</div>
                          <div className="fs-5">
                            <span className="text-muted">Bred for:</span>{' '}
                            {breed.bred_for}
                          </div>
                          <div className="fs-5">
                            <span className="text-muted">Breed group:</span>{' '}
                            {breed.breed_group}
                          </div>
                          <div className="fs-5">
                            <span className="text-muted">Life span:</span>{' '}
                            {breed.life_span}
                          </div>
                        </div>
                        <div className="fs-5 small py-3">
                          {breed.temperament.split(',').map((tag: string) => {
                            return (
                              <span
                                key={tag}
                                className="dog-item-chip me-2 mb-2 text-white rounded-2 p-2 px-2 py-2 my-2"
                              >
                                {tag}
                              </span>
                            )
                          })}
                        </div>
                      </Fragment>
                    )
                  }
                )}
            </Fragment>
          )
        })}
      </div>
    </div>
  )
}
