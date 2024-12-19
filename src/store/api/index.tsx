import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { API } from "../../hook/useEnv";

const baseQuery = async (args: any, api: any, extraOptions: any) => {
  const rawBaseQuery = fetchBaseQuery({
    baseUrl: API,
  });

  const result = await rawBaseQuery(args, api, extraOptions);

  if (result.error) {
    const { status } = result.error;
    if (status === 401 || status === 403) {
      console.error("Unauthorized access - Redirecting to login...");
    }
  }
  return result;
};
const baseQueryWithRetry = retry(baseQuery, { maxRetries: 0 });

export const api = createApi({
  reducerPath: "chat",
  tagTypes: ["chat"],
  baseQuery: baseQueryWithRetry,
  endpoints: () => ({}),
});
