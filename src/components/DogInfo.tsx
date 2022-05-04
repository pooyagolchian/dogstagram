import { Fragment } from 'react'
import { Dog, DogInfoBreed } from '../interfaces/IDog'

interface Props {
  dogInfo: Dog | any
}

export const DogInfo = ({ dogInfo }: Props) => {
  return (
    <div className="app-container py-3 px-3">
      <div className="row">
        <Fragment key={dogInfo.id}>
          <div className="col col-12 col-sm-12 col-md-5 col-lg-5">
            <img className="col col-12 card-img" src={dogInfo.url} alt="" />
          </div>

          {dogInfo?.breeds?.map((breed: DogInfoBreed): JSX.Element => {
            return (
              <Fragment key={breed?.id}>
                <div className="col col-12 col-sm-12 col-md-7 col-lg-7">
                  <div className="fs-2 fw-bold">{breed?.name}</div>
                  <div className="fs-5">
                    <span className="text-muted">Bred for:</span>{' '}
                    {breed?.bred_for}
                  </div>
                  <div className="fs-5">
                    <span className="text-muted">Breed group:</span>{' '}
                    {breed?.breed_group}
                  </div>
                  <div className="fs-5">
                    <span className="text-muted">Life span:</span>{' '}
                    {breed?.life_span}
                  </div>
                </div>
                <div className="fs-5 small py-3 flex-wrap d-flex flex-row text-nowrap">
                  {breed?.temperament.split(',').map((tag: string) => {
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
          })}
        </Fragment>
      </div>
    </div>
  )
}
