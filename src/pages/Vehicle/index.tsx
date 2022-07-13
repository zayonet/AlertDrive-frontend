import * as React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert, TextInput, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import * as VehiclesT from "./styles"
import { useAuth } from '../../contexts/auth';

//icons
import { Octicons } from '@expo/vector-icons';
//Themes
import theme from "../../styles/index";
const { brandPrimary, secondary, primary, tertiary, brandSecondary } = theme.light.colors;

//api server 
import api from '../../service/api';
import { Avatar, Badge, Icon, withBadge, Card, ListItem, Divider } from 'react-native-elements'


interface Vehicle {
    brand: string;
    model: string;
    registration_number: string;
    registration_country: string;
    engine_cc: string;
    year: string;
    fuel: string;
    horse_power: string;
    users: string;
    user_id: string;
}
interface IVehicle {
    id: string;
    brand: string;
    model: string;
    registration_number: string;
    registration_country: string;
    engine_cc: string;
    year: string;
    fuel: string;
    horse_power: string;
    users: [];
    user_id: string;
    created_at: string;
}
const Vehicle: React.FC = ({ navigation }: any) => {
    const [vehicle, setVehicle] = React.useState<IVehicle[]>([]);

    const { user, token } = useAuth();
    const Authorization = `${token}`;

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View>
                    <VehiclesT.RightIcon onPress={() => navigation.navigate('CreateVehicle')}>
                        <Octicons name='diff-added' size={30} color={brandPrimary} />
                    </VehiclesT.RightIcon>
                </View>
            ),
        });
    }, [navigation]);
    async function getVehicleAsync() {
        const response = await api.get(`/vehicle`, { headers: { Authorization } })

        const vehicleUser = (response.data as IVehicle[]).map((item: {
            id: string;
            brand: string;
            model: string;
            registration_number: string;
            registration_country: string;
            engine_cc: string;
            year: string;
            fuel: string;
            horse_power: string;
            users: [];
            user_id: string;
            created_at: string;
        }) => {
            return {
                id: item.id,
                user_id: item.user_id,
                brand: item.brand,
                model: item.model,
                registration_number: item.registration_number,
                registration_country: item.registration_country,
                engine_cc: item.engine_cc,
                year: item.year,
                fuel: item.fuel,
                horse_power: item.horse_power,
                users: item.users,
                created_at: item.created_at
            }
        })
        setVehicle(vehicleUser)
    }
    React.useEffect(() => {
        getVehicleAsync()
        const updateNavigation = navigation.addListener('focus', () => {
            getVehicleAsync();

        });
        return updateNavigation;
    }, [])
    return (
        <SafeAreaView style={{ marginTop: 25 }}>
            <ScrollView>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <VehiclesT.PageTitle>My Activities</VehiclesT.PageTitle>
                    {!vehicle.length && <>
                        <Text>No information was filled</Text>
                        <VehiclesT.StyledBotton onPress={() => navigation.navigate('CreateVehicle')}>
                            <VehiclesT.BottonText>
                                Click to fill information
                            </VehiclesT.BottonText>
                        </VehiclesT.StyledBotton>
                    </>}
                    {vehicle &&
                        vehicle.map((item, index) => (
                            item.users.map((user, i) => (
                                <Card key={index}>
                                    <Text>Which food did you eat now?</Text>
                                    <Text style={styles.badgeStyleText}>{item?.brand.toUpperCase()}</Text>
                                    <Divider style={{ backgroundColor: brandPrimary }} />
                                    <Text>Did you drink anything?</Text>
                                    <Text style={styles.badgeStyleText}>{item?.model.toUpperCase()}</Text>
                                    <Divider style={{ backgroundColor: brandPrimary }} />
                                    <Text style={styles.badgeStyleText} key={i}>{user?.name}</Text>
                                    <Divider style={{ backgroundColor: brandPrimary }} />

                                    <View style={styles.row}>
                                        <VehiclesT.badgeStyleButton
                                            onPress={() => navigation.navigate('ShowVehicle',
                                                {
                                                    itemId: item?.id,
                                                    itemregistration_number: item?.registration_number.toUpperCase(),
                                                    itemBrand: item?.brand.toUpperCase(),
                                                    itemModel: item?.model.toUpperCase(),

                                                })}
                                        ><Text style={{ color: primary }}>Show</Text></VehiclesT.badgeStyleButton>
                                        <VehiclesT.badgeStyleButton onPress={() => navigation.navigate('UpdateVehicle',
                                            {
                                                itemId: item?.id

                                            })}>
                                            <Text style={{ color: primary }}>Edit</Text>
                                        </VehiclesT.badgeStyleButton>
                                    </View>
                                </Card>
                            ))
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
        borderBottomColor: brandSecondary,
        color: brandSecondary,
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
export default Vehicle 