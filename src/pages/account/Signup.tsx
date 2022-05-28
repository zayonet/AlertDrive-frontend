import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
//form
import { Formik } from 'formik';
//icons
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

import tema from "../../styles"

const { primary, secondary, brandPrimary, tertiary } = tema.light.colors;

import * as Login from "./styles"
import * as Logo from "../../styles/logo"

//api server 
import api from '../../service/api';
import axios from 'axios';

//keyboard avoid view
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';

interface user {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    birthday: string;
}

const Signup = ({ navigation }: any) => {
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
    const handleSignup = (credetials: user, setSubmitting) => {
        handleMessage(null);
        const url = api + '/session';
        axios.post(url, credetials)
            .then((response) => {
                const result = response.data;
                const { token, user } = result
                //if (status !== 'SUCCESS') {
                if (token) {
                    handleMessage(token, user)
                } else {
                    navigation.navigate('home', { ...user });
                }
                setSubmitting(false);
            })
            .catch(error => {
                console.log(error.JSON())
                setSubmitting(false);
                handleMessage("An error ocurred. Check your network and try again");
            })
    }

    const handleMessage = (message: any, type: any = 'FAILED') => {
        setMessage(message);
        setMessageType(type);
    }
    return (
        <KeyboardAvoidingWrapper>
            <Login.Container>
                <StatusBar style="dark" />
                <Login.InnerContainer>
                    <Logo.LogoContainer>
                        <Logo.PageName resizeMode='contain' source={require('../../../assets/images/logoName.png')} />
                        <Logo.PageSlogan resizeMode='contain' source={require('../../../assets/images/logoSlogan.png')} />
                        <Login.SubTitle>Account Signup</Login.SubTitle>
                        {show && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={date}
                                mode='date'
                                is24Hour={true}
                                onChange={onChange}
                            />
                        )}
                        <Formik initialValues={{ name: "", email: "", password: "", confirmPassword: "", birthday: "", }}
                            onSubmit={(values, { setSubmitting }) => {
                                values = { ...values, birthday: userDate }
                                if (
                                    values.email == '' ||
                                    values.password == '' ||
                                    values.confirmPassword == '' ||
                                    values.birthday == '') {
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
                            (<Login.StyledFormArea>
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
                                <Login.MessageBox type={messageType}>{message}</Login.MessageBox>
                                {!isSubmitting &&
                                    <Login.StyledBotton onPress={() => handleSubmit()}>
                                        <Login.BottonText>
                                            Signup
                                        </Login.BottonText>
                                    </Login.StyledBotton>}
                                {isSubmitting &&
                                    <Login.StyledBotton disabled={true}>
                                        <ActivityIndicator size="large" color={primary}>
                                        </ActivityIndicator>
                                    </Login.StyledBotton>}
                                <Login.Line />
                                <Login.Line />
                                <Login.ExtraView>
                                    <Login.ExtraText>
                                        <Text>I have already account?</Text>
                                    </Login.ExtraText>
                                    <Login.TextLink onPress={() => navigation.navigate('signin')}><Text>Login</Text></Login.TextLink>
                                </Login.ExtraView>
                            </Login.StyledFormArea>
                            )}
                        </Formik>
                    </Logo.LogoContainer>
                </Login.InnerContainer>
            </Login.Container>
        </KeyboardAvoidingWrapper>
    )
};

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, isDate, showDatePicker, ...props }) => {
    return (<View>
        <Login.LeftIcon><Text style={styles.zero}>
            <Octicons name={icon} size={30} color={primary} /></Text>
        </Login.LeftIcon>
        <Login.StyledInputLabel><Text style={styles.zero}>{label}</Text></Login.StyledInputLabel>
        {!isDate && <Login.StyledTextInput {...props} />}
        {isDate && (<TouchableOpacity onPress={showDatePicker}>
            <Login.StyledTextInput {...props} />
        </TouchableOpacity>)}
        {isPassword && (
            <Login.RightIcon onPress={() => setHidePassword(!hidePassword)}>
                <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={tertiary} />
            </Login.RightIcon>
        )}
    </View>);
};

export default Signup;


const styles = StyleSheet.create({
    zero: {
        padding: 0,
        margin: 0,
    },
    spaces: {
        marginLeft: 12,
        marginRight: 12
    }
});