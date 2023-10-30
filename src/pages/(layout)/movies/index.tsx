import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import { v4 } from 'uuid'
import { fetcher, tmdbAPI } from '@/utils/conffig'
import MovieCard, { MovieCardSkeleton } from '@/movie/MovieCard'
import useDebounce from '@/hooks/useDebounce'
import bg from '@/assets/banner.png'
import ReactPaginate from 'react-paginate'
import { Button } from '@/components/ui/Button'
// https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>

const itemsPerPage = 20

const MoviesPage = () => {
  useEffect(() => {
    document.title = 'Movies App | Movies'
  }, [])
  const [pageCount, setPageCount] = useState(0)
  const [itemOffset, setItemOffset] = useState(0)
  const [nextPage, setNextPage] = useState(1)
  const [filter, setFilter] = useState('')
  const [url, setUrl] = useState(tmdbAPI.getMovieList('popular', nextPage))
  const filterDebounce = useDebounce(filter, 500)
  const handleFilterChange = e => {
    setFilter(e.target.value)
  }
  const { data, error } = useSWR(url, fetcher)
  const loading = !data && !error
  useEffect(() => {
    if (filterDebounce) {
      setUrl(tmdbAPI.getMovieSearch(filterDebounce, nextPage))
    } else {
      setUrl(tmdbAPI.getMovieList('popular', nextPage))
    }
  }, [filterDebounce, nextPage])
  const movies = data?.results || []
  useEffect(() => {
    if (!data || !data.total_results) return
    setPageCount(Math.ceil(data.total_results / itemsPerPage))
  }, [data, itemOffset])
  // hàm panigaion
  const handlePageClick = event => {
    // khi mà click vào thì sẽ dựa vào event.selected( số )
    const newOffset = (event.selected * itemsPerPage) % data.total_results
    // newOffset để hiển thị dấu ba chấm ( ... )
    setItemOffset(newOffset)
    setNextPage(event.selected + 1)
  }
  console.log(data)
  return (
    <div className="pb-10 sm:py-10 page-container ">
      <main
        className="relative px-8 py-72 rounded mb-6 bg-top bg-no-repeat bg-cover"
        style={{ backgroundImage: `url(${bg})` }}
      ></main>
      <div className="flex mb-10">
        <div className="flex-1">
          <input
            onChange={handleFilterChange}
            type="text"
            className="w-full p-4 text-white outline-none bg-slate-800"
            placeholder="Type here to search..."
          />
        </div>
        <Button className="p-4 text-white h-14 rounded-none" variant="primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </Button>
      </div>
      {loading && (
        <div className="grid grid-cols-4 gap-10">
          {new Array(itemsPerPage).fill(0).map(() => (
            <MovieCardSkeleton key={v4()}></MovieCardSkeleton>
          ))}
        </div>
      )}
      <div className="grid gap-10 overflow-x-hidden sm:grid-cols-4">
        {!loading &&
          movies.length > 0 &&
          movies.map(item => <MovieCard key={item.id} item={item}></MovieCard>)}
      </div>
      <div className="mt-10 ">
        <ReactPaginate
          breakLabel="..."
          nextLabel=">>"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="<<"
          renderOnZeroPageCount={null}
          className="pagination text-white text-xl font-medium"
        />
      </div>
    </div>
  )
}

export default MoviesPage
