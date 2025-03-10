import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import AlertsScreen from '../screens/AlertsScreen';
import HomeScreen1 from '../screens/HomeScreen';
import GraphsScreen from '../screens/GraphsScreen';
import ProfileView from '@/components/auth/login/profile/profileView';
import TDSMonitor from '../screens/tds';
import EditTinacoScreen from '../screens/EditTinacoModal';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const Tab = createBottomTabNavigator();
  return (
       <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen1} />
          <Tab.Screen name="Alerts" component={AlertsScreen} />
          <Tab.Screen name="Graphic" component={GraphsScreen} />
          <Tab.Screen name="tds" component={TDSMonitor} />
          <Tab.Screen name="Profile" component={ProfileView} />

        </Tab.Navigator>
  );
}
