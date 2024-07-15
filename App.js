/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Home from './assets/screens/home';
import Configuracoes from './assets/screens/config';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          let sizeIcon;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
            sizeIcon = focused ? 23 : 21;
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
            sizeIcon = focused ? 23 : 21;
          }

          return <Icon name={iconName} size={sizeIcon} color={color} />;
        },
        tabBarActiveTintColor: '#183D3D',
        tabBarInactiveTintColor: '#5C8374',
        tabBarStyle: {backgroundColor: '#93B1A6'},
        tabBarHideOnKeyboard: true,
      })}>
      <Tab.Screen name="Home" component={Home} options={{headerShown: false}} />
      <Tab.Screen
        name="Settings"
        component={Configuracoes}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar barStyle={'default'} />
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Tabs" component={TabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
