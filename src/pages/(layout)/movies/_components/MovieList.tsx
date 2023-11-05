import React from 'react'
import { SwiperSlide, Swiper } from 'swiper/react'
import MovieCard, { MovieCardSkeleton } from './MovieCard'
import { useQuery } from 'react-query'
import { withErrorBoundary } from 'react-error-boundary'
import { tmdbAPI } from '@/utils/conffig'

const fetchMovieList = async type => {
  const response = await fetch(tmdbAPI.getMovieList(type))
  if (!response.ok) {
    throw new Error('Failed to fetch movie list')
  }
  return response.json()
}

const MovieList = ({ type = 'now_playing' }) => {
  const { data, isLoading } = useQuery(['movieList', type], () =>
    fetchMovieList(type)
  )

  const movies = data?.results || []

  return (
    <div className="movie-list">
      {isLoading && (
        <>
          <Swiper grabCursor={true} spaceBetween={40} slidesPerView={'auto'}>
            {[1, 2, 3, 4].map(index => (
              <SwiperSlide key={index}>
                <MovieCardSkeleton></MovieCardSkeleton>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}
      {!isLoading && (
        <Swiper grabCursor={true} spaceBetween={40} slidesPerView={'auto'}>
          {movies.length > 0 &&
            movies.map(item => (
              <SwiperSlide key={item.id}>
                <MovieCard item={item}></MovieCard>
              </SwiperSlide>
            ))}
        </Swiper>
      )}
    </div>
  )
}

function FallbackComponent() {
  return (
    <p className="text-red-400 bg-red-50">
      Something went wrong with this component
    </p>
  )
}

export default withErrorBoundary(MovieList, {
  FallbackComponent
})
