import {NavigationContainer} from '@react-navigation/native';
import {Pages} from '../../../native/config/pages';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

const Stack = createDrawerNavigator();

export default function Navigation(props) {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={Pages[0].name}>
          {Pages.map(page => (
            <Stack.Screen
              key={page.name}
              name={page.name}
              component={page.component}
            />
          ))}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
