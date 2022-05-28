import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useAuth } from '../../contexts/auth';

//keyboard avoid view
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';

//api server 
import api from '../../service/api';
import axios from 'axios';

//form
import { Formik } from 'formik';

//icons
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';

//Date and Time Picker
import DateTimePicker from '@react-native-community/datetimepicker';

//Themes
import theme from "../../styles/index";
const { primary, tertiary } = theme.light.colors;

//Styles 
import * as signup from "./styles";
import * as Logo from "../../styles/logo";

//Interface
import IUserCredentiasl from "../../interface/user";
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


const SignUp: React.FC = ({ navigation }: any) => {
    const [hidePassword, setHidePassword] = useState(true);
    const [show, setShow] = useState(false);
    const [date, setDate] = useState(new Date(2000, 0, 1));

    //Actual date of birth to be sent
    const [userDate, setUserDate] = useState(new Date(2000, 0, 1));
    //Feedback on login 
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();
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

    async function handleSignup(credentials: IUser, setSubmitting: any) {
        handleMessage(null);
        console.log(credentials);
        const response = await api.post('/user', credentials)
            .then((response) => {
                const result = response.data;
                if (result) {
                    navigation.navigate('SignIn');
                }
                setSubmitting(false);
            })
            .catch(error => {
                console.log(error)
                setSubmitting(false);
                handleMessage("An error ocurred. Check your network and try again");
            })
        /* const url = api + '/user';
        axios.post(url, credetials)
            .then((response) => {
                const result = response.data;
                const { token, user } = result
                //if (status !== 'SUCCESS') {
                if (result) {
                    navigation.navigate('SignIn');
                }
                setSubmitting(false);
            })
            .catch(error => {
                console.log(error.JSON())
                setSubmitting(false);
                handleMessage("An error ocurred. Check your network and try again");
            }) */
    }

    /*  async function handleSignIn(credetials: IUser, setSubmitting: any) {
         handleMessage(null);
         signIn(credetials);
         setSubmitting(false);
     } */

    const handleMessage = (message: any, type: any = 'FAILED') => {
        setMessage(message);
        setMessageType(type);
    }
    return (
        <KeyboardAvoidingWrapper>
            <signup.Container>
                <signup.InnerContainer>
                    <Logo.LogoContainer>
                        <Logo.PageLogo resizeMode='contain' source={require('../../../assets/images/logo.png')} />
                        <Logo.PageName resizeMode='contain' source={require('../../../assets/images/logoName.png')} />
                        <Logo.PageSlogan resizeMode='contain' source={require('../../../assets/images/logoSlogan.png')} />
                    </Logo.LogoContainer>
                    {show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode='date'
                            is24Hour={true}
                            onChange={onChange}
                        />
                    )}
                    <Formik initialValues={{ name: "", email: "", password: "", confirmPassword: "", birthday: "", country_id: "852bdd28-c30c-499b-b675-94deb4347f3c", nif: 0, gender: "", phone: 0 }}
                        onSubmit={(values, { setSubmitting }) => {
                            values = { ...values, birthday: userDate }
                            if (
                                values.email == '' ||
                                values.password == '' ||
                                values.confirmPassword == '' ||
                                values.birthday == '' ||
                                values.nif == 0 ||
                                values.gender == '' ||
                                values.phone == 0) {
                                handleMessage('Please, fill all the fields');
                                setSubmitting(false);
                            } else if (values.password !== values.confirmPassword) {
                                handleMessage('Password do not match');
                                setSubmitting(false);
                            } else {
                                handleSignup(values, setSubmitting)
                            }
                            //console.log(values); navigation.navigate('home')
                        }
                        }
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) =>
                        (<signup.StyledFormArea>
                            <MyTextInput
                                label="Full Name"
                                icon="person"
                                placeholder="Jose Pinto"
                                placeholderTextColor={tertiary}
                                onChangeText={handleChange('name')}
                                onBlur={handleBlur('name')}
                                value={values.name} />
                            <MyTextInput
                                label="Email Adress"
                                icon="mail"
                                placeholder="jose@mail.com"
                                placeholderTextColor={tertiary}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                keyboardType="email-address"
                            />
                            <MyTextInput
                                label="Date of Birth"
                                icon="calendar"
                                placeholder="YYYY - MM - DD"
                                placeholderTextColor={tertiary}
                                onChangeText={handleChange('birthday')}
                                onBlur={handleBlur('birthday')}
                                value={userDate ? userDate.toDateString() : ''}
                                isDate={true}
                                editable={false}
                                showDatePicker={showDataPicker}
                            />
                            <MyTextInput
                                label="N.º Identificação Fiscal (NIF)"
                                icon="number"
                                placeholder="30255897"
                                placeholderTextColor={tertiary}
                                onChangeText={handleChange('nif')}
                                onBlur={handleBlur('nif')}
                                value={values.nif}
                            />
                            <MyTextInput
                                label="Gender"
                                icon="circle"
                                placeholder="Masculino || Femenino"
                                placeholderTextColor={tertiary}
                                onChangeText={handleChange('gender')}
                                onBlur={handleBlur('gender')}
                                value={values.gender}
                            />
                            <MyTextInput
                                label="Phone Number"
                                icon="device-mobile"
                                placeholder="936545878"
                                placeholderTextColor={tertiary}
                                onChangeText={handleChange('phone')}
                                onBlur={handleBlur('phone')}
                                value={values.phone}
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
                            <MyTextInput
                                label="Confirm Password"
                                icon="lock"
                                placeholder="* * * * * *"
                                placeholderTextColor={tertiary}
                                onChangeText={handleChange('confirmPassword')}
                                onBlur={handleBlur('confirmPassword')}
                                value={values.confirmPassword}
                                secureTextEntry={hidePassword}
                                hidePassword={hidePassword}
                                isPassword={true}
                                setHidePassword={setHidePassword}
                            />
                            <MyTextInput
                                label="Country"
                                icon="location"
                                placeholder={values.country_id}
                                placeholderTextColor={tertiary}
                                onChangeText={handleChange('country_id')}
                                onBlur={handleBlur('country_id')}
                                value={values.country_id}
                            />
                            <signup.MessageBox type={messageType}>{message}</signup.MessageBox>
                            {!isSubmitting &&
                                <signup.StyledBotton onPress={() => handleSubmit()}>
                                    <signup.BottonText>
                                        Signup
                                    </signup.BottonText>
                                </signup.StyledBotton>}
                            {isSubmitting &&
                                <signup.StyledBotton disabled={true}>
                                    <ActivityIndicator size="large" color={primary}>
                                    </ActivityIndicator>
                                </signup.StyledBotton>}
                            <signup.Line />
                            <signup.Line />
                            <signup.ExtraView>
                                <signup.ExtraText>
                                    <Text>I have already account?</Text>
                                </signup.ExtraText>
                                <signup.TextLink onPress={() => navigation.navigate('SignIn')}><Text>Sign In</Text></signup.TextLink>
                            </signup.ExtraView>
                        </signup.StyledFormArea>
                        )}
                    </Formik>
                </signup.InnerContainer>
            </signup.Container>
        </KeyboardAvoidingWrapper>
    )

};
const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, isDate, showDatePicker, ...props }) => {
    return (<View>
        <signup.LeftIcon>
            <Text style={styles.zero}>
                {icon && <Octicons name={icon} size={30} color={primary} />
                    || <Fontisto name={icon} size={30} color={primary} />}
            </Text>
        </signup.LeftIcon>
        <signup.StyledInputLabel><Text style={styles.zero}>{label}</Text></signup.StyledInputLabel>
        {!isDate && <signup.StyledTextInput {...props} />}
        {isDate && (<TouchableOpacity onPress={showDatePicker}>
            <signup.StyledTextInput {...props} />
        </TouchableOpacity>)}
        {isPassword && (
            <signup.RightIcon onPress={() => setHidePassword(!hidePassword)}>
                <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={tertiary} />
            </signup.RightIcon>
        )}
    </View>);
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    zero: {
        padding: 0,
        margin: 0,
    },
    spaces: {
        marginLeft: 12,
        marginRight: 12
    }
})
export default SignUp;