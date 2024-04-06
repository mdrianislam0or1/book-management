/* eslint-disable react-hooks/rules-of-hooks */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { useCurrentToken } from "../auth/authSlice";
import { RootState } from "../../store";

export const bookApi = createApi({
  reducerPath: "bookApi",
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
    addBook: builder.mutation({
      query: (bookData) => ({
        url: "/book/add",
        method: "POST",
        body: bookData,
      }),
    }),
    getBooks: builder.query({
      query: () => "/book",
    }),
    getSingleBook: builder.query({
      query: (bookId) => `/book/${bookId}`,
    }),
    updateBook: builder.mutation({
      query: ({ bookId, bookData }) => ({
        url: `/book/${bookId}`,
        method: "PUT",
        body: bookData,
      }),
    }),

    deleteBook: builder.mutation({
      query: (bookId) => ({
        url: `/book/${bookId}`,
        method: "DELETE",
      }),
    }),

    deleteBooks: builder.mutation({
      query: (bookIds) => ({
        url: "/book/",
        method: "DELETE",
        body: { bookIds },
      }),
    }),

    filterBooks: builder.mutation({
      query: (filters) => ({
        url: "/book/filter",
        method: "POST",
        body: filters,
      }),
    }),
  }),
});

export const {
  useAddBookMutation,
  useGetBooksQuery,
  useGetSingleBookQuery,
  useDeleteBookMutation,
  useDeleteBooksMutation,
  useUpdateBookMutation,
  useFilterBooksMutation,
} = bookApi;
