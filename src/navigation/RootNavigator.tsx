import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerToggleButton,
} from '@react-navigation/drawer';
import { Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { linking } from './linking';
import { WebViewScreen } from '../screens/WebViewScreen';
import { AppDrawerContent } from '../components/AppDrawerContent';
import { BASE_WEB_URL } from '../constants/urls';
import { colors } from '../constants/colors';
import type { RootDrawerParamList } from './types';

const Drawer = createDrawerNavigator<RootDrawerParamList>();

export const RootNavigator = () => {
  return (
    <NavigationContainer linking={linking}>
      <Drawer.Navigator
        initialRouteName="WebView"
        drawerContent={(props) => <AppDrawerContent {...props} />}
        screenOptions={({ navigation, route }) => {
          const routeParams = (route?.params ?? {}) as { url?: string };
          const currentUrl = routeParams.url;
          const isHome = !currentUrl || currentUrl === BASE_WEB_URL;

          return {
            headerShown: true,
            headerStyle: { backgroundColor: colors.primary },
            headerTintColor: '#ffffff',
            headerTitleAlign: 'left',
            headerTitle: () => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('WebView', { url: BASE_WEB_URL })
                }
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '600',
                    color: '#ffffff',
                  }}
                >
                  Boerse Stuttgart
                </Text>
              </TouchableOpacity>
            ),
            headerRight: ({ tintColor }) => (
              <DrawerToggleButton tintColor={tintColor} />
            ),
            headerLeft: ({ tintColor }) =>
              isHome
                ? null
                : (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('WebView', { url: BASE_WEB_URL })
                    }
                    style={{ paddingHorizontal: 8 }}
                  >
                    <Ionicons
                      name="arrow-back"
                      size={22}
                      color={tintColor ?? '#ffffff'}
                    />
                  </TouchableOpacity>
                ),
          };
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