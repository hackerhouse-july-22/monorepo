import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const zebraApi = createApi({
  reducerPath: "zebraApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.API_URL}/api/v0/zebra/`,
    prepareHeaders: (headers, { getState }) => {
      headers.set("Accept", "application/json");
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["zebra"],
  endpoints: (builder) => ({
    getAllNfts: builder.query({
      query: () => "list",
      providesTags: ["zebra"],
    }),
    // refetchOnMountOrArgChange: true,
  }),
});

export const {
  useGetAllNftsQuery,
  // useLazyGetAllNftsQuery,
} = zebraApi;