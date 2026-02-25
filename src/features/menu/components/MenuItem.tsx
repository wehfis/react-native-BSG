import React, { memo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import type { MenuItem as MenuItemType } from '../types';
import { colors } from '../../../constants/colors';

interface Props {
  item: MenuItemType;
  level?: number;
  onPress: (item: MenuItemType) => void;
  containerStyle?: ViewStyle;
}

const INDENT = 12;

const MenuItemComponent: React.FC<Props> = ({
  item,
  level = 0,
  onPress,
  containerStyle,
}) => {
  const hasChildren = !!item.children && item.children.length > 0;

  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity
        style={[styles.row, { paddingLeft: 16 + level * INDENT }]}
        onPress={() => item.url && onPress(item)}
        disabled={!item.url}
      >
        <Text style={styles.label}>{item.title}</Text>
      </TouchableOpacity>

      {hasChildren &&
        item.children!.map((child) => (
          <MenuItemComponent
            key={child.id}
            item={child}
            level={level + 1}
            onPress={onPress}
          />
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  row: {
    paddingVertical: 10,
  },
  label: {
    color: colors.text,
    fontSize: 14,
  },
});

export const MenuItem = memo(MenuItemComponent);