import * as Linking from 'expo-linking';
import { EVENTS_URL } from '../constants/urls';
import type { RootDrawerParamList } from './types';

const prefix = Linking.createURL('/');

export const linking = {
  prefixes: ['bsgapp://', prefix],
  config: {
    screens: {
      WebView: {
        path: 'events',
        // When bsgapp://events is opened, map to Events URL
        stringify: {
          url: () => '',
        },
        parse: {
          url: () => EVENTS_URL,
        },
      },
    } satisfies Record<keyof RootDrawerParamList, any>,
  },
};