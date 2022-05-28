import React from 'react';
//React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Welcome from '../pages/Welcome';
import Signin from '../pages/account/Signin';
import Signup from '../pages/account/Signup';
import { Home } from '../pages/home';
import Theme from '../styles/index'
const Stack = createNativeStackNavigator();

const { primary, tertiary } = Theme.light.colors;

const RootStack = () => {
    return (
        <Stack.Navigator
            screenOptions={
                {
                    headerStyle: {
                        backgroundColor: 'transparent',
                    },
                    headerTintColor: tertiary,
                    headerTransparent: true,
                    headerTitle: '',
                    headerLeftContainerStyle: { paddingLeft: 20 }
                }
            }
            initialRouteName="welcome"
        >
            <Stack.Screen name='welcome' component={Welcome} />
            <Stack.Screen name='signin' component={Signin} />
            <Stack.Screen name='signup' component={Signup} />
            <Stack.Screen options={{ headerTintColor: primary }} name='home' component={Home} />
        </Stack.Navigator>
    )
}
export default RootStack