import * as React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert, TextInput, StyleSheet } from "react-native";
import * as History from "./styles"
import { useAuth } from '../../contexts/auth';
//icons
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';
//Themes
import theme from "../../styles/index";
const { brandPrimary, secondary, primary, tertiary, brandSecondary } = theme.light.colors;

//api server 
import api from '../../service/api';
import { Avatar, Badge, Icon, withBadge, Card, ListItem, Divider } from 'react-native-elements'

interface IHistory {
    id: string;
    accident_before: string;
    is_taking_medicine_now: string;
    is_sick_now: string;
    description: string;
    user_id: string;
    created_at: string;
}
const HistoryUser: React.FC = ({ navigation }: any) => {
    const [userHistory, setUserHistory] = React.useState<IHistory[]>([]);

    const { user, token } = useAuth();
    const Authorization = `${token}`;

    async function getUserHistoryAsync() {
        const response = await api.get(`/HistoryUser/user/${user?.id}`, { headers: { Authorization } })
        //console.log(response.data)
        const historyUser = (response.data as IHistory[]).map((item: {

            id: string;
            accident_before: string;
            is_taking_medicine_now: string;
            is_sick_now: string;
            description: string;
            user_id: string;
            created_at: string;
        }) => {
            return {
                id: item.id,
                user_id: item.user_id,
                accident_before: item.accident_before,
                is_taking_medicine_now: item.is_taking_medicine_now,
                is_sick_now: item.is_sick_now,
                description: item.description,
                created_at: item.created_at
            }
        })
        console.log(historyUser)

        setUserHistory(historyUser)
    }
    React.useEffect(() => {
        getUserHistoryAsync()
        const updateNavigation = navigation.addListener('focus', () => {
            getUserHistoryAsync();

        });
        return updateNavigation;
    }, [])
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>My History</Text>

            {!userHistory.length && <>
                <Text>No information was filled</Text>
                <History.StyledBotton onPress={() => navigation.navigate('CreateUserHistory')}>
                    <History.BottonText>
                        Click to fill information
                    </History.BottonText>
                </History.StyledBotton>
            </>}

            {userHistory &&
                userHistory.map(item => (
                    <Card key={item.id}>

                        <View style={styles.row}>
                            <Text>Did you accidented before?</Text>
                            <Text style={styles.badgeStyleText}>{item?.accident_before.toUpperCase()}</Text>
                        </View>

                        <View style={styles.row}>
                            <Text>Are you taking medicine now?</Text>
                            <Text style={styles.badgeStyleText}>{item?.is_taking_medicine_now.toUpperCase()}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text>Are you filling bad now?</Text>
                            <Text style={styles.badgeStyleText}>{item?.is_sick_now.toUpperCase()}</Text>
                        </View>
                        <Divider style={{ backgroundColor: brandPrimary }} />
                        <View>
                            <Text>Description:</Text>
                            <Text style={styles.badgeStyleText}>{item?.description}</Text>
                        </View>
                        <Divider style={{ backgroundColor: brandPrimary }} />
                        <History.StyledBotton onPress={() => navigation.navigate('UpdateUserHistory')}>
                            <History.BottonText>
                                Update all information
                            </History.BottonText>
                        </History.StyledBotton>
                    </Card>
                ))
            }
        </View>
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
        fontSize: 14,
        Padding: 10,
        paddingLeft: 5,
        paddingRight: 5,
        color: brandSecondary
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
export default HistoryUser 