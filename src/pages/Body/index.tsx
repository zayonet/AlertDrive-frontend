import * as React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert, TextInput, StyleSheet } from "react-native";
import * as Body from "./styles"
import { useAuth } from '../../contexts/auth';
//icons
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';
//Themes
import theme from "../../styles/index";
const { brandPrimary, secondary, primary, tertiary } = theme.light.colors;

//api server 
import api from '../../service/api';
import { Avatar, Badge, Icon, withBadge, Card, ListItem, Divider } from 'react-native-elements'
import { color } from 'react-native-elements/dist/helpers';
const glicemia_types = [
    { name: "Hipoclicémia", id: 1 },
    { name: "Normal", id: 2 },
    { name: "Pré-Diabetes", id: 3 },
    { name: "Diabetes", id: 4 },
];

const blood_types = [
    { name: "AB+", id: 1 },
    { name: "AB-", id: 2 },
    { name: "A+", id: 3 },
    { name: "A-", id: 4 },
    { name: "B+", id: 5 },
    { name: "B-", id: 6 },
    { name: "O+", id: 7 },
    { name: "O-", id: 8 }
];

interface body {
    weigh: string;
    heights: string;
    blood_type: string;
    body_pressure_max: string;
    body_pressure_min: string;
    glicemia: string;
}
interface IBody {
    id: string;
    weigh: string;
    heights: string;
    blood_type: string;
    body_pressure_max: string;
    body_pressure_min: string;
    glicemia: string;
    user_id: string;
    created_at: string;
}
const BodyUser: React.FC = ({ navigation }: any) => {
    const [userBody, setUserBody] = React.useState<IBody[]>([]);

    const { user, token } = useAuth();
    const Authorization = `${token}`;

    async function getUserBodyAsync() {
        const response = await api.get(`/body_user/user/${user?.id}`, { headers: { Authorization } })
        //console.log(response.data)
        const bodyUser = (response.data as IBody[]).map((item: {
            id: string;
            weigh: string;
            heights: string;
            blood_type: string;
            body_pressure_max: string;
            body_pressure_min: string;
            glicemia: string;
            user_id: string;
            created_at: string;
        }) => {
            return {
                id: item.id,
                user_id: item.user_id,
                weigh: item.weigh,
                heights: item.heights,
                blood_type: item.blood_type,
                body_pressure_max: item.body_pressure_max,
                body_pressure_min: item.body_pressure_min,
                glicemia: item.glicemia,
                created_at: item.created_at
            }
        })
        console.log(bodyUser)
        /* if (typeof myVar !== 'undefined') {
            // myVar is defined
        } */
        setUserBody(bodyUser)
    }
    React.useEffect(() => {
        getUserBodyAsync()
        const updateNavigation = navigation.addListener('focus', () => {
            getUserBodyAsync();

        });
        return updateNavigation;
    }, [])
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>My Body</Text>

            {!userBody.length && <>
                <Text>No information was filled</Text>
                <Body.StyledBotton onPress={() => navigation.navigate('CreateUserBody')}>
                    <Body.BottonText>
                        Click to fill information
                    </Body.BottonText>
                </Body.StyledBotton>
            </>}
            {userBody &&
                userBody.map((item) => (
                    <Card key={item.id}>
                        <View style={styles.row}>
                            <Text>Peso:</Text>
                            <Badge value={<Text style={styles.badgeStyleText}>{item?.weigh}</Text>} />
                        </View>

                        <View style={styles.row}>
                            <Text>Altura:</Text>
                            <Badge value={<Text style={styles.badgeStyleText}>{item?.heights}</Text>} />
                        </View>

                        <View style={styles.row}>
                            <Text>Blood Type:</Text>
                            <Badge value={<Text style={styles.badgeStyleText}>{item?.blood_type}</Text>} />
                        </View>
                        <View style={styles.row}>
                            <Text>Miximum Pressure:</Text>
                            <Badge value={<Text style={styles.badgeStyleText}>{item?.body_pressure_max}</Text>} />
                        </View>
                        <View style={styles.row}>
                            <Text>Minimum Pressure:</Text>
                            <Badge value={<Text style={styles.badgeStyleText}>{item?.body_pressure_min}</Text>} />
                        </View>
                        <View style={styles.row}>
                            <Text>Glicemia:</Text>
                            <Badge value={<Text style={styles.badgeStyleText}>{item?.glicemia}</Text>} />
                        </View>
                        <Divider style={{ backgroundColor: brandPrimary }} />
                        <Body.StyledBotton onPress={() => navigation.navigate('UpdateUserBody')}>
                            <Body.BottonText>
                                Update all information
                            </Body.BottonText>
                        </Body.StyledBotton>
                    </Card>

                ))
            }

            <Badge status="error" />
            <Badge status="primary" />
            <Badge status="warning" />
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
        fontSize: 13,
        Padding: 10,
        paddingLeft: 10,
        paddingRight: 15,
        color: tertiary
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
        marginBottom: 10

    },
    columnSize: {
        width: 170,
    },
    marginRight: {
        marginRight: 10
    },
})
export default BodyUser 