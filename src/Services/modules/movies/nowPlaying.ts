import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { NowPlaying } from '.'

export default (build: EndpointBuilder<any, any, any>) =>
  build.query<NowPlaying, string>({
    query: (page) => `/movie/now_playing/?page=${page}`,
  })
