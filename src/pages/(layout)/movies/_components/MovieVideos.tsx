import { fetcher, tmdbAPI } from '@/utils/conffig'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

export default function MovieVideos() {
  const { movieId } = useParams()
  const { data } = useQuery(['movieVideos', movieId], () =>
    fetcher(tmdbAPI.getVideo(movieId, 'videos'))
  )
  if (!data) return null
  const { results } = data
  if (!results || results.length <= 0) return null
  return (
    <div className="px-4 py-10 md:px-10">
      <div className="flex flex-col gap-10">
        {results.slice(0, 3).map(item => (
          <div className="" key={item.id}>
            <h3 className="inline-block p-3 mb-10 text-xl font-medium rounded bg-secondary">
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
