import { createSlice } from '@reduxjs/toolkit'
import { Genres, NowPlaying, genre, NowPlayingResult } from '@/Services/modules/movies'
const slice = createSlice({
  name: 'movies',
  initialState: { genres:null, nowPlaying:null, similar:{} } as MoviesState,
  reducers: {
    setGenres : (
        state,
        { payload : { genres } }: GenresPayload,
      ) => {
        state.genres = genres.genres
      },
    setMovies : (
    state,
    { payload : { movies,page } }: MoviesPayload,
    ) => {
      console.log("setMovies", page)
      if(page == 1){
        state.nowPlaying = movies
      }else{
        if(state.nowPlaying){
          state.nowPlaying.dates.maximum = movies.dates.maximum
          state.nowPlaying.page = page
          state.nowPlaying.results = [...state.nowPlaying.results,...movies.results]
        }
      }
    
    },
    setSimilar : (
      state,
      { payload : { similar, page, movieId } }: SimilarPayload,
    ) => {
      console.log('action set similar '+page,movieId)
      if(page == 1){
        state.similar.data=similar
        state.similar.movieId=movieId
      }else{
        state.similar.data = [...state.similar.data,...similar]
        state.similar.movieId = movieId
      }
    },
    clearSimilar : (
      state,
      { payload }: ClearSimilar,
    ) => {
        state.similar.data=[]
        state.similar.movieId=0

    },
  },
})

export const { setGenres, setMovies,setSimilar,clearSimilar } = slice.actions

export default slice.reducer
export type MoviesState = {
    genres : null | genre[],
    nowPlaying : null | NowPlaying,
    similar: {
      data :NowPlayingResult[],
      movieId: number
    }
}

type GenresPayload = {
    payload : {
        genres : Genres
    }
} 
type MoviesPayload = {
    payload : {
        movies : NowPlaying,
        page: number
    }
}
type SimilarPayload = {
  payload : {
    similar : NowPlayingResult[],
    movieId : number,
    page: number
  }
}

type ClearSimilar = {
  payload : undefined
}