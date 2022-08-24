import * as React from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as AutomobilesT from "./styles"
//Themes
import theme from "../../styles/index";
const { brandPrimary, secondary, primary, tertiary, brandSecondary } = theme.light.colors;
//api server 
import api from '../../service/api';
import { Card, Divider } from 'react-native-elements'
import { showMessage } from "react-native-flash-message";
import { useAuth } from '../../contexts/auth';

const DeleteAutomobile: React.FC = ({ route, navigation }: any) => {
    /* 2. Get the param */
    const { itemId } = route.params;
    const { carBrand } = route.params;
    const { carModel } = route.params;
    const [message, setMessage] = React.useState();
    const [messageType, setMessageType] = React.useState();

    const { user, token } = useAuth();
    const Authorization = `${token}`;

    async function handleDelete(id: any) {
        //handleMessage(null);
        console.log(id);
        const response = await api.delete(`/automobile/${id}`, { headers: { Authorization } })
            .then((response) => {
                //const result = response.data;
                if (response) {
                    navigation.navigate('Automobile');
                }
                showMessage({
                    message: "Perfect!",
                    description: "Car deleted with success",
                    type: "success",
                });
                navigation.navigate('Automobile');
            })
            .catch(error => {
                console.log(error)
                handleMessage("An error ocurred. Check your network and try again! Try tp login again");
                showMessage({
                    message: "Oops!",
                    description: "Ocorreu algum erro durante o registo de dados",
                    type: "danger",
                });
            })
    }


    const handleMessage = (message: any, type: any = 'FAILED') => {
        setMessage(message);
        setMessageType(type);
    }
    return (


        <View style={{ flex: 1, justifyContent: 'center' }}>
            <Card>
                <Text>Car ID: {itemId}</Text>
                <Text>Are you sure? Do you want to delete this car "{carBrand} - {carModel}"?</Text>
                <Divider style={{ backgroundColor: brandPrimary, marginTop: 10, marginBottom: 25 }} />
                <AutomobilesT.MessageBox type={messageType}>{message}</AutomobilesT.MessageBox>
                <View style={styles.row}>
                    <AutomobilesT.badgeStyleButtonDel onPress={() => handleDelete(itemId)}>
                        <Text style={{ color: primary }}>Yes</Text>
                    </AutomobilesT.badgeStyleButtonDel>
                    <AutomobilesT.badgeStyleButtonNot onPress={() => navigation.goBack()}>
                        <Text style={{ color: primary }}>No</Text>
                    </AutomobilesT.badgeStyleButtonNot>
                </View>
            </Card>
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
export default DeleteAutomobile;