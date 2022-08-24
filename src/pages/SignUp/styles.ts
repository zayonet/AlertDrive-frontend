import { View, Text, Image, Button, TextInput, TouchableOpacityBase, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import tema from "../../styles"

//container
export const Container = styled.View`
    flex: 1;
    padding: 25px;
    background: ${tema.light.colors.primary}
`

//innerContainer 
export const InnerContainer = styled.View`
    flex: 1;
    width: 100%;
  align-items: center;
  justify-content: center;
`

// Page title 
export const PageTitle = styled.Text`
    font-size: 30px;
    text-align:center; 
    font-weight:bold;
    color: ${tema.light.colors.primary};
    padding:10px;
`

export const SubTitle = styled.Text`
    font-size: 18px;
    margin-top: 20px;
    letter-spacing: 1px;
    color: ${tema.light.colors.brandPrimary};
`

export const StyledFormArea = styled.View`
    margin-top: 20px;
    width: 90%;
`
export const StyledTextInput = styled.TextInput`
    background: ${tema.light.colors.secondary};
    padding: 15px;
    padding-left: 55px;
    padding-right: 55px;
    border-radius: 5px;
    font-size:16px;
    height: 60px;
    margin-vertical:30px;
    margin-bottom:10px;
    color: ${tema.light.colors.primary};
`;

export const StyledInputLabel = styled.Text`
    color: ${tema.light.colors.brandPrimary};
    font-size: 13px;
    text-align:left;
    margin-bottom:-25px;
`;
export const LeftIcon = styled.View`
    left:15px;
    top:38px;
    position:absolute;
    z-index: 1;
`;

export const RightIcon = styled(TouchableOpacity)`
    right:15px;
    top:38px;
    position:absolute;
    z-index: 1;
`;

export const StyledBotton = styled(TouchableOpacity)`
    padding:15px;
    background-color: ${tema.light.colors.brandSecondary};
    align-items: center;
    border-radius: 5px;
    margin-vertical:25px;
    height:60px;
`;

export const BottonText = styled.Text`
    color: ${tema.light.colors.primary};
    font-size: 18px;
    font-weight: bold;
`;

export const MessageBox = styled.Text`
    text-align: center;
    font-size: 13px;
    
    color: ${props => props.type === 'SUCCESS' ? tema.light.colors.green : tema.light.colors.red}


`;
export const Line = styled.View`
    height: 1px; 
    width: 100%;
    background-color: ${tema.light.colors.tertiary}; 
`;

export const ExtraView = styled.View`
    justify-content: center;
    flex-direction: row;
    align-items: center;
    padding: 10px;     
`;

export const ExtraText = styled.Text`
    justify-content: center;
    align-items: center;
    color: ${tema.light.colors.secondary};
    font-size: 15px;
`;

export const TextLink = styled(TouchableOpacity)`
    justify-content: center;
    align-items: center;
    margin: 0 5px;
`;
export const TextLinkContent = styled.Text`
    color: ${tema.light.colors.brandSecondary};
    font-size: 15px;
`;