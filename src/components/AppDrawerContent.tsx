import React, { Fragment, useState } from 'react';
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
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  const getItemId = (item: MenuItemType) =>
    item.id ?? `${item.menuLabel}-${item.url ?? 'no-url'}`;

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

  const handleToggle = (item: MenuItemType) => {
    const id = getItemId(item);
    setExpandedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const renderItems = (sourceItems: MenuItemType[], level = 0): React.ReactNode =>
    sourceItems.map((item) => {
      const id = getItemId(item);
      const children = item.menuItems ?? [];
      const hasChildren = children.length > 0;
      const isExpanded = !!expandedIds[id];

      return (
        <Fragment key={id}>
          <MenuItem
            item={item}
            level={level}
            onPress={handlePress}
            onToggle={handleToggle}
            hasChildren={hasChildren}
            isExpanded={isExpanded}
          />
          {hasChildren && isExpanded && renderItems(children, level + 1)}
        </Fragment>
      );
    });

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
          {renderItems(items)}
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