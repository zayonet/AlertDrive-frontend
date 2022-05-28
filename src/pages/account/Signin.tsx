import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
//form
import { Formik } from 'formik';

//icons
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';

//Themes
import tema from "../../styles"
const { primary, secondary, brandPrimary, tertiary } = tema.light.colors;

//Styles 
import * as Login from "./styles"
import * as Logo from "../../styles/logo"

//keyboard avoid view
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';

//api server 
import api from '../../service/api';
import axios from 'axios';

interface user {
    email: string;
    password: string;
}

const Signin = ({ navigation }: any) => {
    const [hidePassword, setHidePassword] = useState(true);
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();
    //const [isSubmitting, setSubmitting] = useState();

    const handleLogin = (credetials: user, setSubmitting) => {
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
                    navigation.navigate('home', { ...user[0] });
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
                        <Logo.PageLogo resizeMode='contain' source={require('../../../assets/images/logo.png')} />
                        <Logo.PageName resizeMode='contain' source={require('../../../assets/images/logoName.png')} />
                        <Logo.PageSlogan resizeMode='contain' source={require('../../../assets/images/logoSlogan.png')} />
                        <Login.SubTitle onPress={() => navigation.navigate('welcome')}>Account Login</Login.SubTitle>
                        <Formik initialValues={{ email: "", password: "" }}
                            onSubmit={(values, { setSubmitting }) => {
                                if (values.email == '' || values.password == '') {
                                    handleMessage('Please, fill all the fields');
                                    setSubmitting(false);
                                } else {
                                    handleLogin(values, setSubmitting)
                                }
                                //console.log(values); navigation.navigate('home')
                            }
                            }>
                            {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) =>
                            (<Login.StyledFormArea>
                                <MyTextInput
                                    label="Email Adress"
                                    icon="mail"
                                    placeholder="jose@mail.com"
                                    placeholderTextColor={tertiary}
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                    keyboardType="email-address" isPassword={undefined} hidePassword={undefined} setHidePassword={undefined} />
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
                                <Login.MessageBox type={messageType}>{message}</Login.MessageBox>
                                {!isSubmitting &&
                                    <Login.StyledBotton onPress={() => handleSubmit()}>
                                        <Login.BottonText>
                                            Login
                                        </Login.BottonText>
                                    </Login.StyledBotton>}
                                {isSubmitting &&
                                    <Login.StyledBotton disabled={true}>
                                        <ActivityIndicator size="large" color={primary}>
                                        </ActivityIndicator>
                                    </Login.StyledBotton>}
                                <Login.Line />
                                <Login.StyledBotton google={true} onPress={() => handleSubmit()}>
                                    <Fontisto name="google" color={primary} size={24} style={styles.spaces} />
                                    <Login.BottonText google={true} >
                                        Sign in with Google
                                    </Login.BottonText>
                                </Login.StyledBotton>
                                <Login.ExtraView>
                                    <Login.ExtraText>
                                        <Text>Dont't have an account?</Text>
                                    </Login.ExtraText>
                                    <Login.TextLink onPress={() => navigation.navigate('signup')}><Text>Signup</Text></Login.TextLink>
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

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {
    return (<View>
        <Login.LeftIcon><Text style={styles.zero}>
            <Octicons name={icon} size={30} color={primary} /></Text>
        </Login.LeftIcon>
        <Login.StyledInputLabel><Text style={styles.zero}>{label}</Text></Login.StyledInputLabel>
        <Login.StyledTextInput {...props} />
        {isPassword && (
            <Login.RightIcon onPress={() => setHidePassword(!hidePassword)}>
                <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={tertiary} />
            </Login.RightIcon>
        )}
    </View>);
};

export default Signin;


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