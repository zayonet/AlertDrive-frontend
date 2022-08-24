import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Home } from './src/pages/home';
import { Theme } from './src/templates/theme';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
// React navigation stack
import Routes from "./src/routes"
import { NavigationContainer } from '@react-navigation/native';

import AuthProvider from './src/contexts/auth.provider';
import FlashMessage from "react-native-flash-message";

//Screens
//import Login from './screens/account/Login';


export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StatusBar style='auto' />
        {/* <Theme> */}
        {/* <Home /> */}
        <Routes />
        {/* </Theme> */}
      </AuthProvider>
      <FlashMessage position="top" />
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#336699',
  },
});