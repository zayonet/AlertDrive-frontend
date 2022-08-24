/* import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
//form
import { Formik } from 'formik';
//icons
import { Octicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';

const { primary, darkLight } = Colors;

import {
    Container,
    InnerContainer,
    PageLogo,
    PageTitle,
    PageName,
    PageSlogan,
    SubTitle,
    LogoContainer,
    StyledFormArea,
    StyledTextInput,
    StyledInputLabel,
    LeftIcon,
    RightIcon,
    StyledBotton,
    StyledBottonText,
    Colors
} from '../../components/styles';


const Login = () => {
    return (
        <Container>
            <StatusBar style="dark" />
            <InnerContainer>
                <LogoContainer>
                    <PageLogo resizeMode='contain' source={require('../../assets/images/logo.png')} />
                    <PageName resizeMode='contain' source={require('../../assets/images/logoName.png')} />
                    <PageSlogan resizeMode='contain' source={require('../../assets/images/logoSlogan.png')} />
                    <SubTitle>Account Login</SubTitle>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        onSubmit={(values) => {
                            console.log('ok' + values)
                        }}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values }) =>
                        (<StyledFormArea>
                        </StyledFormArea>
                        )}
                    </Formik>
                </LogoContainer>
            </InnerContainer>
        </Container>
    )
};

const MyTextInput = ({ label, icon, ...props }) => {
    return (
        <View>
            <LeftIcon> <Octicons name={icon} size={30} color={primary} /></LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props} />
        </View>
    )
};


export default Login; */