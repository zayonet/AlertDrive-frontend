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


interface ISensor {
    id: string;
    accelerometerX: string;
    accelerometerY: string;
    accelerometerZ: string;
    gyroscopeX: string;
    gyroscopeY: string;
    gyroscopeZ: string;
    user_id: string;
}
const Sensor: React.FC = ({ navigation }: any) => {
    const [sensor, setSensor] = React.useState<ISensor[]>([]);

    const { user, token } = useAuth();
    const Authorization = `${token}`;

    async function getSennsorAsync() {
        const response = await api.get(`/sensor/user/${user?.id}`, { headers: { Authorization } })
        //console.log(response.data)
        const sensor = (response.data as ISensor[]).map((item: {
            id: string;
            accelerometerX: string;
            accelerometerY: string;
            accelerometerZ: string;
            gyroscopeX: string;
            gyroscopeY: string;
            gyroscopeZ: string;
            user_id: string;
        }) => {
            return {
                id: item.id,
                user_id: item.user_id,
                accelerometerX: item.accelerometerX,
                accelerometerY: item.accelerometerY,
                accelerometerZ: item.accelerometerZ,
                gyroscopeX: item.gyroscopeX,
                gyroscopeY: item.gyroscopeY,
                gyroscopeZ: item.gyroscopeZ,
            }
        })
        console.log(sensor)
        setSensor(sensor)
    }
    React.useEffect(() => {
        getSennsorAsync()
        const updateNavigation = navigation.addListener('focus', () => {
            getSennsorAsync();

        });
        return updateNavigation;
    }, [])
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Sensores</Text>
            {sensor &&
                sensor.map((item) => (
                    <Card key={item.id}>
                        <View style={styles.row}>
                            <Text>accelerometerX:</Text>
                            <Badge value={<Text style={styles.badgeStyleText}>{item?.accelerometerX}</Text>} />
                        </View>

                        <View style={styles.row}>
                            <Text>accelerometerY:</Text>
                            <Badge value={<Text style={styles.badgeStyleText}>{item?.accelerometerY}</Text>} />
                        </View>

                        <View style={styles.row}>
                            <Text>accelerometerZ:</Text>
                            <Badge value={<Text style={styles.badgeStyleText}>{item?.accelerometerZ}</Text>} />
                        </View>
                        <View style={styles.row}>
                            <Text>gyroscopeX:</Text>
                            <Badge value={<Text style={styles.badgeStyleText}>{item?.gyroscopeX}</Text>} />
                        </View>
                        <View style={styles.row}>
                            <Text>gyroscopeY:</Text>
                            <Badge value={<Text style={styles.badgeStyleText}>{item?.gyroscopeY}</Text>} />
                        </View>
                        <View style={styles.row}>
                            <Text>gyroscopeZ:</Text>
                            <Badge value={<Text style={styles.badgeStyleText}>{item?.gyroscopeZ}</Text>} />
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
export default Sensor 