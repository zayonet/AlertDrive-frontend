import * as React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert, TextInput, Title } from "react-native";
import * as profile from "./styles"
import { useAuth } from '../../contexts/auth';
//form
import { Field, Formik } from 'formik';
import { useFormik } from 'formik';
import { Picker } from '@react-native-community/picker'
import DateTimePicker from '@react-native-community/datetimepicker';
//icons
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';
//Themes
import theme from "../../styles/index";
import Select from '../../components/select';
const { brandSecondary, brandSecondary2, primary, tertiary } = theme.light.colors;
const genders = [
    { name: "Male", id: 1 },
    { name: "Femele", id: 2 },
    { name: "Other", id: 3 }
];
interface IUser {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    birthday: string;
    country_id: string;
    nif: number;
    gender: string;
    phone: number;
}

const Profile: React.FC = ({ navigation }: any) => {
    const [hidePassword, setHidePassword] = React.useState(true);
    const [show, setShow] = React.useState(false);
    const [date, setDate] = React.useState(new Date(2000, 0, 1));
    const { signOut, user } = useAuth();


    //Actual date of birth to be sent
    const [userDate, setUserDate] = React.useState(new Date(2000, 0, 1));
    //Feedback on login 
    const [message, setMessage] = React.useState();
    const [messageType, setMessageType] = React.useState();
    //const [isSubmitting, setSubmitting] = useState();


    const onChange = (event: any, selectedDate: Date | undefined) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);
        setUserDate(currentDate);
    };

    const showDataPicker = () => {
        setShow(true);
    }
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode='date'
                    is24Hour={true}
                    onChange={onChange}
                />
            )}
            <Formik
                initialValues={
                    {
                        name: user?.name,
                        nif: user?.nif,
                        email: user?.email,
                        password: user?.password,
                        birthday: user?.birthday,
                        gender: user?.gender,
                        phone: user?.phone,
                        photo: user?.photo,
                        street: user?.street,
                        house_number: user?.house_number,
                        post_code: user?.post_code,
                        city: user?.city,
                        country_id: user?.country_id,
                        aboutme: user?.aboutme,
                    }
                }
                onSubmit={(values, { setSubmitting }) => {
                    values = { ...values, birthday: userDate }
                    if (
                        values.email == '' ||
                        values.password == '' ||
                        values.birthday == '' ||
                        values.nif == 0 ||
                        values.gender == '' ||
                        values.phone == 0) {
                        //handleMessage('Please, fill all the fields');
                        setSubmitting(false);
                    } else {
                        //handleSignup(values, setSubmitting)
                    }
                    //console.log(values); navigation.navigate('home')
                }
                }
            >
                {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) =>
                (<profile.StyledFormArea>
                    <MyTextInput
                        label="Full Name"
                        icon="person"
                        placeholder="Jose Pinto"
                        placeholderTextColor={tertiary}
                        onChangeText={handleChange('name')}
                        onBlur={handleBlur('name')}
                        value={values.name} isPassword={undefined}
                        hidePassword={undefined}
                        setHidePassword={undefined} />
                    <MyTextInput
                        label="Email Adress"
                        icon="mail"
                        placeholder="jose@mail.com"
                        placeholderTextColor={tertiary}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                        keyboardType="email-address" isPassword={undefined}
                        hidePassword={undefined}
                        setHidePassword={undefined} />
                    <MyTextInput
                        label="Date of Birth"
                        icon="calendar"
                        placeholder="YYYY - MM - DD"
                        placeholderTextColor={tertiary}
                        onChangeText={handleChange('birthday')}
                        onBlur={handleBlur('birthday')}
                        value={userDate ? userDate.toDateString() : ''}
                        isPassword={undefined}
                        hidePassword={undefined}
                        setHidePassword={undefined}
                        isDate={true}
                        editable={false}
                        showDatePicker={showDataPicker}
                    />
                    <MyTextInput
                        label="Password"
                        icon="lock"
                        placeholder="* * * * * *"
                        placeholderTextColor={tertiary}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                        secureTextEntry={hidePassword}
                        hidePassword={hidePassword}
                        isPassword={true}
                        setHidePassword={setHidePassword}
                    />
                    <Picker
                        enabled={true}
                        mode="dropdown"
                        placeholder="Select Gender"
                        placeholderTextColor={tertiary}
                        onValueChange={handleChange('gender')}
                        onBlur={handleBlur('gender')}
                        selectedValue={values.gender}
                    >
                        {genders.map((item) => {
                            return (
                                <Picker.Item
                                    label={item.name.toString()}
                                    value={item.name.toString()}
                                    key={item.id.toString()}
                                />
                            )
                        })}
                    </Picker>
                    <profile.MessageBox type={messageType}>{message}</profile.MessageBox>
                    {!isSubmitting &&
                        <profile.StyledBotton onPress={() => handleSubmit()}>
                            <profile.BottonText>
                                Save
                            </profile.BottonText>
                        </profile.StyledBotton>}
                    {isSubmitting &&
                        <profile.StyledBotton disabled={true}>
                            <ActivityIndicator size="large" color={primary}>
                            </ActivityIndicator>
                        </profile.StyledBotton>}
                </profile.StyledFormArea>
                )}
            </Formik>
        </View>
    );
}

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, isDate, showDatePicker, ...props }) => {
    return (<View>
        <profile.LeftIcon><Text>
            <Octicons name={icon} size={30} color={primary} /></Text>
        </profile.LeftIcon>
        <profile.StyledInputLabel><Text>{label}</Text></profile.StyledInputLabel>
        {!isDate && <profile.StyledTextInput {...props} />}
        {isDate && (<TouchableOpacity onPress={showDatePicker}>
            <profile.StyledTextInput {...props} />
        </TouchableOpacity>)}
        {isPassword && (
            <profile.RightIcon onPress={() => setHidePassword(!hidePassword)}>
                <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={tertiary} />
            </profile.RightIcon>
        )}
    </View>);
};
export default Profile 