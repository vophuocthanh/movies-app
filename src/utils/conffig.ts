export const fetcher = (...args) => fetch(...args).then(res => res.json())
export const apiKey = import.meta.env.VITE_API_KEY
const tmdbEndpoint = import.meta.env.VITE_HTPPS_MOVIE
const tmdbEndpointSearch = import.meta.env.VITE_HTPPS_MOVIE_SEARCH
export const tmdbAPI = {
  getMovieList: (type, page = 1) =>
    `${tmdbEndpoint}/${type}?api_key=${apiKey}&page=${page}`,
  getMovieDetails: movieId => `${tmdbEndpoint}/${movieId}?api_key=${apiKey}`,
  getCredits: movieId => `${tmdbEndpoint}/${movieId}/credits?api_key=${apiKey}`,
  getVideo: movieId => `${tmdbEndpoint}/${movieId}/videos?api_key=${apiKey}`,
  getSimilar: movieId => `${tmdbEndpoint}/${movieId}/similar?api_key=${apiKey}`,
  getMovieSearch: (
    query,
    page
  ) => `${tmdbEndpointSearch}?api_key=${apiKey}&query=${query}
    &page=${page}`,
  imageOriginal: url => `https://image.tmdb.org/t/p/original/${url}`,
  image500: url => `https://image.tmdb.org/t/p/w500/${url}`,
  imageBackground: url => `https://image.tmdb.org/t/p/original/${url}`
}
