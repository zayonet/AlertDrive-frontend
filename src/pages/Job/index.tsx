import * as React from 'react';
<<<<<<< HEAD
import { View, Text, TouchableOpacity, ActivityIndicator, Alert, TextInput, StyleSheet } from "react-native";
import * as Job from "./styles"
import { useAuth } from '../../contexts/auth';

=======
import { View, Text, TouchableOpacity, ActivityIndicator, Alert, TextInput, Title } from "react-native";
import * as Job from "./styles"
import { useAuth } from '../../contexts/auth';
//form
import { Field, Formik } from 'formik';
import { useFormik } from 'formik';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-community/picker'
>>>>>>> a8e08eb49879e6efcbe0796cf0e2bf99a825a423
//icons
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';
//Themes
import theme from "../../styles/index";
<<<<<<< HEAD
const { brandPrimary, secondary, primary, tertiary, brandSecondary } = theme.light.colors;

//api server 
import api from '../../service/api';
import { Avatar, Badge, Icon, withBadge, Card, ListItem, Divider } from 'react-native-elements'


interface job {
    occupation: string;
    start_work_time: string;
    end_work_time: string;
    period: string;
    company: string;
}
interface IJob {
    id: string;
    user_id: string;
    occupation: string;
    start_work_time: string;
    end_work_time: string;
    period: string;
    company: string;
    created_at: string;
}
const JobUser: React.FC = ({ navigation }: any) => {
    const [userJob, setUserJob] = React.useState<IJob[]>([]);

    const { user, token } = useAuth();
    const Authorization = `${token}`;

    async function getUserJobAsync() {
        const response = await api.get(`/job_user/user/${user?.id}`, { headers: { Authorization } })

        const jobUser = (response.data as IJob[]).map((item: {
            id: string;
            user_id: string;
            occupation: string;
            start_work_time: string;
            end_work_time: string;
            period: string;
            company: string;
            created_at: string;
        }) => {
            return {
                id: item.id,
                user_id: item.user_id,
                occupation: item.occupation,
                start_work_time: item.start_work_time,
                end_work_time: item.end_work_time,
                period: item.period,
                company: item.company,
                created_at: item.created_at
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
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>My Job</Text>

            {!userJob.length && <>
                <Text>No information was filled</Text>
                <Job.StyledBotton onPress={() => navigation.navigate('CreateUserJob')}>
                    <Job.BottonText>
                        Click to fill information
                    </Job.BottonText>
                </Job.StyledBotton>
            </>}
            {userJob &&
                userJob.map((item, key) => (
                    <Card key={item.id}>

                        <Text>What is your ocupation?</Text>
                        <Text style={styles.badgeStyleText}>{item?.occupation.toUpperCase()}</Text>
                        <Divider style={{ backgroundColor: brandPrimary }} />
                        <Text>At what time you go to work?</Text>
                        <Text style={styles.badgeStyleText}>{item?.start_work_time.toUpperCase()}</Text>
                        <Divider style={{ backgroundColor: brandPrimary }} />
                        <Text>At what time you finish work?</Text>
                        <Text style={styles.badgeStyleText}>{item?.end_work_time.toUpperCase()}</Text>

                        <Divider style={{ backgroundColor: brandPrimary }} />

                        <Text>Which period you work?</Text>
                        <Text style={styles.badgeStyleText}>{item?.period}</Text>
                        <Divider style={{ backgroundColor: brandPrimary }} />
                        <Text>Company Name?</Text>
                        <Text style={styles.badgeStyleText}>{item?.company}</Text>

                        <Divider style={{ backgroundColor: brandPrimary }} />
                        <Job.StyledBotton onPress={() => navigation.navigate('UpdateUserJob')}>
                            <Job.BottonText>
                                Update all information
                            </Job.BottonText>
                        </Job.StyledBotton>
                    </Card>
                ))
            }
=======
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
>>>>>>> a8e08eb49879e6efcbe0796cf0e2bf99a825a423
        </View>
    );
}

<<<<<<< HEAD
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
        marginBottom: 20

    },
    columnSize: {
        width: 170,
    },
    marginRight: {
        marginRight: 10
    },
})
=======
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
>>>>>>> a8e08eb49879e6efcbe0796cf0e2bf99a825a423
export default JobUser 