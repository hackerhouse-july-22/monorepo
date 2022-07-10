import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const zebraApi = createApi({
  reducerPath: "zebraApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: `${process.env.API_URL}/api/v0/zebra/`,
    baseUrl: `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/api/v0/zebra/`,
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
        return {
          url: `create/`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["zebra"],
    }),

    readNftListing: builder.query({
      query: (id) => `read/${id}/`,
    }),

    updateNftListing: builder.mutation({
      query({ id, ...data }) {
        return {
          url: `update/${id}/`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["zebra"],
    }),

    deleteNftListing: builder.mutation({
      query(id) {
        return {
          url: `delete/${id}/`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["zebra"],
    }),

    // List Views
    getAllNfts: builder.query({
      query: () => "list/",
      providesTags: ["zebra"],
    }),
    // refetchOnMountOrArgChange: true,

    getNftsBySupplier: builder.query({
      query: (address) => `list/by-supplier/${address}/`,
      providesTags: ["zebra"],
    }),

    getNftsByCollection: builder.query({
      query: (address) => `list/by-collection/${address}/`,
      // query(address) {
      //   return {
      //     url: `list/by-collection/${address}/`,
      //     method: "GET",
      //   }
      // },
      providesTags: ["zebra"],
    }),

    getNftsByPrice: builder.query({
      query: () => `list/by-price/`,
      providesTags: ["zebra"],
    }),
    // Wallet Auth/Gnosis
    createWalletInfo: builder.mutation({
      query(data) {
        return {
          url: `wallet/create/`,
          method: "POST",
          body: data,
        };
      },
    }),

    getWalletInfo: builder.query({
      query: (address) => `wallet/read/${address}/`,
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

  // Wallet Auth/Gnosis
  useCreateWalletInfoMutation,
  useGetWalletInfoQuery,
  useLazyGetWalletInfoQuery,
} = zebraApi;
