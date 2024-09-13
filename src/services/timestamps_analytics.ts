import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { Timestamp } from "../types/timestamp-type";

export const timeStamps = createApi({
    reducerPath: 'timestampsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://5025y.wiremockapi.cloud/json/1' }),
    endpoints: (builder) => ({
        getTimeStamps: builder.query<Timestamp[], ''>({
            query: () => '',
        }),
    }),
})

// Export the auto-generated hook for the `getTimeStamps` query endpoint
export const { useGetTimeStampsQuery } = timeStamps;