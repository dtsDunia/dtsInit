import { Config } from '@/Config'
import {
  BaseQueryFn,
  FetchArgs,
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react'
const baseQuery = fetchBaseQuery({ 
  baseUrl: Config.API_URL,
  prepareHeaders: (headers, {}) => {
      headers.set('authorization', `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NjI4NjIxM2JkZWY2YjcxYzQ0ODUzYWE4NTExMWIzYiIsInN1YiI6IjYxOGE1NDBiMmNkZTk4MDA0MjUxNTI1NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.C8LRmDjmvbDQPrB8dsMEtJOpiusPhiFu9mu8-6DXuhA`)
    return headers
  }, 

})

const baseQueryWithInterceptor: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)
  if (result.error && result.error.status === 401) {
  }
  return result
}

export const api = createApi({
  baseQuery: baseQueryWithInterceptor,
  endpoints: () => ({}),
})
