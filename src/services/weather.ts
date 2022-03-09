import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const weatherApi = createApi({
  reducerPath: "weatherApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://weather-app-back-powerz.herokuapp.com/api/v1",
    prepareHeaders: (headers: Headers) => {
      headers.set("Access-Control-Allow-Origin", "*");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getWeatherByCity: builder.query({
      query: (city) => `weather/${city}`,
    }),
    getWeatherByUserLocation: builder.query({
      query: ({ longitude, latitude }) =>
        `weather?lon=${longitude}&lat=${latitude}`,
    }),
  }),
});

export const { useGetWeatherByCityQuery, useGetWeatherByUserLocationQuery } =
  weatherApi;
