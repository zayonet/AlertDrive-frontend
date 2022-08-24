import React from "react";

import * as home from "./styles"
import * as logo from "../../styles/logo"
import { View, Text, Dimensions } from 'react-native';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import Theme from "../../styles/index"
interface Props {
    navigation: any;
    route: any;
}
export function Home({ navigation, route }: Props) {
    const { name, email } = route.params;
    const data = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
            {
                data: [20, 45, 28, 80, 99, 43]
            }
        ]
    };
    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    };
    return (
        <home.Container>
            <home.InnerContainer>
                <logo.LogoContainer>
                    <home.SubTitle>Reflexo do dia</home.SubTitle>
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
                        width={290}
                        height={220}
                        yAxisLabel="$"
                        yAxisSuffix="k"
                        yAxisInterval={1} // optional, defaults to 1
                        chartConfig={{
                            backgroundColor: Theme.light.colors.brandSecondary,
                            backgroundGradientFrom: Theme.light.colors.brandSecondary1,
                            backgroundGradientTo: Theme.light.colors.brandSecondary,
                            decimalPlaces: 2, // optional, defaults to 2dp
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 16
                            },
                            propsForDots: {
                                r: "6",
                                strokeWidth: "2",
                                stroke: Theme.light.colors.brandSecondary
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

                    <home.PageTitle>You are at home page ! Buddy</home.PageTitle>
                    <home.SubTitle>{name || 'Rui Mendes'}</home.SubTitle>
                    <home.SubTitle>{email || 'ruimendes@gmail.com'}</home.SubTitle>

                </logo.LogoContainer>
                <home.StyledButton onPress={() => navigation.navigate('signin')}>
                    <home.ButtonText>
                        Signup
                    </home.ButtonText>
                </home.StyledButton>
            </home.InnerContainer>
        </home.Container>
    )
}