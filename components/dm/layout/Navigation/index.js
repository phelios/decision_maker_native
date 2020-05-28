import React from 'react';
import {Pages} from '../../../native/config/pages';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';

const BottomTab = createBottomTabNavigator();

export default function Navigation(props) {
  return (
    <>
      <NavigationContainer>
        <BottomTab.Navigator initialRouteName={Pages[0].name}>
          {Pages.map(page => (
            <BottomTab.Screen
              key={page.name}
              name={page.name}
              component={page.component}
            />
          ))}
        </BottomTab.Navigator>
      </NavigationContainer>
    </>
  );
}
