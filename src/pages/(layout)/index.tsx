import Banner from '@/components/Banner'
import MovieList from '@/pages/(layout)/movies/_components/MovieList'
import { useEffect } from 'react'

const MovieLists = [
  {
    id: 1,
    title: 'Now Playing',
    type: 'now_playing'
  },
  {
    id: 2,
    title: 'Top Rated',
    type: 'top_rated'
  },
  {
    id: 3,
    title: 'Top trending',
    type: 'popular'
  }
]

function Home() {
  useEffect(() => {
    document.title = 'Movies App | Home'
  }, [])
  return (
    <div className="w-full bg-slate-900">
      <Banner></Banner>
      {MovieLists.map(item => (
        <section
          key={item.id}
          className="pb-20 ml-6 sm:ml-5 md:mx-auto movies-layout page-container"
        >
          <h2 className="mb-10 ml-0 text-3xl font-bold text-white capitalize">
            {item.title}
          </h2>
          <MovieList type={item.type}></MovieList>
        </section>
      ))}
    </div>
  )
}

export default Home
