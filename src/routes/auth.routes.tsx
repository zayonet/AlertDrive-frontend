import React from 'react';
//React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import Theme from '../styles/index'
import Welcome from '../pages/Welcome';
const AuthStack = createNativeStackNavigator();

const { primary, tertiary } = Theme.light.colors;

const AuthRoutes: React.FC = () => {
    return (
        <AuthStack.Navigator
            screenOptions={
                {
                    headerStyle: {
                        backgroundColor: 'transparent',
                    },
                    headerTintColor: tertiary,
                    headerTransparent: true,
                    headerTitle: '',
                }
            }
            initialRouteName="Welcome"
        >
            <AuthStack.Screen name='Welcome' component={Welcome} />
            <AuthStack.Screen name='SignIn' component={SignIn} />
            <AuthStack.Screen name='SignUp' component={SignUp} />
        </AuthStack.Navigator>
    )
}
export default AuthRoutes