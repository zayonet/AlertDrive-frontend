import React, { useContext, useState } from 'react';
import { StyleSheet, Button, View, ActivityIndicator, Text } from 'react-native'
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

//Themes
import tema from "../../styles";
const { primary, secondary, brandPrimary, tertiary } = tema.light.colors;

//Styles 
import * as Login from "./styles";
import * as Logo from "../../styles/logo";

//Interface
import IUserCredentiasl from "../../interface/user";
interface user {
    email: string;
    password: string;
}

const SignIn: React.FC = ({ navigation }: any) => {
    const { signed, user, signIn } = useAuth();
    const [hidePassword, setHidePassword] = useState(true);
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();

    console.log(signed);
    console.log(user);
    async function handleSignIn(credetials: IUserCredentiasl, setSubmitting: any) {
        handleMessage(null);
        signIn(credetials);
        setSubmitting(false);
    }

    const handleMessage = (message: any, type: any = 'FAILED') => {
        setMessage(message);
        setMessageType(type);
    }
    return (
        <KeyboardAvoidingWrapper>
            <Login.Container>
                <Login.InnerContainer>
                    <Logo.LogoContainer>
                        <Logo.PageLogo resizeMode='contain' source={require('../../../assets/images/logo.png')} />
                        <Logo.PageName resizeMode='contain' source={require('../../../assets/images/logoName.png')} />
                        <Logo.PageSlogan resizeMode='contain' source={require('../../../assets/images/logoSlogan.png')} />
                    </Logo.LogoContainer>

                    <Formik initialValues={{ email: "", password: "" }}
                        onSubmit={(values, { setSubmitting }) => {
                            if (values.email == '' || values.password == '') {
                                handleMessage('Please, fill all the fields');
                                setSubmitting(false);
                            } else {
                                handleSignIn(values, setSubmitting)
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
                            <Login.ExtraView>
                                <Login.ExtraText>
                                    <Text>Dont't have an account?</Text>
                                </Login.ExtraText>
                                <Login.TextLink onPress={() => navigation.navigate('SignUp')}><Text>Sign Up</Text></Login.TextLink>
                            </Login.ExtraView>
                        </Login.StyledFormArea>
                        )}
                    </Formik>

                    {/* <View style={styles.container}>
                        <Button title="Sign in" onPress={handleSignIn} />
                    </View> */}
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
export default SignIn;