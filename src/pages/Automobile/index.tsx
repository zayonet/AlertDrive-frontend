import * as React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert, TextInput, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import * as AutomobilesT from "./styles"
import { useAuth } from '../../contexts/auth';

//icons
import { Octicons, FontAwesome } from '@expo/vector-icons';
//Themes
import theme from "../../styles/index";
const { brandPrimary, secondary, primary, tertiary, brandSecondary } = theme.light.colors;

//api server 
import api from '../../service/api';
import { Avatar, Badge, Icon, withBadge, Card, ListItem, Divider } from 'react-native-elements'


interface Automobile {
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
interface IAutomobile {
    id: string;
    brand: string;
    model: string;
    registration_number: string;
    registration_country: string;
    engine_capacity: string;
    year: string;
    fuel: string;
    horse_power: string;
    users: [];
    user_id: string;
    description: string;
    created_at: string;
}
const Automobile: React.FC = ({ navigation }: any) => {
    const [automobile, setAutomobile] = React.useState<IAutomobile[]>([]);

    const { user, token } = useAuth();
    const Authorization = `${token}`;

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View>
                    <AutomobilesT.RightIcon onPress={() => navigation.navigate('CreateAutomobile')}>
                        <Octicons name='diff-added' size={30} color={brandPrimary} />
                    </AutomobilesT.RightIcon>
                </View>
            ),
        });
    }, [navigation]);
    async function getAutomobileAsync() {
        const response = await api.get(`/automobile/user/${user?.id}`, { headers: { Authorization } })

        const automobileUser = (response.data as IAutomobile[]).map((item: {
            id: string;
            brand: string;
            model: string;
            registration_number: string;
            registration_country: string;
            engine_capacity: string;
            year: string;
            fuel: string;
            horse_power: string;
            users: [];
            user_id: string;
            description: string;
            created_at: string;
        }) => {
            return {
                id: item.id,
                user_id: item.user_id,
                brand: item.brand,
                model: item.model,
                registration_number: item.registration_number,
                registration_country: item.registration_country,
                engine_capacity: item.engine_capacity,
                year: item.year,
                fuel: item.fuel,
                horse_power: item.horse_power,
                users: item.users,
                description: item.description,
                created_at: item.created_at
            }
        })
        setAutomobile(automobileUser)
    }
    React.useEffect(() => {
        getAutomobileAsync()
        const updateNavigation = navigation.addListener('focus', () => {
            getAutomobileAsync();

        });
        return updateNavigation;
    }, [])
    return (
        <SafeAreaView style={{ marginTop: 25 }}>
            <ScrollView>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <AutomobilesT.PageTitle>My Cars</AutomobilesT.PageTitle>
                    {!automobile.length && <>
                        <Text>No information was filled</Text>
                        <AutomobilesT.StyledBotton onPress={() => navigation.navigate('CreateAutomobile')}>
                            <AutomobilesT.BottonText>
                                Click to fill information
                            </AutomobilesT.BottonText>
                        </AutomobilesT.StyledBotton>
                    </>}
                    {automobile &&
                        automobile.map((item, index) => (
                            <Card key={index}>
                                <View style={styles.row}>
                                    <View style={styles.columnSize2}>
                                        <FontAwesome name="car" size={64} color={brandSecondary} />
                                    </View>
                                    <View style={styles.columnSize}>

                                        <Text>{item?.brand.toUpperCase()} - from {item?.year.toUpperCase()}</Text>
                                        <Text style={styles.badgeStyleText}>{item?.year.toUpperCase()}</Text>
                                    </View>
                                </View>
                                <Divider style={{ backgroundColor: brandPrimary }} />
                                <Text>Car horse and engine Capacity</Text>
                                <Text style={styles.badgeStyleText}>{item?.horse_power.toUpperCase()} / {item?.engine_capacity.toUpperCase()}</Text>
                                <Divider style={{ backgroundColor: brandPrimary }} />
                                <Text>Fuel</Text>
                                <Text style={styles.badgeStyleText}>{item?.fuel.toUpperCase()}</Text>
                                <Divider style={{ backgroundColor: brandPrimary }} />

                                <View style={styles.row}>
                                    <AutomobilesT.badgeStyleButton
                                        onPress={() => navigation.navigate('DeleteAutomobile',
                                            {
                                                itemId: item?.id, carBrand: item?.brand, carModel: item?.model,
                                            })}
                                    ><Text style={{ color: primary }}>Delete</Text></AutomobilesT.badgeStyleButton>
                                    <AutomobilesT.badgeStyleButton onPress={() => navigation.navigate('UpdateAutomobile',
                                        {
                                            itemId: item?.id,
                                            userId: item?.user_id,
                                            carBrand: item?.brand,
                                            carModel: item?.model,
                                            carRegNumber: item?.registration_number,
                                            carRegCountry: item?.registration_country,
                                            carEngineCap: item?.engine_capacity,
                                            carYear: item?.year,
                                            carFuel: item?.fuel,
                                            carHorsePower: item?.horse_power,
                                            carDescript: item?.description

                                        })}>
                                        <Text style={{ color: primary }}>Edit</Text>
                                    </AutomobilesT.badgeStyleButton>
                                </View>
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
        borderBottomColor: brandSecondary,
        color: brandSecondary,
        marginBottom: 10
    },
    row: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: 'space-between',
        marginBottom: 20,
        Padding: 0,

    },
    columnSize: {
        width: 240,
    },
    columnSize2: {
        width: 90,
    },
    marginRight: {
        marginRight: 10
    },
})
export default Automobile 