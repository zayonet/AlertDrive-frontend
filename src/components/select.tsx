import { View, TouchableOpacity, StyleSheet, Text, Dimensions } from 'react-native';
import React, { useState } from 'react';
//icons
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';

//Themes
import theme from "../styles/index";
const { brandSecondary, brandPrimary, primary, tertiary } = theme.light.colors;
const { width } = Dimensions.get('window');

const Select: React.FC = ({ options, onChangeSelect, text }: any) => {
    const [txt, setTxt] = useState(text);
    return (
        <>
            <TouchableOpacity style={styles.Container}>
                <Text style={styles.txt} numberOfLines={1}>{txt}</Text>
                <Octicons name="chevron-down" size={30} color={primary} />
            </TouchableOpacity>
        </>
    );
}

const styles = StyleSheet.create({
    Container: {
        height: 50,
        flex: 1,
        backgroundColor: tertiary,
        paddingLeft: 12,
        marginHorizontal: 20,
        borderRadius: 8,
        borderColor: '#ccc',
        fontSize: 18,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'

    },
    txt: {
        color: brandPrimary,
        fontSize: 16,
        width: width - 90
    }
})
export default Select;