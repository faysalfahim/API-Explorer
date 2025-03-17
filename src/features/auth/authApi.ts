import { apiSlice } from "../api/apiSlice";

const handleAuthQueryStarted = async () => {};

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
      onQueryStarted: handleAuthQueryStarted,
    }),
    register: builder.mutation({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
      onQueryStarted: handleAuthQueryStarted,
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
