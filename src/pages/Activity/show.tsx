import * as React from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Ativity from "./styles"
//Themes
import theme from "../../styles/index";
const { brandPrimary, secondary, primary, tertiary, brandSecondary } = theme.light.colors;
//api server 
import api from '../../service/api';
import { Card, Divider } from 'react-native-elements'

const ShowActivity: React.FC = ({ route, navigation }: any) => {
    /* 2. Get the param */
    const { itemId } = route.params;
    const { itemfood } = route.params;
    const { itemDrink } = route.params;
    const { itemSmoked } = route.params;
    const { itemDescription } = route.params;
    return (


        <View style={{ flex: 1, justifyContent: 'center' }}>
            <Card>
                <Text>Activity ID: {itemId}</Text>
                <Divider style={{ backgroundColor: brandPrimary, marginTop: 10, marginBottom: 25 }} />
                <Text>Which food did you eat now?</Text>
                <Text style={styles.badgeStyleText}>{itemfood}</Text>
                <Divider style={{ backgroundColor: brandPrimary }} />
                <Text>Did you drink anything?</Text>
                <Text style={styles.badgeStyleText}>{itemDrink}</Text>
                <Divider style={{ backgroundColor: brandPrimary }} />
                <Text>Did you smoke?</Text>
                <Text style={styles.badgeStyleText}>{itemSmoked}</Text>
                <Divider style={{ backgroundColor: brandPrimary }} />
                <Text>Some description:</Text>
                <Text style={styles.badgeStyleText}>{itemDescription}</Text>
                <Divider style={{ backgroundColor: brandPrimary }} />
                <View style={styles.row}>
                    <Ativity.badgeStyleButton onPress={() => navigation.push('UpdateAtivity', { itemId: itemId })}>
                        <Text style={{ color: brandPrimary }}>Edit</Text>
                    </Ativity.badgeStyleButton>
                    <Ativity.badgeStyleButton onPress={() => navigation.goBack()}>
                        <Text style={{ color: brandPrimary }}>Go back</Text>
                    </Ativity.badgeStyleButton>
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
export default ShowActivity;