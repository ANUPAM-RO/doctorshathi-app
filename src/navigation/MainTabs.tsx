import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/main/HomeScreen';
import CategoriesScreen from '../screens/main/CategoriesScreen';
import CartScreen from '../screens/main/CartScreen';
import OrdersScreen from '../screens/main/OrdersScreen';
import ProfileScreen from '../screens/main/ProfileScreen';
import { TabParamList } from './types';
import { useColorScheme } from '../../hooks/use-color-scheme';
import { themeColors } from '../theme/colors';

const Tab = createBottomTabNavigator<TabParamList>();

export default function MainTabs() {
  const isDark = useColorScheme() === 'dark';
  const colors = isDark ? themeColors.dark : themeColors.light;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: { backgroundColor: colors.card, borderTopColor: colors.border },
        tabBarIcon: ({ color, size }) => {
          const iconMap: Record<keyof TabParamList, React.ComponentProps<typeof Ionicons>['name']> = {
            Home: 'home-outline',
            Categories: 'grid-outline',
            Cart: 'cart-outline',
            Orders: 'receipt-outline',
            Profile: 'person-circle-outline',
          };
          return <Ionicons name={iconMap[route.name]} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Categories" component={CategoriesScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Orders" component={OrdersScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
