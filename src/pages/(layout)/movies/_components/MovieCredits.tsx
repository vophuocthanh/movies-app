import { fetcher, tmdbAPI } from '@/utils/conffig'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

export default function MovieCredits() {
  const { movieId } = useParams()
  const { data } = useQuery(['movieCredits', movieId], () =>
    fetcher(tmdbAPI.getCredits(movieId, 'credits'))
  )
  if (!data) return null
  const { cast } = data
  if (!cast || cast.length <= 0) return null
  return (
    <div className="px-4 py-10 md:px-10">
      <h2 className="mb-10 text-5xl font-semibold text-center text-white">
        Casts
      </h2>
      <div className="grid gap-5 sm:grid-cols-4">
        {cast.slice(0, 4).map(item => (
          <div className="cast-item" key={item.id}>
            <img
              src={tmdbAPI.imageOriginal(item.profile_path)}
              className="object-cover w-full mb-3 rounded-lg h-88"
              alt=""
            />
            <h3 className="text-xl font-medium text-center text-white">
              {item.name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  )
}
