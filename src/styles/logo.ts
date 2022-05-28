import styled from 'styled-components';
import { View, Text, Image, Button, TextInput, TouchableOpacityBase, TouchableOpacity } from 'react-native';
import tema from "./index"


//LogoContainer
export const LogoContainer = styled(View)`
    margin: 40px 0 0 0;
    flex: 1;
    width: 100%;
    align-items:center;
`
//Page logo 
export const PageLogo = styled(Image)`
    width: 80px;
    height: 60px;
`
//Page Name 
export const PageName = styled(Image)`
    width: 150px;
`
//Page Slogan 
export const PageSlogan = styled(Image)`
    width: 90px;
`

//Avatar 
export const Avatar = styled(Image)`
    width:100px; 
    height: 100px;
    margin: auto; 
    border-radius: 50px; 
    border-width: 2px; 
    border-color:${tema.light.colors.primary};
    margin-bottom: 10px;
    margin-top: 10px;
`;

//Welcome image
export const WelcomeImage = styled(Image)`
    min-width: 100%;
    height: 50%;
`