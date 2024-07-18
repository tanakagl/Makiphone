/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {registerGlobals} from 'react-native-webrtc';
import React from 'react';

registerGlobals();

export default function Main() {
  return <App />;
}

AppRegistry.registerComponent(appName, () => Main);
