import * as React from 'react';
import { View, Text, StyleSheet } from "react-native";
import * as Deseases from "./styles"
import { useAuth } from '../../contexts/auth';
//Themes
import theme from "../../styles/index";
const { brandPrimary, secondary, primary, tertiary } = theme.light.colors;

//api server 
import api from '../../service/api';
import { Badge, Card, Divider } from 'react-native-elements'

interface body {
    desease_name: string;
    desease_type: string;
    description: string;
    user_id: string;
    body_user_id: string;
}
interface IDesease {
    id: string;
    desease_name: string;
    desease_type: string;
    description: string;
    user_id: string;
    body_user_id: string;
    created_at: string;
}
const Desease: React.FC = ({ navigation }: any) => {
    const [userDesease, setUserDesease] = React.useState<IDesease[]>([]);


    const { user, token } = useAuth();
    const Authorization = `${token}`;

    async function getUserDeseaseAsync() {
        const response = await api.get(`/desease/user/${user?.id}`, { headers: { Authorization } })
        //console.log(response.data)
        const deseaseUser = (response.data as IDesease[]).map((item: {
            id: string;
            desease_name: string;
            desease_type: string;
            description: string;
            user_id: string;
            body_user_id: string;
            created_at: string;
        }) => {
            return {
                id: item.id,
                desease_name: item.desease_name,
                desease_type: item.desease_type,
                description: item.description,
                user_id: item.user_id,
                body_user_id: item.body_user_id,
                created_at: item.created_at
            }
        })
        setUserDesease(deseaseUser)
    }
    React.useEffect(() => {
        getUserDeseaseAsync()
        const updateNavigation = navigation.addListener('focus', () => {
            getUserDeseaseAsync();

        });
        return updateNavigation;
    }, [])
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>My Desease</Text>

            {!userDesease.length && <>
                <Text>No information was filled</Text>
                <Deseases.StyledBotton onPress={() => navigation.navigate('CreateDesease')}>
                    <Deseases.BottonText>
                        Click to fill information
                    </Deseases.BottonText>
                </Deseases.StyledBotton>
            </>}
            {userDesease &&
                userDesease.map((item, key) => (
                    <Card key={key}>
                        <Text>Desease Name:</Text>
                        <Text style={styles.badgeStyleText}>{item?.desease_name}</Text>
                        <Divider style={{ backgroundColor: brandPrimary }} />

                        <Text>Desease Type:</Text>
                        <Text style={styles.badgeStyleText}>{item?.desease_type}</Text>

                        <Divider style={{ backgroundColor: brandPrimary }} />
                        <Text>Decription:</Text>
                        <Text style={styles.badgeStyleText}>{item?.description}</Text>
                        <Divider style={{ backgroundColor: brandPrimary }} />
                        <Deseases.StyledBotton onPress={() => navigation.navigate('UpdateDesease')}>
                            <Deseases.BottonText>
                                Update all information
                            </Deseases.BottonText>
                        </Deseases.StyledBotton>
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
        fontSize: 13,
        Padding: 20,
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
        marginBottom: 10

    },
    columnSize: {
        width: 170,
    },
    marginRight: {
        marginRight: 10
    },
})
export default Desease 