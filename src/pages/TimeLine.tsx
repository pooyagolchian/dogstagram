/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from 'react-redux'
import { dogAction } from '../store/dogs'
import { Loader } from '../components/Loader'
import { RootState } from '../store'
import DogsService from '../services/DogsService'
import { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { DogCard } from '../components/DogCard'
import Select from 'react-select'
import { Dog } from '../interfaces/IDog'

interface Props {
  itemsPerPage: number
}

export const TimeLine = ({ itemsPerPage }: Props) => {
  const [currentItems, setCurrentItems] = useState([])
  const [pageCount, setPageCount] = useState(0)
  const [itemOffset, setItemOffset] = useState(0)
  const [selectedOption, setSelectedOption] = useState<any>([])
  const [breeds, setBreeds] = useState([])
  const dogs: Dog[] | any = useSelector((state: RootState) => state?.dogs.dogs)
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
      const response = await DogsService.SearchAllDogs(model)
      await dispatch(dogAction.setDogs(response?.data))
      await dispatch(dogAction.setLoader(false))
    }

    getDogs().catch((e) => {
      console.error(e)
    })
  }, [])

  useEffect(() => {
    const fetchBreedsList = async () => {
      await dispatch(dogAction.setLoader(true))
      let response = (await DogsService.FetchBreeds())?.data
      response = response.map((x: { name: string; id: number }) => {
        return {
          label: x.name,
          value: x.id,
        }
      })
      setBreeds(response)
      await dispatch(dogAction.setLoader(false))
    }

    fetchBreedsList().catch((e) => {
      console.error(e)
    })
  }, [])

  useEffect(() => {
    if (selectedOption.length !== 0) {
      const searchDogsByBreed = async () => {
        await dispatch(dogAction.setLoader(true))

        let model = {
          breed_ids: selectedOption.value,
          limit: 20,
        }
        const response: any = await DogsService.SearchAllDogsByBreed(model)
        await dispatch(dogAction.setDogs(response?.data))
        setCurrentItems(dogs)
        setItemOffset(0)
        await dispatch(dogAction.setLoader(false))
      }

      searchDogsByBreed().catch((e) => {
        console.error(e)
      })
    }
  }, [selectedOption])

  useEffect(() => {
    if (dogs) {
      const endOffset = itemOffset + itemsPerPage
      setCurrentItems(dogs.slice(itemOffset, endOffset))
      setPageCount(Math.ceil(dogs.length / itemsPerPage))
    }
  }, [dogs, itemOffset, itemsPerPage, selectedOption])

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % dogs.length
    setItemOffset(newOffset)
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }


  if (isLoading) {
    return (
      <div className="page-center laoder col-2 col-md-1 m-0 m-auto">
        <Loader />
      </div>
    )
  }

  if (!dogs) {
    return (
      <>
        <Select
          data-testid="select-breed"
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          options={breeds}
          placeholder={'Select Breed'}
          className="col-12 col-sm-12 col-md-12 col-lg-5 m-0 m-auto pt-3 px-2 px-sm-2 px-md-2 "
        />
        <div className="page-center">Result not found!</div>
      </>
    )
  }

  return (
    <>
      <Select
        data-testid="select-breed"
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={breeds}
        placeholder={'Select Breed'}
        className="app-container m-0 m-auto pt-3 px-2 px-sm-2 px-md-2"
      />
      <DogCard currentItems={currentItems} />
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        className="pagination fixed-bottom"
      />
    </>
  )
}
