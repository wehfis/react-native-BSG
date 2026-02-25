import React from 'react';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useGetMenuQuery } from '../features/menu/menuApi';
import { MenuItem } from '../features/menu/components/MenuItem';
import type { MenuItem as MenuItemType } from '../features/menu/types';
import { colors } from '../constants/colors';
import { useAppDispatch } from '../app/hooks';
import { setSelectedItemId } from '../features/menu/menuSlice';

export const AppDrawerContent: React.FC<DrawerContentComponentProps> = (
  props
) => {
  const { navigation } = props;
  const { data, isLoading, isError, refetch } = useGetMenuQuery();
  const dispatch = useAppDispatch();

  const items: MenuItemType[] = data?.menuItems ?? [];

  const handlePress = (item: MenuItemType) => {
    if (!item.url) {
      return;
    }
    const id = item.id ?? `${item.menuLabel}-${item.url}`;
    dispatch(setSelectedItemId(id));
    navigation.navigate('WebView', {
      url: item.url,
      title: item.menuLabel,
    });
  };

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.scrollContent}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Börse Stuttgart</Text>
      </View>

      {isLoading && (
        <View style={styles.center}>
          <ActivityIndicator size="small" color={colors.primary} />
        </View>
      )}

      {isError && (
        <View style={styles.center}>
          <Text style={styles.errorText}>Failed to load menu.</Text>
          <Text style={styles.retryText} onPress={refetch}>
            Tap to retry
          </Text>
        </View>
      )}

      {items.length > 0 && (
        <View style={styles.menuContainer}>
          {items.map((item) => (
            <MenuItem
              key={item.id ?? `${item.menuLabel}-${item.url}`}
              item={item}
              onPress={handlePress}
            />
          ))}
        </View>
      )}
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: colors.drawerBackground },
  scrollContent: { paddingVertical: 8 },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: colors.primary,
  },
  headerTitle: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  menuContainer: {
    marginTop: 8,
  },
  center: {
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    color: 'red',
    marginBottom: 4,
  },
  retryText: {
    color: colors.primary,
    textDecorationLine: 'underline',
  },
});