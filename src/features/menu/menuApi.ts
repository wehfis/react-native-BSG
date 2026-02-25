import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { MENU_BASE_API, MENU_CONFIGURATION_PATH } from '../../constants/urls';
import type { MenuConfiguration } from './types';

export const menuApi = createApi({
  reducerPath: 'menuApi',
  baseQuery: fetchBaseQuery({
    baseUrl: MENU_BASE_API,
    prepareHeaders: (headers) => {
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMenu: builder.query<MenuConfiguration, void>({
      query: () => MENU_CONFIGURATION_PATH,
    }),
  }),
});

export const { useGetMenuQuery } = menuApi;