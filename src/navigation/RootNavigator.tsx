import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAppSelector } from '../store/hooks';
import { RootStackParamList } from './types';
import AuthStack from './AuthStack';
import MainTabs from './MainTabs';
import MedicineDetailsScreen from '../screens/medicine/MedicineDetailsScreen';

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  return (
    <RootStack.Navigator>
      {!isAuthenticated ? (
        <RootStack.Screen name="Auth" component={AuthStack} options={{ headerShown: false }} />
      ) : (
        <>
          <RootStack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
          <RootStack.Screen name="MedicineDetails" component={MedicineDetailsScreen} options={{ title: 'Medicine Details' }} />
        </>
      )}
    </RootStack.Navigator>
  );
}
