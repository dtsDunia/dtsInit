import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { Latest } from '.'

export default (build: EndpointBuilder<any, any, any>) =>
  build.query<Latest, string>({
    query: () => `/movie/latest`,
  })
