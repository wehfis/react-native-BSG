import type { DrawerScreenProps } from '@react-navigation/drawer';

export type RootDrawerParamList = {
  WebView: {
    url: string;
    title?: string;
  };
};

export type WebViewScreenProps = DrawerScreenProps<
  RootDrawerParamList,
  'WebView'
>;