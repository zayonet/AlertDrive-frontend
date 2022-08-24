import React from 'react';
//React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from '../pages/Dashboard';
import Settings from '../pages/Settings';
import Profile from '../pages/Profile';
import Body from '../pages/Body';
import Job from '../pages/Job';
<<<<<<< HEAD
import History from '../pages/History';
import Desease from '../pages/Desease';
import Activity from '../pages/Activity';
import Vehicle from '../pages/Vehicle';
import Automobile from '../pages/Automobile';

import Theme from '../styles/index'
import { Button, Image } from 'react-native';
import CreateBodyUser from '../pages/Body/create';
import UpdateUserBody from '../pages/Body/update';
import CreateUserHistory from '../pages/History/create';
import UpdateUserHistory from '../pages/History/update';
import CreateDesease from '../pages/Desease/create';
import UpdateDesease from '../pages/Desease/update';
import CreateJobUser from '../pages/Job/create';
import UpdateUserJob from '../pages/Job/update';
import CreateActivity from '../pages/Activity/create';
import UpdateAtivity from '../pages/Activity/update';
import ShowActivity from '../pages/Activity/show';
import CreateVehicle from '../pages/Vehicle/create';
import CreateAutomobile from '../pages/Automobile/create';
import DeleteAutomobile from '../pages/Automobile/delete';
import UpdateAutomobile from '../pages/Automobile/update';
import CreateSensor from '../pages/Sensors/create';
//import UpdateUserJob from '../pages/Job/update';
=======

import Theme from '../styles/index'
import { Button, Image } from 'react-native';
>>>>>>> a8e08eb49879e6efcbe0796cf0e2bf99a825a423

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
<<<<<<< HEAD
            <AppStack.Screen options={{ headerTintColor: primary }} name='CreateUserBody' component={CreateBodyUser} />
            <AppStack.Screen options={{ headerTintColor: primary }} name='UpdateUserBody' component={UpdateUserBody} />
            <AppStack.Screen options={{ headerTintColor: primary }} name='Job' component={Job} />
            <AppStack.Screen options={{ headerTintColor: primary }} name='CreateUserJob' component={CreateJobUser} />
            <AppStack.Screen options={{ headerTintColor: primary }} name='UpdateUserJob' component={UpdateUserJob} />
            <AppStack.Screen options={{ headerTintColor: primary }} name='History' component={History} />
            <AppStack.Screen options={{ headerTintColor: primary }} name='CreateUserHistory' component={CreateUserHistory} />
            <AppStack.Screen options={{ headerTintColor: primary }} name='UpdateUserHistory' component={UpdateUserHistory} />
            <AppStack.Screen options={{ headerTintColor: primary }} name='Desease' component={Desease} />
            <AppStack.Screen options={{ headerTintColor: primary }} name='CreateDesease' component={CreateDesease} />
            <AppStack.Screen options={{ headerTintColor: primary }} name='UpdateDesease' component={UpdateDesease} />
            <AppStack.Screen options={{ headerTintColor: primary }} name='Activity' component={Activity} />
            <AppStack.Screen options={{ headerTintColor: primary }} name='CreateActivity' component={CreateActivity} />
            <AppStack.Screen options={{ headerTintColor: primary }} name='ShowActivity' component={ShowActivity} />
            <AppStack.Screen options={{ headerTintColor: primary }} name='UpdateAtivity' component={UpdateAtivity} />
            <AppStack.Screen options={{ headerTintColor: primary }} name='Vehicle' component={Vehicle} />
            <AppStack.Screen options={{ headerTintColor: primary }} name='CreateVehicle' component={CreateVehicle} />
            <AppStack.Screen options={{ headerTintColor: primary }} name='Automobile' component={Automobile} />
            <AppStack.Screen options={{ headerTintColor: primary }} name='CreateAutomobile' component={CreateAutomobile} />
            <AppStack.Screen options={{ headerTintColor: primary }} name='DeleteAutomobile' component={DeleteAutomobile} />
            <AppStack.Screen options={{ headerTintColor: primary }} name='UpdateAutomobile' component={UpdateAutomobile} />
            <AppStack.Screen options={{ headerTintColor: primary }} name='CreateSensor' component={CreateSensor} />

=======
            <AppStack.Screen options={{ headerTintColor: primary }} name='Job' component={Job} />
>>>>>>> a8e08eb49879e6efcbe0796cf0e2bf99a825a423
        </AppStack.Navigator>
    )
}
export default AppRoutes