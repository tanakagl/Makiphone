/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Home from './assets/screens/home';
import Incall from './assets/screens/incall';
import Settings from './assets/screens/config';
import CombinedProvider from './assets/contexts/CombinedProvider';
import OutgoingCallScreen from './assets/screens/outgoingcall';
import IncomingCallScreen from './assets/screens/incomingcall';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color}) => {
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
        tabBarStyle: {
          backgroundColor: 'rgb(212, 236, 221)',
          borderColor: 'transparent',
        },
        tabBarHideOnKeyboard: true,
      })}>
      <Tab.Screen name="Home" component={Home} options={{headerShown: false}} />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <CombinedProvider>
          <StatusBar barStyle={'default'} />
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Tabs" component={TabNavigator} />
            <Stack.Screen
              name="incomingCall"
              options={{
                headerShown: false,
                cardStyleInterpolator:
                  CardStyleInterpolators.forModalPresentationIOS,
              }}
              component={IncomingCallScreen}
            />
            <Stack.Screen
              name="outgoingCall"
              options={{
                headerShown: false,
                cardStyleInterpolator:
                  CardStyleInterpolators.forModalPresentationIOS,
              }}
              component={OutgoingCallScreen}
            />
            <Stack.Screen
              name="inCall"
              options={{
                headerShown: false,
                cardStyleInterpolator:
                  CardStyleInterpolators.forModalPresentationIOS,
              }}
              component={Incall}
            />
          </Stack.Navigator>
        </CombinedProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
