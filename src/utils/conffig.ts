export const fetcher = (...args) => fetch(...args).then(res => res.json())
export const apiKey = '55e25eecd2352fcad30e9d1c0a5aa854'
const tmdbEndpoint = 'https://api.themoviedb.org/3/movie'
const tmdbEndpointSearch = 'https://api.themoviedb.org/3/search/movie'
export const tmdbAPI = {
  getMovieList: (type, page = 1) =>
    `${tmdbEndpoint}/${type}?api_key=${apiKey}&page=${page}`,
  getMovieDetails: movieId => `${tmdbEndpoint}/${movieId}?api_key=${apiKey}`,
  getCredits: movieId => `${tmdbEndpoint}/${movieId}/credits?api_key=${apiKey}`,
  getVideo: movieId => `${tmdbEndpoint}/${movieId}/videos?api_key=${apiKey}`,
  getSimilar: movieId => `${tmdbEndpoint}/${movieId}/similar?api_key=${apiKey}`,
  // chức năng search
  getMovieSearch: (
    query,
    page
  ) => `${tmdbEndpointSearch}?api_key=${apiKey}&query=${query}
    &page=${page}`,
  imageOriginal: url => `https://image.tmdb.org/t/p/original/${url}`,
  image500: url => `https://image.tmdb.org/t/p/w500/${url}`,
  imageBackground: url => `https://image.tmdb.org/t/p/original/${url}`
}
