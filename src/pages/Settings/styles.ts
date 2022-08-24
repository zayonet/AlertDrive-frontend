
import styled, { css } from 'styled-components/native';
import { View, Text, Image, Button, TextInput, TouchableOpacityBase, TouchableOpacity } from 'react-native';
import tema from "../../styles"
import theme from "../../styles/index";
const { brandSecondary, brandSecondary1, brandPrimary, tertiary } = theme.light.colors;
//Container
export const Container = styled(View)`
        flex: 1;
        background: ${tema.light.colors.primary};
        padding: 25px;
`;
//innerContainer 
export const InnerContainer = styled(View)`
    flex: 1;
    width: 100%;
`
//Card container
export const CardContainer = styled.View`
    justify-content: flex-start;
     flex-wrap: wrap;
    flex-direction: row;
    align-items: center;
    padding: 10px;  
`;

//Card
export const Card = styled.TouchableOpacity`
    background-color: ${tertiary};
    width: 80px;
    height: 80px;
    border-radius: 8px;
    justify-content: center;
    align-items: center;
    margin: 10px;
`;
//Card Button 
export const CardButton = styled.Text`
    background-color: ${brandSecondary};
    text-align:center;
    font-weight:bold;
    padding:10px;
`;

// Page title 
export const PageTitle = styled(Text)`
        margin-top: 20px;
        font-size: 18px;
        text-align:center; 
        color: ${tema.dark.colors.secondary};
`;

export const RightIcon = styled(TouchableOpacity)`
    width:38px;
    height:38px;
`;
