import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Navigation from './Navigation';

export default function Main(props) {
  return (
    <NavigationContainer>
      <Navigation />
    </NavigationContainer>
  );
}
