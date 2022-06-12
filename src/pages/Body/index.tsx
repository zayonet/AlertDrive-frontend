import * as React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert, TextInput, Title } from "react-native";
import * as Body from "./styles"
import { useAuth } from '../../contexts/auth';
//form
import { Field, Formik } from 'formik';
import { useFormik } from 'formik';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-community/picker'
//icons
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';
//Themes
import theme from "../../styles/index";
import Select from '../../components/select';
const { brandSecondary, brandSecondary2, primary, tertiary } = theme.light.colors;

//api server 
import api from '../../service/api';
import axios from 'axios';

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

const BodyUser: React.FC = ({ navigation }: any) => {
    const [hidePassword, setHidePassword] = React.useState(true);
    const [show, setShow] = React.useState(false);

    const { signOut, user } = useAuth();



    //Feedback on login 
    const [message, setMessage] = React.useState();
    const [messageType, setMessageType] = React.useState();
    //const [isSubmitting, setSubmitting] = useState();

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
            })
            .catch(error => {
                console.log(error)
                setSubmitting(false);
                //handleMessage("An error ocurred. Check your network and try again");
            })

        }
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

            <Formik
                initialValues={{
                    user_id:user?.id,
                    weigh:"",
                    heights: '',
                    blood_type: '',
                    body_pressure_max: '',
                    body_pressure_min: '',
                    glicemia: ''
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
                        //handleMessage('Please, fill all the fields');
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
                        value={values.weigh}
                        hidePassword={undefined}
                        setHidePassword={undefined} />
                    <MyTextInput
                        label="Introduce heights"
                        icon="person"
                        placeholder="1,75"
                        placeholderTextColor={tertiary}
                        onChangeText={handleChange('heights')}
                        onBlur={handleBlur('heights')}
                        value={values.heights}
                        hidePassword={undefined}
                        setHidePassword={undefined} />
                    
                    
                    <MyTextInput
                        label="Introduce body pressure max"
                        icon="pulse"
                        placeholder="200"
                        placeholderTextColor={tertiary}
                        onChangeText={handleChange('body_pressure_max')}
                        onBlur={handleBlur('body_pressure_max')}
                        value={values.body_pressure_max}
                        hidePassword={undefined}
                        setHidePassword={undefined} />
                    <MyTextInput
                        label="Introduce body pressure min"
                        icon="pulse"
                        placeholder="120"
                        placeholderTextColor={tertiary}
                        onChangeText={handleChange('body_pressure_min')}
                        onBlur={handleBlur('body_pressure_min')}
                        value={values.body_pressure_min}
                        hidePassword={undefined}
                        setHidePassword={undefined} />

                    <Text style={{ color: "#9c7c38"}}>
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
                    <Text style={{ color: "#9c7c38"}}>
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
        </View>
    );
}

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, isDate, showDatePicker, ...props }) => {
    return (<View>
        <Body.LeftIcon><Text>
            <Octicons name={icon} size={30} color={primary} /></Text>
        </Body.LeftIcon>
        <Body.StyledInputLabel><Text>{label}</Text></Body.StyledInputLabel>
        {!isDate && <Body.StyledTextInput {...props} />}
        {isDate && (<TouchableOpacity onPress={showDatePicker}>
            <Body.StyledTextInput {...props} />
        </TouchableOpacity>)}
        {isPassword && (
            <Body.RightIcon onPress={() => setHidePassword(!hidePassword)}>
                <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={tertiary} />
            </Body.RightIcon>
        )}
    </View>);
};
export default BodyUser 