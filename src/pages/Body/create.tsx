import * as React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert, TextInput, StyleSheet } from "react-native";
import * as Body from "./styles"
import { useAuth } from '../../contexts/auth';
//form
import { Formik } from 'formik';
import { Picker } from '@react-native-community/picker'
//icons
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';
//message
import { showMessage, hideMessage } from "react-native-flash-message";
//Themes
import theme from "../../styles/index";
const { brandPrimary, secondary, primary, tertiary } = theme.light.colors;
//api server 
import api from '../../service/api';

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
const CreateBodyUser: React.FC = ({ navigation }: any) => {
    const [userBody, setUserBody] = React.useState<IBody[]>([]);

    const { user, token } = useAuth();
    const Authorization = `${token}`;

    //Feedback on login 
    const [message, setMessage] = React.useState();
    const [messageType, setMessageType] = React.useState();

    async function handleUserBody(credentials: body, setSubmitting: any) {
        //handleMessage(null);
        console.log(credentials);
        const response = await api.post('/body_user', credentials)
            .then((response) => {
                const result = response.data;
                if (result) {
                    navigation.navigate('Body');
                }
                setSubmitting(false);
                showMessage({
                    message: "Perfeito!",
                    description: "Dados guardados com sucesso",
                    type: "success",
                });
            })
            .catch(error => {
                console.log(error)
                setSubmitting(false);
                handleMessage("An error ocurred. Check your network and try again");
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
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Formik
                initialValues={{
                    user_id: user?.id,
                    weigh: "",
                    heights: "",
                    blood_type: "",
                    body_pressure_max: "",
                    body_pressure_min: "",
                    glicemia: ""
                }}

                onSubmit={(values, { setSubmitting }) => {
                    values = { ...values }
                    if (
                        values.weigh == '' ||
                        values.heights == '' ||
                        values.blood_type == '' ||
                        values.body_pressure_max == '' ||
                        values.body_pressure_min == '' ||
                        values.glicemia == '') {
                        handleMessage('Please, fill all the fields');
                        setSubmitting(false);
                    } else {
                        handleUserBody(values, setSubmitting)
                    }
                    //console.log(values); navigation.navigate('home')
                }
                }
            >
                {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) =>
                (<Body.StyledFormArea>
                    <MyTextInput
                        label="Introduce weigh"
                        icon="person"
                        placeholder="75"
                        placeholderTextColor={tertiary}
                        onChangeText={handleChange('weigh')}
                        onBlur={handleBlur('weight')}
                        value={values.weigh} />

                    <MyTextInput
                        label="Introduce heights"
                        icon="person"
                        placeholder="1,75"
                        placeholderTextColor={tertiary}
                        onChangeText={handleChange('heights')}
                        onBlur={handleBlur('heights')}
                        value={values.heights} />


                    <MyTextInput
                        label="Introduce body pressure max"
                        icon="pulse"
                        placeholder="200"
                        placeholderTextColor={tertiary}
                        onChangeText={handleChange('body_pressure_max')}
                        onBlur={handleBlur('body_pressure_max')}
                        value={values.body_pressure_max} />
                    <MyTextInput
                        label="Introduce body pressure min"
                        icon="pulse"
                        placeholder="120"
                        placeholderTextColor={tertiary}
                        onChangeText={handleChange('body_pressure_min')}
                        onBlur={handleBlur('body_pressure_min')}
                        value={values.body_pressure_min} />

                    <Text style={styles.pickerLabelStyle}>
                        Select your blood type
                    </Text>
                    <Picker
                        enabled={true}
                        label="Introduce heights"
                        mode="dropdown"
                        placeholder="Select blood_type"
                        placeholderTextColor={tertiary}
                        onValueChange={handleChange('blood_type')}
                        onBlur={handleBlur('blood_type')}
                        selectedValue={values.blood_type}
                        pickerStyleType={styles.pickerSelectStyle}
                        style={styles.pickerSelectStyle}
                    >
                        {blood_types.map((item) => {
                            return (
                                <Picker.Item
                                    label={item.name.toString()}
                                    value={item.name.toString()}
                                    key={item.id.toString()}
                                />
                            )
                        })}
                    </Picker>
                    <Text style={styles.pickerLabelStyle}>
                        Select your glicemia type
                    </Text>
                    <Picker
                        enabled={true}
                        label="Introduce glicemia"
                        mode="dropdown"
                        placeholder="Select glicemia type"
                        placeholderTextColor={tertiary}
                        onValueChange={handleChange('glicemia')}
                        onBlur={handleBlur('glicemia')}
                        selectedValue={values.blood_type}
                        pickerStyleType={styles.pickerSelectStyle}
                        style={styles.pickerSelectStyle}
                    >
                        {glicemia_types.map((item) => {
                            return (
                                <Picker.Item
                                    label={item.name.toString()}
                                    value={item.name.toString()}
                                    key={item.id.toString()}
                                />
                            )
                        })}
                    </Picker>
                    <Body.MessageBox type={messageType}>{message}</Body.MessageBox>
                    {!isSubmitting &&
                        <Body.StyledBotton onPress={() => handleSubmit()}>
                            <Body.BottonText>
                                Save
                            </Body.BottonText>
                        </Body.StyledBotton>}
                    {isSubmitting &&
                        <Body.StyledBotton disabled={true}>
                            <ActivityIndicator size="large" color={primary}>
                            </ActivityIndicator>
                        </Body.StyledBotton>}
                </Body.StyledFormArea>
                )}
            </Formik>
        </View>);
};

const MyTextInput = ({ label, icon, ...props }) => {
    return (<View>
        <Body.LeftIcon><Text>
            <Octicons name={icon} size={30} color={primary} /></Text>
        </Body.LeftIcon>
        <Body.StyledInputLabel><Text>{label}</Text></Body.StyledInputLabel>
        <Body.StyledTextInput {...props} />
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
export default CreateBodyUser 