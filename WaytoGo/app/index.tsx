import { registerRootComponent } from 'expo';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import 'react-native-reanimated';

import NavigationScreen from '../screens/Navigation';
import RouteScreen from '../screens/Routes';

const Stack = createNativeStackNavigator();

export default function App() {
  return (

    <SafeAreaProvider>
      
      <NavigationContainer independent={true}>
        <Stack.Navigator>
          <Stack.Screen name="Routes" 
            component={RouteScreen}
            options={{headerShown: false, presentation: 'fullScreenModal'}}
          />
          <Stack.Screen name="Map" component={NavigationScreen}
          options={{headerShown: false, presentation: 'fullScreenModal'}} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

registerRootComponent(App);