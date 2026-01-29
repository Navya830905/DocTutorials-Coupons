import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';

const MENU_ITEMS = [
  'Dashboard',
  'All Plans',
  'Send Coupon Code',
  'Get Shared Coupons',
  'All Subscriptions',
];

export default function CustomDrawer({ state, navigation }) {
  const activeRoute = state.routeNames[state.index];

  return (
    <DrawerContentScrollView contentContainerStyle={styles.container}>
      {MENU_ITEMS.map((item) => {
        const isActive = activeRoute === item;

        return (
          <TouchableOpacity
            key={item}
            style={[
              styles.menuItem,
              isActive && styles.activeItem,
            ]}
            onPress={() => navigation.navigate(item)}
          >
            <Text
              style={[
                styles.menuText,
                isActive && styles.activeText,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        );
      })}
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingHorizontal: 16,
  },

  menuItem: {
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    marginBottom: 12,
  },

  activeItem: {
    backgroundColor: '#8FE9FF',
  },

  menuText: {
    fontSize: 15,
    color: '#374151',
    fontWeight: '500',
  },

  activeText: {
    color: '#0F172A',
    fontWeight: '600',
  },
});
