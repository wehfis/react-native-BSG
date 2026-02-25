// import * as SplashScreen from 'expo-splash-screen';
// import React, { useCallback, useEffect, useState } from 'react';
// import { Provider } from 'react-redux';
// import { store } from './src/app/store';
// import { RootNavigator } from './src/navigation/RootNavigator';
// import { useGetMenuQuery } from './src/features/menu/menuApi';

// SplashScreen.preventAutoHideAsync().catch(() => {});

// const AppContent = () => {
//   const { isLoading } = useGetMenuQuery();
//   const [ready, setReady] = useState(false);

//   useEffect(() => {
//     if (!isLoading) {
//       setReady(true);
//     }
//   }, [isLoading]);

//   const onLayoutRootView = useCallback(async () => {
//     if (ready) {
//       await SplashScreen.hideAsync();
//     }
//   }, [ready]);

//   if (!ready) {
//     return null;
//   }

//   return <RootNavigator />;
// };

// export default function App() {
//   return (
//     <Provider store={store}>
//       <AppContent />
//     </Provider>
//   );
// }

import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/app/store';
import { RootNavigator } from './src/navigation/RootNavigator';

export default function App() {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
}