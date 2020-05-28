import {Pages} from '../../../native/config/pages';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const BottomTab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <BottomTab.Navigator initialRouteName={Pages[0].name}>
      {Pages.map(page => (
        <BottomTab.Screen
          key={page.name}
          name={page.name}
          component={page.component}
        />
      ))}
    </BottomTab.Navigator>
  );
}
