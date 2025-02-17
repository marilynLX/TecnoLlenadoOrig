import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '@/app/screens/HomeScreen';
import AlertsScreen from '@/app/screens/AlertsScreen';
import GraphsScreen from '@/app/screens/GraphsScreen';
import HomeScreen1 from '@/app/screens/HomeScreen';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen1} />
      <Tab.Screen name="Alerts" component={AlertsScreen} />
      <Tab.Screen name="Graphs" component={GraphsScreen} />
    </Tab.Navigator>
  );
};

export default AppNavigator;
