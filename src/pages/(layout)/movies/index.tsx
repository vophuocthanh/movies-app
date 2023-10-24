import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import { v4 } from 'uuid'
import { fetcher, tmdbAPI } from '@/utils/conffig'
import MovieCard, { MovieCardSkeleton } from '@/movie/MovieCard'
import useDebounce from '@/hooks/useDebounce'

// https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>

const itemsPerPage = 20

const MoviesPage = () => {
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
  console.log(data)
  return (
    <div className="sm:py-10 pb-10 page-container">
      <div className="flex mb-10">
        <div className="flex-1">
          <input
            onChange={handleFilterChange}
            type="text"
            className="w-full p-4 text-white rounded-lg outline-none bg-slate-800"
            placeholder="Type here to search..."
          />
        </div>
        <button className="p-4 text-white bg-primary">
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
        </button>
      </div>
      {loading && (
        <div className="grid grid-cols-4 gap-10">
          {new Array(itemsPerPage).fill(0).map(() => (
            <MovieCardSkeleton key={v4()}></MovieCardSkeleton>
          ))}
        </div>
      )}
      <div className="grid gap-10 sm:grid-cols-4 overflow-x-hidden">
        {!loading &&
          movies.length > 0 &&
          movies.map(item => <MovieCard key={item.id} item={item}></MovieCard>)}
      </div>
    </div>
  )
}

export default MoviesPage
