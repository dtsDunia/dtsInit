import { api } from '../../api'
import latestList from './latestList'

export const latestApi = api.injectEndpoints({
  endpoints: build => ({
    latest: latestList(build),
  }),
  overrideExisting: false,
})

export const { useLazyLatestQuery } = latestApi

export type Latest = {
    
        adult: boolean
        backdrop_path: string | null
        belongs_to_collection: null | string
        budget: number
        genres: [
          {
            id: number
            name: string
          }
        ],
        homepage: string
        id: number
        imdb_id: string
        original_language: string
        original_title: string
        overview: string
        popularity: number
        poster_path: string,
        production_companies: [],
        production_countries: [],
        release_date: string,
        revenue: number,
        runtime: number,
        spoken_languages: [],
        status: string,
        tagline: string,
        title: string,
        video: boolean,
        vote_average: number,
        vote_count: number
      
}
