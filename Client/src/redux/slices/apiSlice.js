import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URI = "https://backend.ajproductiondxb.com/api";

// Inject JWT token from localStorage into headers
const baseQuery = fetchBaseQuery({
  baseUrl: API_URI,
  prepareHeaders: (headers) => {
    
    const token = localStorage.getItem('token');

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: [],
  endpoints: (builder) => ({}),
});
