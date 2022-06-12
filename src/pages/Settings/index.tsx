import * as React from 'react';
import { View, Text } from "react-native";
import * as settings from "./styles"
import { useAuth } from '../../contexts/auth';
//icons
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';
//Themes
import theme from "../../styles/index";
const { brandSecondary, brandSecondary2, brandPrimary, tertiary } = theme.light.colors;

const SettingsScreen: React.FC = ({ navigation }: any) => {

    const { signOut, user } = useAuth()

    function handleSignOut() {
        signOut();
    }
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View>
                    <settings.RightIcon onPress={() => handleSignOut()}>
                        <Ionicons name='power' size={30} color={brandPrimary} />
                    </settings.RightIcon>
                </View>
            ),
        });
    }, [navigation]);
    return (
        <settings.Container>
            <settings.InnerContainer>
                <settings.PageTitle>About me</settings.PageTitle>
                <settings.CardContainer>
                    <settings.Card onPress={() => navigation.navigate('Profile')}>
                        <Ionicons name='person' size={30} color={brandSecondary} />
                        <Text>Profile</Text>
                    </settings.Card >
                    <settings.Card onPress={() => navigation.navigate('Body')}>
                        <Ionicons name='body' size={30} color={brandSecondary} />
                        <Text>My Body</Text>
                    </settings.Card>
                    <settings.Card onPress={() => navigation.navigate('UserBody')}>
                        <Ionicons name='square' size={30} color={brandSecondary} />
                        <Text>My Job</Text>
                    </settings.Card>
                    <settings.Card onPress={() => navigation.navigate('UserBody')}>
                        <Ionicons name='medkit' size={30} color={brandSecondary} />
                        <Text>Desease</Text>
                    </settings.Card>
                    <settings.Card onPress={() => navigation.navigate('UserBody')}>
                        <Ionicons name='timer' size={30} color={brandSecondary} />
                        <Text>History</Text>
                    </settings.Card>
                    <settings.Card onPress={() => navigation.navigate('UserBody')}>
                        <Ionicons name='apps' size={30} color={brandSecondary} />
                        <Text>Activity</Text>
                    </settings.Card>
                </settings.CardContainer>

                <settings.PageTitle>My Vehicle</settings.PageTitle>
                <settings.CardContainer>
                    <settings.Card onPress={() => navigation.navigate('Profile')}>
                        <Ionicons name='car' size={30} color={brandPrimary} />
                        <Text>My Car</Text>
                    </settings.Card >
                    <settings.Card onPress={() => navigation.navigate('UserBody')}>
                        <Ionicons name='aperture' size={30} color={brandPrimary} />
                        <Text>Model</Text>
                    </settings.Card>
                    <settings.Card onPress={() => navigation.navigate('UserBody')}>
                        <Ionicons name='help-buoy' size={30} color={brandPrimary} />
                        <Text>Brand</Text>
                    </settings.Card>
                    <settings.Card onPress={() => navigation.navigate('UserBody')}>
                        <Ionicons name='today' size={30} color={brandPrimary} />
                        <Text>Fuel</Text>
                    </settings.Card>
                </settings.CardContainer>

                <settings.PageTitle>Weather</settings.PageTitle>
                <settings.CardContainer>
                    <settings.Card onPress={() => navigation.navigate('UserBody')}>
                        <Ionicons name='sunny' size={30} color={brandSecondary2} />
                        <Text>Weather</Text>
                    </settings.Card>
                    <settings.Card onPress={() => navigation.navigate('UserBody')}>
                        <Ionicons name='git-compare' size={30} color={brandSecondary2} />
                        <Text>Sensors</Text>
                    </settings.Card>
                </settings.CardContainer>
            </settings.InnerContainer>
        </settings.Container>
    );
}
export default SettingsScreen;