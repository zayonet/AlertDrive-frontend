import * as React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert, TextInput, StyleSheet } from "react-native";
import * as Job from "./styles"
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
const { secondary, brandPrimary, primary, tertiary } = theme.light.colors;
import { showMessage, hideMessage } from "react-native-flash-message";

//api server 
import api from '../../service/api';
import axios from 'axios';


interface job {
    occupation: string;
    start_work_time: string;
    end_work_time: string;
    period: string;
    company: string;
}
const workPeriod = [
    { name: "Night time", id: 1 },
    { name: "Day Period", id: 2 },
    { name: "Varied Period", id: 3 }
];
const CreateJobUser: React.FC = ({ navigation }: any) => {
    const { signOut, user, token } = useAuth();
    //Feedback on login 
    const [message, setMessage] = React.useState();
    const [messageType, setMessageType] = React.useState();
    const Authorization = `${token}`;

    async function handleUserJob(credentials: job, setSubmitting: any) {
        //handleMessage(null);
        console.log(credentials);
        const response = await api.post('/job_user', credentials)
            .then((response) => {
                const result = response.data;
                if (result) {
                    navigation.navigate('Job');
                }
                setSubmitting(false);
                showMessage({
                    message: "Perfeito!",
                    description: "Dados guardados com sucesso",
                    type: "success",
                });
                navigation.navigate('Job');
            })
            .catch(error => {
                console.log(error)
                setSubmitting(false);
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
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

            <Formik
                initialValues={{
                    user_id: user?.id,
                    occupation: "",
                    start_work_time: "",
                    end_work_time: "",
                    period: "",
                    company: ""
                }}

                onSubmit={(values, { setSubmitting }) => {
                    values = { ...values }
                    if (
                        values.occupation == '' ||
                        values.start_work_time == '' ||
                        values.end_work_time == '' ||
                        values.period == '' ||
                        values.company == '') {
                        handleMessage('Please, fill all the fields');
                        setSubmitting(false);
                    } else {
                        handleUserJob(values, setSubmitting)
                    }
                    //console.log(values); navigation.navigate('home')
                }
                }
            >
                {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) =>
                (<Job.StyledFormArea>
                    <MyTextInput
                        label="Introduce occupation"
                        icon="briefcase"
                        placeholder="Professor"
                        placeholderTextColor={tertiary}
                        onChangeText={handleChange('occupation')}
                        onBlur={handleBlur('occupation')}
                        value={values.occupation} />
                    <MyTextInput
                        label="Introduce start work time"
                        icon="clock"
                        placeholder="8:00"
                        placeholderTextColor={tertiary}
                        onChangeText={handleChange('start_work_time')}
                        onBlur={handleBlur('start_work_time')}
                        value={values.start_work_time} />
                    <MyTextInput
                        label="Introduce end work time"
                        icon="clock"
                        placeholder="16:00"
                        placeholderTextColor={tertiary}
                        onChangeText={handleChange('end_work_time')}
                        onBlur={handleBlur('end_work_time')}
                        value={values.end_work_time} />
                    <Text style={styles.pickerLabelStyle}>
                        Work time Table (Schedule)
                    </Text>
                    <Picker
                        enabled={true}
                        label="Work time Table (Schedule)"
                        mode="dropdown"
                        placeholder="Select time work"
                        placeholderTextColor={tertiary}
                        onValueChange={handleChange('period')}
                        onBlur={handleBlur('period')}
                        selectedValue={values.period}
                        pickerStyleType={styles.pickerSelectStyle}
                        style={styles.pickerSelectStyle}
                    >
                        {workPeriod.map((item) => {
                            return (
                                <Picker.Item
                                    label={item.name.toString()}
                                    value={item.name.toString()}
                                    key={item.id.toString()}
                                />
                            )
                        })}
                    </Picker>
                    <MyTextInput
                        label="Introduce company"
                        icon="organization"
                        placeholder="UFC"
                        placeholderTextColor={tertiary}
                        onChangeText={handleChange('company')}
                        onBlur={handleBlur('company')}
                        value={values.company}
                        hidePassword={undefined}
                        setHidePassword={undefined} />


                    <Job.MessageBox type={messageType}>{message}</Job.MessageBox>
                    {!isSubmitting &&
                        <Job.StyledBotton onPress={() => handleSubmit()}>
                            <Job.BottonText>
                                Save
                            </Job.BottonText>
                        </Job.StyledBotton>}
                    {isSubmitting &&
                        <Job.StyledBotton disabled={true}>
                            <ActivityIndicator size="large" color={primary}>
                            </ActivityIndicator>
                        </Job.StyledBotton>}
                </Job.StyledFormArea>
                )}
            </Formik>
        </View>
    );
}

const MyTextInput = ({ label, icon, ...props }) => {
    return (<View>
        <Job.LeftIcon><Text>
            <Octicons name={icon} size={30} color={primary} /></Text>
        </Job.LeftIcon>
        <Job.StyledInputLabel><Text>{label}</Text></Job.StyledInputLabel>
        <Job.StyledTextInput {...props} />
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
export default CreateJobUser 