import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import type { WebViewScreenProps } from '../navigation/types';
import { colors } from '../constants/colors';

export const WebViewScreen: React.FC<WebViewScreenProps> = ({ route }) => {
  const { url } = route.params;

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: url }}
        userAgent="bsgapp"
        startInLoadingState
        renderLoading={() => (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        )}
        onError={(syntheticEvent) => {
          console.warn('WebView error', syntheticEvent.nativeEvent);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  loader: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
});