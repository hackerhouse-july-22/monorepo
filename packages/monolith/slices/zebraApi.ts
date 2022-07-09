import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const zebraApi = createApi({
  reducerPath: "zebraApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: `${process.env.API_URL}/api/v0/zebra/`,
    baseUrl: `http://127.0.0.1:8000/api/v0/zebra/`,
    prepareHeaders: (headers) => {
      headers.set("Accept", "application/json");
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["zebra"],
  endpoints: (builder) => ({

    // CRUD
    createNftListing: builder.mutation({
      query(data) {
        console.log("data", data);
        console.log("in createNftListing mutation: data.supplierAddress", data.supplierAddress);
        const {
          supplierAddress,
          nftAddress,
          tokenId,
          pricePerSecond,
          maxRentDuration,
          nonce
       } = data
        console.log("in createNftListing mutation post data deconstruction", supplierAddress, nftAddress, tokenId, pricePerSecond, maxRentDuration, nonce);
        return {
          url: `create/`,
          method: "POST",
          body: data


        }
      },
      invalidatesTags: ["zebra"],
    }),

    readNftListing: builder.query({
      query: (pk) => `read/${pk}/`,
    }),

    updateNftListing: builder.mutation({
      query({id: pk, ...data}) {
        return {
          url: `update/${pk}/`,
          method: "POST",
          body: data,
        }
      },
      invalidatesTags: ["zebra"],
    }),

    deleteNftListing: builder.mutation({
      query(data) {
        const { pk } = data
        return {
          url: `delete/${pk}/`,
          method: "DELETE",
        }
      },
      invalidatesTags: ["zebra"],
    }),

    // List Views
    getAllNfts: builder.query({
      query: () => "list",
      providesTags: ["zebra"],
    }),
    // refetchOnMountOrArgChange: true,

    getNftsBySupplier: builder.query({
      query: (address) => `list/by-supplier/${address}/`,
      providesTags: ["zebra"],
    }),

    getNftsByCollection: builder.query({
      query: (address) => `list/by-collection/${address}/`,
      providesTags: ["zebra"],
    }),

    getNftsByPrice: builder.query({
      query: (price) => `list/by-price/${price}/`,
      providesTags: ["zebra"],
    }),

  }),
});

export const {

  // CRUD
  useCreateNftListingMutation,
  useReadNftListingQuery,
  useLazyReadNftListingQuery,
  useUpdateNftListingMutation,
  useDeleteNftListingMutation,

  // List Views
  useGetAllNftsQuery,
  useLazyGetAllNftsQuery,
  useGetNftsBySupplierQuery,
  useLazyGetNftsBySupplierQuery,
  useGetNftsByCollectionQuery,
  useLazyGetNftsByCollectionQuery,
  useGetNftsByPriceQuery,
  useLazyGetNftsByPriceQuery,


} = zebraApi;
