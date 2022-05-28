import * as React from 'react';
import { useContext } from 'react';
import { Text, StyleSheet, Button, View } from 'react-native'
import { useAuth } from '../../contexts/auth';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";

//icons
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';

import * as dashboard from "./styles"
import * as logo from "../../styles/logo"

//Themes
import theme from "../../styles/index";
const { brandSecondary, brandSecondary1, brandPrimary, tertiary } = theme.light.colors;

const Dashboard: React.FC = ({ navigation }: any) => {
    const { signOut, user } = useAuth()

    function handleSignOut() {
        signOut();
    }
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View>
                    <dashboard.RightIcon onPress={() => navigation.navigate('Settings')}>
                        <Ionicons name='settings' size={30} color={brandPrimary} />
                    </dashboard.RightIcon>
                </View>
            ),
        });
    }, [navigation]);
    return (
        <dashboard.Container>
            <dashboard.InnerContainer>
                <logo.LogoContainer>
                    <dashboard.SubTitle>Reflexo do dia</dashboard.SubTitle>
                    <LineChart
                        data={{
                            labels: ["January", "February", "March", "April", "May", "June"],
                            datasets: [
                                {
                                    data: [
                                        Math.random() * 100,
                                        Math.random() * 100,
                                        Math.random() * 100,
                                        Math.random() * 100,
                                        Math.random() * 100,
                                        Math.random() * 100
                                    ]
                                }
                            ]
                        }}
                        //width={Dimensions.get("window").width} // from react-native
                        width={350}
                        height={220}
                        yAxisLabel="$"
                        yAxisSuffix="k"
                        yAxisInterval={1} // optional, defaults to 1
                        chartConfig={{
                            backgroundColor: brandSecondary,
                            backgroundGradientFrom: brandSecondary1,
                            backgroundGradientTo: brandSecondary,
                            decimalPlaces: 2, // optional, defaults to 2dp
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 16
                            },
                            propsForDots: {
                                r: "6",
                                strokeWidth: "2",
                                stroke: brandSecondary
                            }
                        }}
                        bezier
                        style={{
                            marginVertical: 8,
                            borderRadius: 16
                        }}
                    />
                    <logo.PageLogo resizeMode='contain' source={require('../../../assets/images/logo.png')} />
                    <logo.PageName resizeMode='contain' source={require('../../../assets/images/logoName.png')} />
                    <logo.PageSlogan resizeMode='contain' source={require('../../../assets/images/logoSlogan.png')} />
                    <dashboard.PageTitle>You are at home page ! Buddy</dashboard.PageTitle>
                    <dashboard.SubTitle>{user?.name}</dashboard.SubTitle>
                    <dashboard.SubTitle>{user?.email}</dashboard.SubTitle>
                    {/* <View style={styles.container}>
                        <Text>My Dashboard</Text>
                        <Text>{user?.name}</Text>
                        <Button title="Sign out" onPress={handleSignOut} />
                    </View> */}
                </logo.LogoContainer>
                {/* <dashboard.StyledButton>
                    <dashboard.ButtonText>
                        Sign Out
                    </dashboard.ButtonText>
                </dashboard.StyledButton> */}
            </dashboard.InnerContainer>
        </dashboard.Container>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})
export default Dashboard;
