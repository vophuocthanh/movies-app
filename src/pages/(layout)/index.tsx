import Banner from '@/components/Banner'
import MovieList from '@/movie/MovieList'
import { useEffect } from 'react'

function Home() {
  useEffect(() => {
    document.title = 'Movies App | Home'
  }, [])
  return (
    <div className="w-full bg-gradient-to-br from-pink-300 via-purple-400 to-blue-300">
      <Banner></Banner>
      <section className="pb-20 movies-layout page-container">
        <h2 className="mb-10 text-3xl font-bold text-white capitalize">
          Now Playing
        </h2>
        <MovieList type="now_playing"></MovieList>
      </section>
      <section className="pb-20 movies-layout page-container">
        <h2 className="mb-10 text-3xl font-bold text-white capitalize ">
          Top rated movies
        </h2>
        <MovieList type="top_rated"></MovieList>
      </section>
      <section className="pb-20 movies-layout page-container">
        <h2 className="mb-10 text-3xl font-bold text-white capitalize ">
          Top trending
        </h2>
        <MovieList type="popular"></MovieList>
      </section>
    </div>
  )
}

export default Home
