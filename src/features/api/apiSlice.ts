import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  DefinitionType,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

import { toast } from "react-toastify";
import { userLoggedOut } from "../auth/authSlice";
import { RootState } from "../../app/store";

export interface ErrorResponse {
  message?: string;
}

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_REACT_APP_API_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth?.accessToken; // Assuming the token is stored in the Redux store

    // If token exists, set the Authorization header
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithErrorHandling: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
> = async (args, api, extraOptions): Promise<any> => {
  const result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 404) {
    const errorData = result.error.data as ErrorResponse;
    toast.error(errorData.message);
  }
  if (result?.error?.status === 403) {
    const errorData = result.error.data as ErrorResponse;
    toast.error(errorData.message);
  }
  if (result?.error?.status === 401) {
    localStorage.removeItem("auth");
    api.dispatch(userLoggedOut());
  }
  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithErrorHandling,
  endpoints: () => ({}),
  tagTypes: [],
});
