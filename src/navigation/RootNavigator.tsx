import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { linking } from './linking';
import { WebViewScreen } from '../screens/WebViewScreen';
import { AppDrawerContent } from '../components/AppDrawerContent';
import { BASE_WEB_URL } from '../constants/urls';
import type { RootDrawerParamList } from './types';

const Drawer = createDrawerNavigator<RootDrawerParamList>();

export const RootNavigator = () => {
  return (
    <NavigationContainer linking={linking}>
      <Drawer.Navigator
        initialRouteName="WebView"
        drawerContent={(props) => <AppDrawerContent {...props} />}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Drawer.Screen
          name="WebView"
          component={WebViewScreen}
          initialParams={{
            url: BASE_WEB_URL,
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};