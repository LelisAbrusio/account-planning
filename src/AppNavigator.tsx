import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import App from './App';

const Stack = createStackNavigator();

const AppNavigator: React.FC = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={App} />
  </Stack.Navigator>
);

export default AppNavigator;