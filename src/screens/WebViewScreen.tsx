import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import type { WebViewScreenProps } from '../navigation/types';
import { colors } from '../constants/colors';
import { SafeAreaView } from 'react-native-safe-area-context';

export const WebViewScreen: React.FC<WebViewScreenProps> = ({ route }) => {
  const { url } = route.params;

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom', 'left', 'right']}>
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
    </SafeAreaView>
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