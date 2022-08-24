import * as React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert, TextInput, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import * as Ativity from "./styles"
import { useAuth } from '../../contexts/auth';

//icons
import { Octicons } from '@expo/vector-icons';
//Themes
import theme from "../../styles/index";
const { brandPrimary, secondary, primary, tertiary, brandSecondary } = theme.light.colors;

//api server 
import api from '../../service/api';
import { Avatar, Badge, Icon, withBadge, Card, ListItem, Divider } from 'react-native-elements'


interface activity {
    whitch_food_ate: string;
    whitch_food_drank: string;
    smoked: string;
    description: string;
    user_id: string;
}
interface IActivity {
    id: string;
    whitch_food_ate: string;
    whitch_food_drank: string;
    smoked: string;
    description: string;
    user_id: string;
    created_at: string;
}
const Activity: React.FC = ({ navigation }: any) => {
    const [activity, setActivity] = React.useState<IActivity[]>([]);

    const { user, token } = useAuth();
    const Authorization = `${token}`;

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View>
                    <Ativity.RightIcon onPress={() => navigation.navigate('CreateActivity')}>
                        <Octicons name='diff-added' size={30} color={brandPrimary} />
                    </Ativity.RightIcon>
                </View>
            ),
        });
    }, [navigation]);
    async function getActivityAsync() {
        const response = await api.get(`/activity/user/${user?.id}`, { headers: { Authorization } })

        const activityUser = (response.data as IActivity[]).map((item: {
            id: string;
            whitch_food_ate: string;
            whitch_food_drank: string;
            smoked: string;
            description: string;
            user_id: string;
            created_at: string;
        }) => {
            return {
                id: item.id,
                user_id: item.user_id,
                whitch_food_ate: item.whitch_food_ate,
                whitch_food_drank: item.whitch_food_drank,
                smoked: item.smoked,
                description: item.description,
                created_at: item.created_at
            }
        })
        setActivity(activityUser)
    }
    React.useEffect(() => {
        getActivityAsync()
        const updateNavigation = navigation.addListener('focus', () => {
            getActivityAsync();

        });
        return updateNavigation;
    }, [])
    return (
        <SafeAreaView style={{ marginTop: 25 }}>
            <ScrollView>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Ativity.PageTitle>My Activities</Ativity.PageTitle>
                    {!activity.length && <>
                        <Text>No information was filled</Text>
                        <Ativity.StyledBotton onPress={() => navigation.navigate('CreateActivity')}>
                            <Ativity.BottonText>
                                Click to fill information
                            </Ativity.BottonText>
                        </Ativity.StyledBotton>
                    </>}
                    {activity &&
                        activity.map(item => (
                            <Card key={item.id}>
                                <Text>Which food did you eat now?</Text>
                                <Text style={styles.badgeStyleText}>{item?.whitch_food_ate.toUpperCase()}</Text>
                                <Divider style={{ backgroundColor: brandPrimary }} />
                                <Text>Did you drink anything?</Text>
                                <Text style={styles.badgeStyleText}>{item?.whitch_food_drank.toUpperCase()}</Text>
                                <Divider style={{ backgroundColor: brandPrimary }} />

                                <View style={styles.row}>
                                    <Ativity.badgeStyleButton
                                        onPress={() => navigation.navigate('ShowActivity',
                                            {
                                                itemId: item?.id,
                                                itemfood: item?.whitch_food_ate.toUpperCase(),
                                                itemDrink: item?.whitch_food_drank.toUpperCase(),
                                                itemSmoked: item?.smoked.toUpperCase(),
                                                itemDescription: item?.description.toUpperCase(),

                                            })}
                                    ><Text style={{ color: brandPrimary }}>Show</Text></Ativity.badgeStyleButton>
                                    <Ativity.badgeStyleButton onPress={() => navigation.navigate('UpdateAtivity',
                                        {
                                            itemId: item?.id,
                                            userId: item?.user_id,
                                            itemfood: item?.whitch_food_ate.toUpperCase(),
                                            itemDrink: item?.whitch_food_drank.toUpperCase(),
                                            itemSmoked: item?.smoked.toUpperCase(),
                                            itemDescription: item?.description.toUpperCase(),

                                        })}>
                                        <Text style={{ color: brandPrimary }}>Edit</Text>
                                    </Ativity.badgeStyleButton>
                                </View>
                                {/* <Ativity.StyledBotton onPress={() => navigation.navigate('UpdateAtivity')}>
                            <Ativity.BottonText>
                                Update all information
                            </Ativity.BottonText>
                        </Ativity.StyledBotton> */}
                            </Card>
                        ))
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    pickerSelectStyle: {
        backgroundColor: secondary,
        Padding: 10,
        paddingLeft: 50,
        paddingRight: 5,
        borderRadius: 5,
        fontSize: 16,
        height: 49,
        marginVertical: 30,
        marginBottom: 1,
        color: primary
    },
    pickerLabelStyle: {
        color: brandPrimary,
        fontSize: 13,
        textAlign: 'left',
        marginBottom: -25
    },
    badgeStyleText: {
        fontSize: 13,
        Padding: 20,
        color: brandPrimary,
        marginBottom: 10
    },
    badgeStyleButton: {
        fontSize: 16,
        Padding: 30,
        borderRadius: 10,
        borderBottomColor: brandPrimary,
        color: brandPrimary,
        marginBottom: 10
    },
    /* content: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }, */
    row: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: 'space-between',
        marginBottom: 20

    },
    columnSize: {
        width: 170,
    },
    marginRight: {
        marginRight: 10
    },
})
export default Activity 