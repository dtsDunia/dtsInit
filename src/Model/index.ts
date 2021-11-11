import { MoviesState } from '@/Store/Movies'
import { ThemeState } from '@/Store/Theme'
import { NowPlayingResult } from '@/Services/modules/movies'
export type GeneralState = {
    api : any,
    movies: MoviesState,
    theme: ThemeState
}

export type RootParamList = {
    Startup : undefined
    Main: undefined
    Detail: NowPlayingResult|null|undefined
}