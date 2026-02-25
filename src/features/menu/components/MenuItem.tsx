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
  onToggle: (item: MenuItemType) => void;
  hasChildren: boolean;
  isExpanded: boolean;
  containerStyle?: ViewStyle;
}

const INDENT = 12;

const MenuItemComponent: React.FC<Props> = ({
  item,
  level = 0,
  onPress,
  onToggle,
  hasChildren,
  isExpanded,
  containerStyle,
}) => {
  const handlePress = () => {
    if (hasChildren) {
      onToggle(item);
    } else if (item.url) {
      onPress(item);
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity
        style={[styles.row, { paddingLeft: 16 + level * INDENT }]}
        onPress={handlePress}
        disabled={!item.url && !hasChildren}
      >
        <Text style={styles.label}>
          {item.menuLabel}
          {item.secure ? ' (secure)' : ''}
          {hasChildren ? (isExpanded ? ' ▼' : ' ▶') : ''}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  row: {
    paddingVertical: 10,
  },
  label: {
    color: '#ffffff',
    fontSize: 14,
  },
});

export const MenuItem = memo(MenuItemComponent);