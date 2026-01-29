import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from '../components/drawer/CustomDrawer';

import DashboardScreen from '../screens/DashboardScreen';
import AllPlansScreen from '../screens/AllPlansScreen';
import SendCouponScreen from '../screens/SendCouponScreen';
import SharedCouponsScreen from '../screens/SharedCouponsScreen';
import SubscriptionsScreen from '../screens/SubscriptionScreen';
import HeaderUserMenu from '../components/ui/HeaderUserMenu';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: true,
        headerRight: () => <HeaderUserMenu />,
        headerStyle: {
          backgroundColor: '#FFFFFF',
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontSize: 16,
          fontWeight: '600',
          color: '#0F172A',
        },
        headerTintColor: '#0F172A',
        drawerStyle: {
          backgroundColor: '#EAFBFF',
          width: 260,
        },
      }}
    >
      <Drawer.Screen name="Dashboard" component={DashboardScreen} />
      <Drawer.Screen name="All Plans" component={AllPlansScreen} />
      <Drawer.Screen name="Send Coupon Code" component={SendCouponScreen} />
      <Drawer.Screen name="Get Shared Coupons" component={SharedCouponsScreen} />
      <Drawer.Screen name="All Subscriptions" component={SubscriptionsScreen} />
    </Drawer.Navigator>
  );
}
