import React from 'react'
import { useNavigate } from 'react-router-dom'
import { withErrorBoundary } from 'react-error-boundary'
import { tmdbAPI } from '@/utils/conffig'
import { Button } from '@/components/ui/Button'
import LoadingSkeleton from '@/components/LoadingSkeleton'

const MovieCard = ({ item }) => {
  const { title, vote_average, release_date, id } = item
  const navigate = useNavigate()
  return (
    <div className="flex flex-col h-full p-3 text-white rounded-lg select-none movie-card bg-slate-800">
      <img
        src={tmdbAPI.image500(item.poster_path)}
        alt=""
        className="object-cover w-full h-[250px] rounded-lg mb-5"
      />
      <div className="flex flex-col flex-1">
        <div className="w-64 overflow-hidden">
          <h3 className="mb-3 text-xl font-bold truncate group">{title}</h3>
        </div>
        <div className="flex items-center justify-between mb-10 text-sm opacity-50">
          <span>{new Date(release_date).getFullYear()}</span>
          <span>{vote_average}</span>
        </div>
        <Button onClick={() => navigate(`/movies/${id}`)} variant="primary">
          Watch Now
        </Button>
      </div>
    </div>
  )
}
function FallbackComponent() {
  return (
    <p className="text-red-400 bg-red-50">
      Some thing went wrong with this components
    </p>
  )
}

export default withErrorBoundary(MovieCard, {
  FallbackComponent
})

export const MovieCardSkeleton = () => {
  return (
    <div className="flex flex-col h-full p-3 text-white rounded-lg select-none movie-card bg-slate-800">
      <LoadingSkeleton
        width="100%"
        height="250px"
        radius="8px"
        className="mb-5"
      ></LoadingSkeleton>
      <div className="flex flex-col flex-1">
        <h3 className="mb-3 text-xl font-bold">
          <LoadingSkeleton width="100%" height="20px"></LoadingSkeleton>
        </h3>
        <div className="flex items-center justify-between mb-10 text-sm opacity-50">
          <span>
            <LoadingSkeleton width="50px" height="10px"></LoadingSkeleton>
          </span>
          <span>
            <LoadingSkeleton width="30px" height="10px"></LoadingSkeleton>
          </span>
        </div>
        <LoadingSkeleton
          width="100%"
          height="45px"
          radius="6px"
        ></LoadingSkeleton>
      </div>
    </div>
  )
}
