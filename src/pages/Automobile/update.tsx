import * as React from 'react';
import { View, Text, ActivityIndicator, TextInput, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import * as Automobile from "./styles"
import { useAuth } from '../../contexts/auth';
//form
import { Formik } from 'formik';
import { Picker } from '@react-native-community/picker'
//icons
import { Octicons } from '@expo/vector-icons';
//Themes
import theme from "../../styles/index";
const { brandPrimary, secondary, primary, tertiary } = theme.light.colors;
import { showMessage } from "react-native-flash-message";

//api server 
import api from '../../service/api';
import cars_db from '../../database/dbCars';
import countries from '../../database/countries';
import engine_capacity from '../../database/engine_capacity';
import fuels from '../../database/fuels';
import horses from '../../database/horse_power';


interface automobile {
    brand: string;
    model: string;
    registration_number: string;
    registration_country: string;
    engine_capacity: string;
    year: string;
    fuel: string;
    horse_power: string;
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
    user_id: string;
    description: string;
    created_at?: string;
}
const UpdateAutomobile: React.FC = ({ route, navigation }: any) => {
    const {
        itemId,
        userId,
        carBrand,
        carModel,
        carRegNumber,
        carRegCountry,
        carEngineCap,
        carYear,
        carFuel,
        carHorsePower,
        carDescript } = route.params;

    const { user, token } = useAuth();
    const Authorization = `${token}`;


    async function updateUserAutomobile(credentials: IAutomobile, auto_id: string) {
        const response = await api.put(`/automobile/${auto_id}`, credentials, { headers: { Authorization } })
            .then((response) => {
                const result = response.data;
                console.log(result);
                showMessage({
                    message: "Perfeito!",
                    description: "Dados guardados com sucesso",
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
    //Feedback on login 
    const [message, setMessage] = React.useState();
    const [messageType, setMessageType] = React.useState();
    const handleMessage = (message: any, type: any = 'FAILED') => {
        setMessage(message);
        setMessageType(type);
    }
    return (
        <SafeAreaView>
            <ScrollView>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    {/* {
                auto.map((item, key) => ( */}
                    <Formik
                        /* key={key} */
                        initialValues={{
                            id: itemId,
                            user_id: userId,
                            brand: carBrand,
                            model: carModel,
                            registration_number: carRegNumber,
                            registration_country: carRegCountry,
                            engine_capacity: carEngineCap,
                            year: carYear,
                            fuel: carFuel,
                            horse_power: carHorsePower,
                            description: carDescript
                        }}

                        onSubmit={(values, { setSubmitting }) => {
                            values = { ...values }
                            if (
                                values.brand == '' ||
                                values.model == '' ||
                                values.registration_number == '') {
                                handleMessage('Please, fill all the fields');
                                setSubmitting(false);
                            } else {
                                updateUserAutomobile(values, itemId)
                            }
                        }
                        }
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) =>
                        (<Automobile.StyledFormArea>
                            <MyTextInput
                                label="Car Brand"
                                icon="dot-fill"
                                placeholder="Alfa Romeo"
                                placeholderTextColor={tertiary}
                                onChangeText={handleChange('brand')}
                                onBlur={handleBlur('brand')}
                                value={values.brand} />

                            <MyTextInput
                                label="Car Model"
                                icon="dot"
                                placeholder="105/115"
                                placeholderTextColor={tertiary}
                                onChangeText={handleChange('model')}
                                onBlur={handleBlur('model')}
                                value={values.model} />

                            <MyTextInput
                                label="Car Registration Number"
                                icon="checklist"
                                placeholder="12-25-IP"
                                placeholderTextColor={tertiary}
                                onChangeText={handleChange('registration_number')}
                                onBlur={handleBlur('registration_number')}
                                value={values.registration_number} />

                            <Text style={styles.pickerLabelStyle}>
                                Car Registration Country
                            </Text>
                            <Picker
                                enabled={true}
                                mode="dropdown"
                                placeholderTextColor={tertiary}
                                onValueChange={handleChange('registration_country')}
                                onBlur={handleBlur('registration_country')}
                                selectedValue={values.registration_country}
                                pickerStyleType={styles.pickerSelectStyle}
                                style={styles.pickerSelectStyle}
                            >
                                {countries.map((item) => {
                                    return (
                                        <Picker.Item
                                            label={item.name.toString()}
                                            value={item.name.toString()}
                                            key={item.code.toString()}
                                        />
                                    )
                                })}
                            </Picker>

                            <Text style={styles.pickerLabelStyle}>
                                Car Engine Capacity
                            </Text>
                            <Picker
                                enabled={true}
                                mode="dropdown"
                                placeholderTextColor={tertiary}
                                onValueChange={handleChange('engine_capacity')}
                                onBlur={handleBlur('engine_capacity')}
                                selectedValue={values.engine_capacity}
                                pickerStyleType={styles.pickerSelectStyle}
                                style={styles.pickerSelectStyle}
                            >
                                {engine_capacity.map((item) => {
                                    return (
                                        <Picker.Item
                                            label={item.capacity.toString()}
                                            value={item.capacity.toString()}
                                            key={item.id.toString()}
                                        />
                                    )
                                })}
                            </Picker>
                            <MyTextInput
                                label="Year"
                                icon="calendar"
                                placeholder="1993"
                                placeholderTextColor={tertiary}
                                onChangeText={handleChange('year')}
                                onBlur={handleBlur('year')}
                                value={values.year} />

                            <Text style={styles.pickerLabelStyle}>
                                Car Fuel
                            </Text>
                            <Picker
                                enabled={true}
                                mode="dropdown"
                                placeholderTextColor={tertiary}
                                onValueChange={handleChange('fuel')}
                                onBlur={handleBlur('fuel')}
                                selectedValue={values.fuel}
                                pickerStyleType={styles.pickerSelectStyle}
                                style={styles.pickerSelectStyle}
                            >
                                {fuels.map((item) => {
                                    return (
                                        <Picker.Item
                                            label={item.fuel.toString()}
                                            value={item.fuel.toString()}
                                            key={item.id.toString()}
                                        />
                                    )
                                })}
                            </Picker>

                            <Text style={styles.pickerLabelStyle}>
                                Horse Power
                            </Text>
                            <Picker
                                enabled={true}
                                mode="dropdown"
                                placeholderTextColor={tertiary}
                                onValueChange={handleChange('horse_power')}
                                onBlur={handleBlur('horse_power')}
                                selectedValue={values.horse_power}
                                pickerStyleType={styles.pickerSelectStyle}
                                style={styles.pickerSelectStyle}
                            >
                                {horses.map((item) => {
                                    return (
                                        <Picker.Item
                                            label={item.horse.toString()}
                                            value={item.horse.toString()}
                                            key={item.id.toString()}
                                        />
                                    )
                                })}
                            </Picker>
                            <Text style={{ color: brandPrimary, fontSize: 14 }}>
                                Some description:
                            </Text>
                            <TextInput
                                multiline={true}
                                numberOfLines={4}
                                placeholderTextColor={tertiary}
                                placeholder="Ex.: This car has any particular thing that never work"
                                style={{
                                    height: 170,
                                    backgroundColor: secondary,
                                    color: primary
                                }}
                                onChangeText={handleChange('description')}
                                onBlur={handleBlur('description')}
                                value={values.description}
                            />
                            <Automobile.MessageBox type={messageType}>{message}</Automobile.MessageBox>
                            {!isSubmitting &&
                                <Automobile.StyledBotton onPress={() => handleSubmit()}>
                                    <Automobile.BottonText>
                                        Save
                                    </Automobile.BottonText>
                                </Automobile.StyledBotton>}
                            {isSubmitting &&
                                <Automobile.StyledBotton disabled={true}>
                                    <ActivityIndicator size="large" color={primary}>
                                    </ActivityIndicator>
                                </Automobile.StyledBotton>}
                        </Automobile.StyledFormArea>
                        )}
                    </Formik>

                    {/*    ))
            } */}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const MyTextInput = ({ label, icon, ...props }) => {
    return (<View>
        <Automobile.LeftIcon><Text>
            <Octicons name={icon} size={30} color={primary} /></Text>
        </Automobile.LeftIcon>
        <Automobile.StyledInputLabel><Text>{label}</Text></Automobile.StyledInputLabel>
        <Automobile.StyledTextInput {...props} />
    </View>);
};

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
    }
})
export default UpdateAutomobile 