/* eslint-disable react-hooks/rules-of-hooks */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { useCurrentToken } from "../../features/auth/authSlice";
import { RootState } from "../../store";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://blind-date-withbook.vercel.app/api",
    prepareHeaders: (headers, { getState }) => {
      const token = useCurrentToken(getState() as RootState);

      if (token) {
        headers.set("Authorization", `${token}`);
      }
      headers.set("Content-Type", "application/json");

      return headers;
    },
  }),
  endpoints: (builder) => ({
    addToCart: builder.mutation({
      query: (data) => ({
        url: "/cart/add",
        method: "POST",
        body: data,
      }),
    }),

    removeFromCart: builder.mutation({
      query: (bookId) => ({
        url: `/cart/remove/${bookId}`,
        method: "DELETE",
      }),
    }),

    updateCartItemQuantity: builder.mutation({
      query: (data) => ({
        url: "/cart/update",
        method: "PUT",
        body: data,
      }),
    }),

    getCartSummary: builder.query({
      query: () => "/cart",
    }),
  }),
});

export const {
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useUpdateCartItemQuantityMutation,
  useGetCartSummaryQuery,
} = cartApi;
