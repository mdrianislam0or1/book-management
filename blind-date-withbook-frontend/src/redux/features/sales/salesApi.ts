/* eslint-disable react-hooks/rules-of-hooks */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { useCurrentToken } from "../auth/authSlice";
import { RootState } from "../../store";

export const salesApi = createApi({
  reducerPath: "salesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://blind-date-withbook.vercel.app/api",
    prepareHeaders: (headers, { getState }) => {
      const token = useCurrentToken(getState() as RootState);
      if (token) {
        headers.set("Authorization", `${token}`);
      }
      return headers;
    },
    credentials: "include",
  }),
  endpoints: (builder) => ({
    sellProduct: builder.mutation({
      query: ({ productId, quantity, buyerName, saleDate }) => ({
        url: "/book/sell",
        method: "POST",
        body: JSON.stringify({ productId, quantity, buyerName, saleDate }),
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    getWeeklySales: builder.query({
      query: () => "/book/history/weekly",
    }),

    getDailySales: builder.query({
      query: () => "/book/history/daily",
    }),

    getMonthlySales: builder.query({
      query: () => "/book/history/monthly",
    }),

    getYearlySales: builder.query({
      query: () => "/book/history/yearly",
    }),
  }),
});

export const {
  useSellProductMutation,
  useGetWeeklySalesQuery,
  useGetDailySalesQuery,
  useGetMonthlySalesQuery,
  useGetYearlySalesQuery,
} = salesApi;
