import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';



import * as welcomes from "./styles"
import * as Logo from "../../styles/logo"


const Welcome: React.FC = ({ navigation }: any) => {
    return (
        <>
            <StatusBar style="light" />
            <welcomes.InnerContainer>
                <Logo.WelcomeImage resizeMode='contain' source={require('../../../assets/images/bg3.jpg')} />
                <welcomes.WelcomeContainer>
                    <welcomes.PageTitle welcome={true}>Welcome! Buddy</welcomes.PageTitle>
                    <welcomes.SubTitle welcome={true}>Seja Bem-vindo</welcomes.SubTitle>
                    <welcomes.StyledFormArea>
                        <welcomes.Line />
                        <Logo.Avatar resizeMode='contain' source={require('../../../assets/images/logo.png')} />
                        <welcomes.StyledBotton onPress={() => navigation.navigate('SignIn')}>
                            <welcomes.BottonText>
                                Login
                            </welcomes.BottonText>
                        </welcomes.StyledBotton>
                    </welcomes.StyledFormArea>
                </welcomes.WelcomeContainer>
            </welcomes.InnerContainer>
        </>
    )
};

export default Welcome;


