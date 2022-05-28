import React from 'react';
import { KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';

type Props = {
    children: React.ReactNode;
    //children?: JSX.Element | JSX.Element[];
}
const KeyboardAvoidingWrapper = ({ children }: Props) => {
    return (
        <KeyboardAvoidingView style={{ flex: 1 }}>
            <ScrollView>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    {children}
                </TouchableWithoutFeedback>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
export default KeyboardAvoidingWrapper