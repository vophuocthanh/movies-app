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
  // console.log("MovieDetailsPage ~ data", data);
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
      {genres.length > 0 && (
        <div className="flex text-center sm:flex flex-col sm:flex-row justify-center items-center mb-10 gap-x-5 ">
          {genres.map(item => (
            <span
              key={item.id}
              className="px-4 my-4 w-[170px] flex items-center justify-center py-2 border rounded-md border-primary text-primary"
            >
              {item.name}
            </span>
          ))}
        </div>
      )}
      <p className="text-center leading-relaxed max-w-[600px] mx-auto mb-10">
        {overview}
      </p>
      {/* <MovieMeta type="credits"></MovieMeta>
      <MovieMeta type="videos"></MovieMeta>
      <MovieMeta type="similar"></MovieMeta> */}
      <MovieCredits></MovieCredits>
      <MovieVideos></MovieVideos>
      <MovieSimilar></MovieSimilar>
    </div>
  )
}

//  lỗi

// trang chi tiết
function MovieCredits() {
  const { movieId } = useParams()
  const { data } = useSWR(tmdbAPI.getCredits(movieId, 'credits'), fetcher)
  if (!data) return null
  const { cast } = data
  if (!cast || cast.length <= 0) return null
  // https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key=<<api_key>>
  return (
    <div className="py-10 ">
      <h2 className="mb-10 text-3xl text-center">Casts</h2>
      <div className="grid sm:grid-cols-4 gap-5">
        {cast.slice(0, 4).map(item => (
          <div className="cast-item" key={item.id}>
            <img
              // phần ảnh tác giả
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

// làm về phần video
function MovieVideos() {
  const { movieId } = useParams()
  const { data } = useSWR(tmdbAPI.getVideo(movieId, 'videos'), fetcher)
  if (!data) return null
  // console.log("MovieVideos ~ data ", data);
  const { results } = data
  if (!results || results.length <= 0) return null
  return (
    <div className="py-10">
      <div className="flex flex-col gap-10">
        {results.slice(0, 3).map(item => (
          <div className="" key={item.id}>
            <h3 className="inline-block p-3 mb-10 text-xl font-medium bg-secondary">
              {item.name}
            </h3>
            <div key={item.id} className="w-full aspect-video">
              <iframe
                width="967"
                height="544"
                src={`https://www.youtube.com/embed/${item.key}`}
                title="Nhạc Trẻ Remix 2022 Hay Nhất Hiện Nay - BXH Nhạc Trẻ Remix Hot Nhất TikTok 2022"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="object-fill w-full h-full"
              ></iframe>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
// <iframe width="967" height="544" src="https://www.youtube.com/embed/CVGiY7PDsMo" title="[DevLofi] Làm Việc Cùng Tôi - Phát Trực Tiếp" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

// làm về phần video liên quan
function MovieSimilar() {
  const { movieId } = useParams()
  const { data } = useSWR(tmdbAPI.getSimilar(movieId), fetcher)
  if (!data) return null
  const { results } = data
  if (!results || results.length <= 0) return null
  console.log('MovieSimilar ~ data', data)
  return (
    <div className="py-10">
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
export default MovieDetailsPage
