import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const zebraApi = createApi({
  reducerPath: "zebraApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.API_URL}/api/v0/zebra/`,
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
        const {
          supplierAddress,
          nftAddress,
          tokenId,
          pricePerSecond,
          maxRentDuration,
          nonce
        } = data
        return {
          url: `create/`,
          method: "POST",
          body: {
            supplierAddress: `${supplierAddress}`,
            nftAddress: `${nftAddress}`,
            tokenId: `${tokenId}`,
            pricePerSecond: `${pricePerSecond}`,
            maxRentDuration: `${maxRentDuration}`,
            nonce: `${nonce}`
          },

        }
      },
      invalidatesTags: ["zebra"],
    }),

    readNftListing: builder.query({
      query: (pk) => `read/${pk}/`,
    }),

    updateNftListing: builder.mutation({
      query(data) {
        const {
          pk,
          supplierAddress,
          nftAddress,
          tokenId,
          pricePerSecond,
          maxRentDuration,
          nonce
        } = data
        return {
          url: `update/${pk}/`,
          method: "POST",
          body: {
            supplierAddress: `${supplierAddress}`,
            nftAddress: `${nftAddress}`,
            tokenId: `${tokenId}`,
            pricePerSecond: `${pricePerSecond}`,
            maxRentDuration: `${maxRentDuration}`,
            nonce: `${nonce}`
          },
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
