import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import StartScreen from './screens/StartScreen';  
import ShowScreen from './screens/ShowScreen';  
import PopularProducts from './screens/PopularProducts';  

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="StartScreen">
        <Stack.Screen name="StartScreen" component={StartScreen} />
        <Stack.Screen name="ShowScreen" component={ShowScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
