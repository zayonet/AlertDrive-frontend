
import styled, { css } from 'styled-components/native';
import { View, Text, Image, Button, TextInput, TouchableOpacityBase, TouchableOpacity } from 'react-native';
import tema from "../../styles"
export const Container = styled(View)`
    /* ${({ theme }) => css` */
        flex: 1;
        background: ${tema.light.colors.primary};
        padding: 25px;
    /* `} */
`;

//innerContainer 
export const InnerContainer = styled(View)`
    flex: 1;
    width: 100%;
    align-items:center;
`
// Page title 
export const PageTitle = styled(Text)`
    /* ${({ theme }) => css` */
        font-size: 30px;
        text-align:center; 
        font-weight:bold;
        color: ${tema.dark.colors.secondary};
        padding:10px;
    /* `}; */
`;


export const SubTitle = styled(Text)`
    /* ${({ theme }) => css` */
    font-size: 18px;
    margin-top: 20px;
    letter-spacing: 1px;
    color: ${tema.dark.colors.brandPrimary};
    /* `}; */
`;


export const StyledButton = styled(TouchableOpacity)`
  color: ${tema.light.colors.brandSecondary};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid ${tema.dark.colors.brandPrimary};
  border-radius: 3px;
`;

export const ButtonText = styled.Text`
    color: ${tema.light.colors.secondary};
    font-size: 18px;
    font-weight: bold;
`;
