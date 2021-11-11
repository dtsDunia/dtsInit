import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { Genres } from '.'

export default (build: EndpointBuilder<any, any, any>) =>
  build.query<Genres, string>({
    query: () => `/genre/movie/list`,
  })
