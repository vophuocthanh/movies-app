import { fetcher, tmdbAPI } from '@/utils/conffig'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import MovieCredits from './_components/MovieCredits'
import MovieVideos from './_components/MovieVideos'
import MovieSimilar from './_components/MovieSimilar'

// https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>
const MovieDetailsPage = () => {
  useEffect(() => {
    document.title = 'Movies App | Movie Details'
  }, [])
  const { movieId } = useParams()
  const { data } = useQuery(['movieDetails', movieId], () =>
    fetcher(tmdbAPI.getMovie(movieId))
  )

  if (!data) return null

  const { backdrop_path, poster_path, title, genres, overview } = data
  return (
    <div className="py-10">
      <div className="relative w-full h-150">
        <div className="absolute inset-0 object-cover bg-black bg-opacity-70"></div>
        <div
          className="object-cover w-full h-full bg-no-repeat bg-cover"
          style={{
            backgroundImage: `url(${tmdbAPI.imageBackground(backdrop_path)})`
          }}
        ></div>
      </div>
      <div className="w-full h-100 max-w-200 mx-auto -mt-[200px] relative z-10 pb-10">
        <img
          src={tmdbAPI.imageOriginal(poster_path)}
          alt=""
          className="object-cover w-full h-full rounded-xl"
        />
      </div>
      <h1 className="mx-2 mb-10 text-4xl font-bold text-center text-white md:mx-0">
        {title}
      </h1>
      {genres ? (
        genres.length > 0 ? (
          <div className="flex flex-col items-center justify-center gap-5 mb-10 font-bold text-center sm:flex sm:flex-row">
            {genres.map(item => (
              <span
                key={item.id}
                className="flex items-center justify-center px-4 py-2 my-4 text-white border rounded-md w-44 border-primary text-primary"
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
      <p className="mx-auto mb-10 leading-relaxed text-center text-white max-w-150">
        {overview}
      </p>
      <MovieCredits></MovieCredits>
      <MovieVideos></MovieVideos>
      <MovieSimilar></MovieSimilar>
    </div>
  )
}

export default MovieDetailsPage
