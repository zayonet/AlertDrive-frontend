import * as React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import * as History from "./styles"
import { useAuth } from '../../contexts/auth';
//form
import { Formik } from 'formik';
import { Picker } from '@react-native-community/picker'
//icons
import { Octicons } from '@expo/vector-icons';
//Themes
import theme from "../../styles/index";
const { brandPrimary, secondary, primary, tertiary } = theme.light.colors;
import { showMessage } from "react-native-flash-message";

//api server 
import api from '../../service/api';


interface IHistory {
    id: string;
    accident_before: string;
    is_taking_medicine_now: string;
    is_sick_now: string;
    description: string;
    user_id: string | number | undefined;
}
const yesOrNo = [
    { name: "", id: 1 },
    { name: "yes", id: 2 },
    { name: "no", id: 3 }
];
const UpdateUserHistory: React.FC = ({ navigation }: any) => {
    const [userHistory, setUserHistory] = React.useState<IHistory[]>([]);

    const { user, token } = useAuth();
    const Authorization = `${token}`;

    async function getUserHistoryAsync() {
        const response = await api.get(`/HistoryUser/user/${user?.id}`, { headers: { Authorization } })

        const historyUser = (response.data as IHistory[]).map((item: {
            id: string;
            accident_before: string;
            is_taking_medicine_now: string;
            is_sick_now: string;
            description: string;
            user_id: string | number | undefined;
        }) => {
            return {
                id: item.id,
                user_id: item.user_id,
                accident_before: item.accident_before,
                is_taking_medicine_now: item.is_taking_medicine_now,
                is_sick_now: item.is_sick_now,
                description: item.description
            }
        })
        setUserHistory(historyUser)
    }
    React.useEffect(() => {
        getUserHistoryAsync()
        const updateNavigation = navigation.addListener('focus', () => {
            getUserHistoryAsync();
        });
        return updateNavigation;
    }, [])

    async function updateUserHistory(credentials: IHistory, historyUser_id: string) {
        const response = await api.put(`/HistoryUser/${historyUser_id}`, credentials, { headers: { Authorization } })
            .then((response) => {
                const result = response.data;
                console.log(result);
                showMessage({
                    message: "Perfeito!",
                    description: "Dados guardados com sucesso",
                    type: "success",
                });
                navigation.navigate('History');
            })
            .catch(error => {
                console.log(error)
                handleMessage("An error ocurred. Check your network and try again! Try tp login again");
                showMessage({
                    message: "Oops!",
                    description: "Ocorreu algum erro durante o registo de dados",
                    type: "danger",
                });
            })
    }
    //Feedback on login 
    const [message, setMessage] = React.useState();
    const [messageType, setMessageType] = React.useState();
    const handleMessage = (message: any, type: any = 'FAILED') => {
        setMessage(message);
        setMessageType(type);
    }
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

            {
                userHistory.map((item, key) => (
                    <Formik
                        key={item?.id}
                        initialValues={{
                            id: item?.id,
                            user_id: user?.id,
                            accident_before: item?.accident_before,
                            is_taking_medicine_now: item?.is_taking_medicine_now,
                            is_sick_now: item?.is_sick_now,
                            description: item?.description
                        }}

                        onSubmit={(values, { setSubmitting }) => {
                            values = { ...values }
                            if (
                                values.accident_before == '' ||
                                values.is_taking_medicine_now == '' ||
                                values.is_sick_now == '') {
                                handleMessage('Please, fill all the fields');
                                setSubmitting(false);
                            } else {
                                updateUserHistory(values, item.id)
                            }
                        }
                        }
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) =>
                        (<History.StyledFormArea>
                            <Text style={styles.pickerLabelStyle}>
                                Did you accidented before?
                            </Text>
                            <Picker
                                enabled={true}
                                mode="dropdown"
                                placeholderTextColor={tertiary}
                                onValueChange={handleChange('accident_before')}
                                onBlur={handleBlur('accident_before')}
                                selectedValue={values.accident_before}
                                pickerStyleType={styles.pickerSelectStyle}
                                style={styles.pickerSelectStyle}
                            >
                                {yesOrNo.map((item) => {
                                    return (
                                        <Picker.Item
                                            label={item.name.toString()}
                                            value={item.name.toString()}
                                            key={item.id.toString()}
                                        />
                                    )
                                })}
                            </Picker>
                            <Text style={styles.pickerLabelStyle}>
                                Are you taking medicine now?
                            </Text>
                            <Picker
                                enabled={true}
                                mode="dropdown"
                                placeholderTextColor={tertiary}
                                onValueChange={handleChange('is_taking_medicine_now')}
                                onBlur={handleBlur('is_taking_medicine_now')}
                                selectedValue={values.is_taking_medicine_now}
                                pickerStyleType={styles.pickerSelectStyle}
                                style={styles.pickerSelectStyle}
                            >
                                {yesOrNo.map((item) => {
                                    return (
                                        <Picker.Item
                                            label={item.name.toString()}
                                            value={item.name.toString()}
                                            key={item.id.toString()}
                                        />
                                    )
                                })}
                            </Picker>
                            <Text style={styles.pickerLabelStyle}>
                                Are you filling bad now?
                            </Text>
                            <Picker
                                enabled={true}
                                mode="dropdown"
                                placeholderTextColor={tertiary}
                                onValueChange={handleChange('is_sick_now')}
                                onBlur={handleBlur('is_sick_now')}
                                selectedValue={values.is_sick_now}
                                pickerStyleType={styles.pickerSelectStyle}
                                style={styles.pickerSelectStyle}
                            >
                                {yesOrNo.map((item) => {
                                    return (
                                        <Picker.Item
                                            label={item.name.toString()}
                                            value={item.name.toString()}
                                            key={item.id.toString()}
                                        />
                                    )
                                })}
                            </Picker>
                            <MyTextInput
                                label="Description:"
                                icon="book"
                                placeholder="Ex.: I used to take some medicine because of my accident"
                                placeholderTextColor={tertiary}
                                onChangeText={handleChange('description')}
                                onBlur={handleBlur('description')}
                                value={values.description} />
                            <History.MessageBox type={messageType}>{message}</History.MessageBox>
                            {!isSubmitting &&
                                <History.StyledBotton onPress={() => handleSubmit()}>
                                    <History.BottonText>
                                        Save
                                    </History.BottonText>
                                </History.StyledBotton>}
                            {isSubmitting &&
                                <History.StyledBotton disabled={true}>
                                    <ActivityIndicator size="large" color={primary}>
                                    </ActivityIndicator>
                                </History.StyledBotton>}
                        </History.StyledFormArea>
                        )}
                    </Formik>

                ))
            }
        </View>
    );
}

const MyTextInput = ({ label, icon, ...props }) => {
    return (<View>
        <History.LeftIcon><Text>
            <Octicons name={icon} size={30} color={primary} /></Text>
        </History.LeftIcon>
        <History.StyledInputLabel><Text>{label}</Text></History.StyledInputLabel>
        <History.StyledTextInput {...props} />
    </View>);
};

const styles = StyleSheet.create({
    pickerSelectStyle: {
        backgroundColor: secondary,
        Padding: 10,
        paddingLeft: 50,
        paddingRight: 5,
        borderRadius: 5,
        fontSize: 16,
        height: 49,
        marginVertical: 30,
        marginBottom: 1,
        color: primary
    },
    pickerLabelStyle: {
        color: brandPrimary,
        fontSize: 13,
        textAlign: 'left',
        marginBottom: -25
    }
})
export default UpdateUserHistory 