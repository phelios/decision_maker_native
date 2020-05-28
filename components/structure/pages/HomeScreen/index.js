import {Button, View} from 'react-native';
import React from 'react';

export default function HomeScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button title="Go to notifications" />
    </View>
  );
}
