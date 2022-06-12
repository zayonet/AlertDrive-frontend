import * as React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert, TextInput, Title } from "react-native";
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
import Select from '../../components/select';
const { brandSecondary, brandSecondary2, primary, tertiary } = theme.light.colors;

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

const JobUser: React.FC = ({ navigation }: any) => {
    const [hidePassword, setHidePassword] = React.useState(true);
    const [show, setShow] = React.useState(false);

    const { signOut, user } = useAuth();



    //Feedback on login 
    const [message, setMessage] = React.useState();
    const [messageType, setMessageType] = React.useState();
    //const [isSubmitting, setSubmitting] = useState();

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
                        //handleMessage('Please, fill all the fields');
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
                        value={values.occupation}
                        hidePassword={undefined}
                        setHidePassword={undefined} />
                    <MyTextInput
                        label="Introduce start work time"
                        icon="clock"
                        placeholder="8:00"
                        placeholderTextColor={tertiary}
                        onChangeText={handleChange('start_work_time')}
                        onBlur={handleBlur('start_work_time')}
                        value={values.start_work_time}
                        hidePassword={undefined}
                        setHidePassword={undefined} />
                    <MyTextInput
                        label="Introduce end work time"
                        icon="clock"
                        placeholder="16:00"
                        placeholderTextColor={tertiary}
                        onChangeText={handleChange('end_work_time')}
                        onBlur={handleBlur('end_work_time')}
                        value={values.end_work_time}
                        hidePassword={undefined}
                        setHidePassword={undefined} />
                    <MyTextInput
                        label="Introduce period"
                        icon="organization"
                        placeholder="120"
                        placeholderTextColor={tertiary}
                        onChangeText={handleChange('period')}
                        onBlur={handleBlur('period')}
                        value={values.period}
                        hidePassword={undefined}
                        setHidePassword={undefined} />
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

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, isDate, showDatePicker, ...props }) => {
    return (<View>
        <Job.LeftIcon><Text>
            <Octicons name={icon} size={30} color={primary} /></Text>
        </Job.LeftIcon>
        <Job.StyledInputLabel><Text>{label}</Text></Job.StyledInputLabel>
        {!isDate && <Job.StyledTextInput {...props} />}
        {isDate && (<TouchableOpacity onPress={showDatePicker}>
            <Job.StyledTextInput {...props} />
        </TouchableOpacity>)}
        {isPassword && (
            <Job.RightIcon onPress={() => setHidePassword(!hidePassword)}>
                <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={tertiary} />
            </Job.RightIcon>
        )}
    </View>);
};
export default JobUser 