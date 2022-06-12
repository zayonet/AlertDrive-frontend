import React from 'react';
//React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from '../pages/Dashboard';
import Settings from '../pages/Settings';
import Profile from '../pages/Profile';
import Body from '../pages/Body';
import Job from '../pages/Job';

import Theme from '../styles/index'
import { Button, Image } from 'react-native';

const AppStack = createNativeStackNavigator();

const { primary, brandSecondary } = Theme.light.colors;

const Logo: React.FC = ({ props }: any) => {
    return (
        <Image
            style={{ width: 35, height: 35 }}
            source={require('../../assets/images/logo.png')}
        />
    );
}
const AppRoutes: React.FC = () => {
    return (
        <AppStack.Navigator
            screenOptions={
                {
                    headerStyle: {
                        backgroundColor: 'transparent',
                    },
                    headerTintColor: brandSecondary,
                    headerTransparent: true,
                    headerTitle: '',
                }
            }
            initialRouteName="Dashboard"
        >
            <AppStack.Screen name='Dashboard' component={Dashboard} options={({ navigation, route }) => ({
                headerTitle: (props) => <Logo {...props} />,
            })} />
            <AppStack.Screen options={{ headerTintColor: primary }} name='Settings' component={Settings} />
            <AppStack.Screen options={{ headerTintColor: primary }} name='Profile' component={Profile} />
            <AppStack.Screen options={{ headerTintColor: primary }} name='Body' component={Body} />
            <AppStack.Screen options={{ headerTintColor: primary }} name='Job' component={Job} />
        </AppStack.Navigator>
    )
}
export default AppRoutes