import MovieCard from '@/movie/MovieCard'
import { fetcher, tmdbAPI } from '@/utils/conffig'
import React from 'react'
import { useParams } from 'react-router-dom'
import { SwiperSlide, Swiper } from 'swiper/react'
import useSWR from 'swr'

// https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>
const MovieDetailsPage = () => {
  const { movieId } = useParams()
  // đường dẫn bên file config.js
  const { data } = useSWR(tmdbAPI.getMovieDetails(movieId), fetcher)
  console.log('MovieDetailsPage ~ data', data)
  if (!data) return null
  const { backdrop_path, poster_path, title, genres, overview } = data
  return (
    <div className="py-10">
      <div className="w-full h-[600px] relative">
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        <div
          className="w-full h-full bg-no-repeat bg-cover"
          // background ở trang chi tiết
          style={{
            backgroundImage: `url(${tmdbAPI.imageBackground(backdrop_path)})`
          }}
        ></div>
      </div>
      <div className="w-full h-[400px] max-w-[800px] mx-auto -mt-[200px] relative z-10 pb-10">
        <img
          // ảnh chính bên trang chi tiết
          src={tmdbAPI.imageOriginal(poster_path)}
          alt=""
          className="object-cover w-full h-full rounded-xl"
        />
      </div>
      <h1 className="mb-10 text-4xl font-bold text-center text-white">
        {title}
      </h1>
      {genres ? (
        genres.length > 0 ? (
          <div className="flex text-center sm:flex flex-col sm:flex-row justify-center items-center mb-10 gap-5">
            {genres.map(item => (
              <span
                key={item.id}
                className="px-4 my-4 w-44 flex items-center justify-center py-2 border rounded-md border-primary text-primary"
              >
                {item.name}
              </span>
            ))}
          </div>
        ) : (
          <p>Không có thể loại nào.</p>
        )
      ) : (
        <p>Loading...</p>
      )}
      <p className="text-center leading-relaxed max-w-[600px] mx-auto mb-10">
        {overview}
      </p>
      {/* <MovieMeta type="credits"></MovieMeta>
      <MovieMeta type="videos"></MovieMeta>
      <MovieMeta type="similar"></MovieMeta> */}
      <MovieCredits></MovieCredits>
    </div>
  )
}

function MovieCredits() {
  const { movieId } = useParams()
  const { data } = useSWR(tmdbAPI.getCredits(movieId, 'credits'), fetcher)
  console.log('data MovieCredits:', data)
  if (!data) return null
  const { cast } = data
  if (!cast || cast.length <= 0) return null
  return (
    <div className="py-10 ">
      <h2 className="mb-10 text-3xl text-center">Casts</h2>
      <div className="grid sm:grid-cols-4 gap-5">
        {cast.slice(0, 4).map(item => (
          <div className="cast-item" key={item.id}>
            <img
              src={tmdbAPI.imageOriginal(item.profile_path)}
              className="w-full h-[350px] object-cover rounded-lg mb-3"
              alt=""
            />
            <h3 className="text-xl font-medium text-center">{item.name}</h3>
          </div>
        ))}
      </div>
    </div>
  )
}
export default MovieDetailsPage
