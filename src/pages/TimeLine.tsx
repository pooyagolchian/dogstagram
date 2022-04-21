import { useDispatch, useSelector } from 'react-redux'
import { dogAction } from '../store/dogs'
import { Loader } from '../components/Loader'
import { RootState } from '../store'
import DogsService from '../services/DogsService'
import { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { DogCard } from '../components/DogCard'

export const TimeLine = ({ itemsPerPage }: any) => {
  const [currentItems, setCurrentItems] = useState([])
  const [pageCount, setPageCount] = useState(0)
  const [itemOffset, setItemOffset] = useState(0)
  const dogs: any = useSelector((state: RootState) => state?.dogs.dogs)
  const isLoading: boolean = useSelector(
    (state: RootState) => state?.dogs.isLoading
  )
  const dispatch = useDispatch()

  useEffect(() => {
    const getDogs = async () => {
      await dispatch(dogAction.setLoader(true))
      const model = {
        limit: 100,
        page: itemsPerPage,
        order: 'Desc',
      }
      const response = await DogsService.FetchDogs(model)
      await dispatch(dogAction.setDogs(response?.data))
      await dispatch(dogAction.setLoader(false))
    }

    getDogs().catch((e) => {
      console.error(e)
    })
  }, [dispatch, itemsPerPage])

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage
    setCurrentItems(dogs && dogs?.slice(itemOffset, endOffset))
    setPageCount(Math.ceil(dogs.length / itemsPerPage))
  }, [dogs, itemOffset, itemsPerPage])
  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % dogs.length
    setItemOffset(newOffset)
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }

  const handleRefresh = () => {
    window.location.reload()
  }

  if (isLoading) {
    return (
      <div className="page-center col-1 m-0 m-auto">
        <Loader />
      </div>
    )
  }

  if (!dogs) {
    return <>Result not found!</>
  }

  if ((!dogs || Object.keys(dogs).length === 0) && !isLoading) {
    return (
      <div className="page-center flex-column">
        <div className="fs-2" data-testid="no-user-title">
          NO Dogs! <i className="lnr lnr-users" />
        </div>

        <div className="cursor-pointer mb-3 fs-4" onClick={handleRefresh}>
          <i className="lnr lnr-redo" data-testid="refresh-link" /> Refresh
        </div>
      </div>
    )
  }

  return (
    <>
      <DogCard currentItems={currentItems} />
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        className="pagination"
      />
    </>
  )
}
