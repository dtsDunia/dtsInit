import { api } from '../../api'
import nowPlaying from './nowPlaying'
import similiar from './similiar'
import genres from './genres'
export const moviesApi = api.injectEndpoints({
  endpoints: build => ({
    now: nowPlaying(build),
    similiar : similiar(build),
    genres: genres(build)
  }),
  overrideExisting: false,
})

export const { useLazyNowQuery, useLazySimiliarQuery, useLazyGenresQuery } = moviesApi
export type NowPlayingResult ={
  poster_path: string | null,
  adult: boolean,
  overview: string,
  release_date: string,
  genre_ids: number[],
  id: number,
  original_title: string,
  original_language: string,
  title: string,
  backdrop_path: string,
  popularity: number,
  vote_count: number,
  video: boolean,
  vote_average: number
}

export type NowPlaying = {
      page : number,
      results : NowPlayingResult[],
      dates: {
          maximum: string,
          minimum: string
      },
      total_pages : number,
      total_results: number
}
export type genre = {
    id : number,
    name : string
}

export type Genres ={
    genres : genre[]
}