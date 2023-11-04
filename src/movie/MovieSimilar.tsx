import { fetcher, tmdbAPI } from '@/utils/conffig'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { SwiperSlide, Swiper } from 'swiper/react'
import MovieCard from './MovieCard'

export default function MovieSimilar() {
  const { movieId } = useParams()
  const { data } = useQuery(['movieSimilar', movieId], () =>
    fetcher(tmdbAPI.getSimilar(movieId, 'similar'))
  )
  if (!data) return null
  const { results } = data
  if (!results || results.length <= 0) return null
  console.log('MovieSimilar ~ data', data)
  return (
    <div className="px-4 py-10 md:px-10">
      <h2 className="mb-10 text-3xl font-medium">Similar movies</h2>
      <div className="movie-list">
        <Swiper grabCursor={'true'} spaceBetween={40} slidesPerView={'auto'}>
          {results.length > 0 &&
            results.map(item => (
              <SwiperSlide key={item.id}>
                <MovieCard item={item}></MovieCard>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  )
}
