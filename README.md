# BSG Test App

A minimal React Native app that wraps the Börse Stuttgart website with a native drawer menu and deep link support.

## Stack & Framework Choice

- **Framework**: Expo + React Native + TypeScript  
  - Fast setup, great DX, easy splash/deep linking, ideal for WebView-based apps.
- **State Management**: Redux Toolkit + RTK Query  
  - Centralized state, cached API calls, built-in loading/error handling.
- **Navigation**: React Navigation (Drawer)  
  - Native-feeling drawer, deep linking support.
- **Web Content**: `react-native-webview` with `userAgent="bsgapp"`.

## Setup

npm install
npx expo start
