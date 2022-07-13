import * as React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import * as Job from "./styles"
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


interface IJob {
    id: string;
    occupation: string;
    start_work_time: string;
    end_work_time: string;
    period: string;
    company: string;
    user_id: string | number | undefined;
}
const workPeriod = [
    { name: "Night time", id: 1 },
    { name: "Day Period", id: 2 },
    { name: "Varied Period", id: 3 }
];
const UpdateUserJob: React.FC = ({ navigation }: any) => {
    const [userJob, setUserJob] = React.useState<IJob[]>([]);

    const { user, token } = useAuth();
    const Authorization = `${token}`;

    async function getUserJobAsync() {
        const response = await api.get(`/job_user/user/${user?.id}`, { headers: { Authorization } })

        const jobUser = (response.data as IJob[]).map((item: {
            id: string;
            occupation: string;
            start_work_time: string;
            end_work_time: string;
            period: string;
            company: string;
            user_id: string | number | undefined;
        }) => {
            return {
                id: item.id,
                user_id: item.user_id,
                occupation: item.occupation,
                start_work_time: item.start_work_time,
                end_work_time: item.end_work_time,
                period: item.period,
                company: item.company
            }
        })
        setUserJob(jobUser)
    }
    React.useEffect(() => {
        getUserJobAsync()
        const updateNavigation = navigation.addListener('focus', () => {
            getUserJobAsync();
        });
        return updateNavigation;
    }, [])

    async function updateUserJob(credentials: IJob, jobUser_id: string) {
        const response = await api.put(`/job_user/${jobUser_id}`, credentials, { headers: { Authorization } })
            .then((response) => {
                const result = response.data;
                console.log(result);
                showMessage({
                    message: "Perfeito!",
                    description: "Dados guardados com sucesso",
                    type: "success",
                });
                navigation.navigate('Job');
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
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

            {
                userJob.map((item, key) => (
                    <Formik
                        key={item?.id}
                        initialValues={{
                            id: item?.id,
                            user_id: user?.id,
                            occupation: item?.occupation,
                            start_work_time: item?.start_work_time,
                            end_work_time: item?.end_work_time,
                            period: item?.period,
                            company: item?.company
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
                                updateUserJob(values, item.id)
                            }
                        }
                        }
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) =>
                        (<Job.StyledFormArea>
                            <MyTextInput
                                label="What is your ocupation?"
                                icon="briefcase"
                                placeholder="Professor"
                                placeholderTextColor={tertiary}
                                onChangeText={handleChange('occupation')}
                                onBlur={handleBlur('occupation')}
                                value={values.occupation} />
                            <MyTextInput
                                label="At what time you go to work?"
                                icon="clock"
                                placeholder="8:00"
                                placeholderTextColor={tertiary}
                                onChangeText={handleChange('start_work_time')}
                                onBlur={handleBlur('start_work_time')}
                                value={values.start_work_time} />
                            <MyTextInput
                                label="At what time you finish work?"
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
                                label="Which period you work?"
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
                                label="Company Name?"
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

                ))
            }
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
export default UpdateUserJob 