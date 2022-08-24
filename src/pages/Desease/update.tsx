import * as React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, TextInput } from "react-native";
import * as Desease from "./styles"
import { useAuth } from '../../contexts/auth';
//form
import { Formik } from 'formik';
import { Picker } from '@react-native-community/picker'
//icons
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';
//Themes
import theme from "../../styles/index";
const { secondary, brandPrimary, primary, tertiary } = theme.light.colors;
import { showMessage } from "react-native-flash-message";

//api server 
import api from '../../service/api';

interface IDesease {
    id: string;
    desease_name: string;
    desease_type: string;
    description: string;
    user_id: string | number | undefined;
    body_user_id: string;
}
const deseases = [
    { name: "", id: 1 },
    { name: "Ataque isquêmico transitório", id: 2 },
    { name: "Síncope", id: 3 },
    { name: "Esclerose múltipla", id: 4 },
    { name: "Alzheimer", id: 5 },
    { name: "Epilepsia", id: 6 },
    { name: "Doença cerebrovascular", id: 7 },
    { name: "AVC", id: 8 },
    { name: "Demência", id: 9 },
    { name: "Doença de Ménière, tontura, distúrbios do labirinto", id: 10 }
];
const deseaseType = [
    { name: "", id: 1 },
    { name: "Chronic disease", id: 2 },
    { name: "non-chronic disease", id: 3 },
    { name: "temporary illness", id: 4 }
];
const CreateDesease: React.FC = ({ navigation }: any) => {
    const { signOut, user, token } = useAuth();
    const [desease, setDesease] = React.useState<IDesease[]>([]);
    //Feedback on login 
    const [message, setMessage] = React.useState();
    const [messageType, setMessageType] = React.useState();
    const Authorization = `${token}`;

    async function getUserDeseaseAsync() {
        const response = await api.get(`/desease/user/${user?.id}`, { headers: { Authorization } })
        //console.log(response.data)
        const deseaseUser = (response.data as IDesease[]).map((item: {
            id: string;
            desease_name: string;
            desease_type: string;
            description: string;
            user_id: string | number | undefined;
            body_user_id: string;
        }) => {
            return {
                id: item.id,
                desease_name: item.desease_name,
                desease_type: item.desease_type,
                description: item.description,
                user_id: item.user_id,
                body_user_id: item.body_user_id
            }
        })
        setDesease(deseaseUser)
    }
    React.useEffect(() => {
        getUserDeseaseAsync()
        const updateNavigation = navigation.addListener('focus', () => {
            getUserDeseaseAsync();

        });
        return updateNavigation;
    }, [])
    async function updateUserDesease(credentials: IDesease, deseaseUser_id: string) {
        const response = await api.put(`/desease/${deseaseUser_id}`, credentials, { headers: { Authorization } })
            .then((response) => {
                const result = response.data;
                console.log(result);
                showMessage({
                    message: "Perfeito!",
                    description: "Dados guardados com sucesso",
                    type: "success",
                });
                navigation.navigate('Desease');
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
    const handleMessage = (message: any, type: any = 'FAILED') => {
        setMessage(message);
        setMessageType(type);
    }
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {
                desease.map((item, key) => (
                    <Formik
                        key={item?.id}
                        initialValues={{
                            id: item?.id,
                            user_id: user?.id,
                            desease_name: item?.desease_name,
                            desease_type: item?.desease_type,
                            description: item?.description,
                            body_user_id: item?.body_user_id,
                        }}

                        onSubmit={(values, { setSubmitting }) => {
                            values = { ...values }
                            if (
                                values.desease_name == '' ||
                                values.desease_type == '') {
                                handleMessage('Please, fill all the fields');
                                setSubmitting(false);
                            } else if (values.body_user_id == '') {
                                handleMessage('Please, You need to fill first the body user to get the Id');
                            } else {
                                updateUserDesease(values, item.id)
                            }
                        }
                        }
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) =>
                        (<Desease.StyledFormArea>
                            <Text style={styles.pickerLabelStyle}>
                                Did you accidented before?
                            </Text>
                            <Picker
                                enabled={true}
                                mode="dropdown"
                                placeholderTextColor={tertiary}
                                onValueChange={handleChange('desease_name')}
                                onBlur={handleBlur('desease_name')}
                                selectedValue={values.desease_name}
                                pickerStyleType={styles.pickerSelectStyle}
                                style={styles.pickerSelectStyle}
                            >
                                {deseases.map((item) => {
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
                                onValueChange={handleChange('desease_type')}
                                onBlur={handleBlur('desease_type')}
                                selectedValue={values.desease_type}
                                pickerStyleType={styles.pickerSelectStyle}
                                style={styles.pickerSelectStyle}
                            >
                                {deseaseType.map((item) => {
                                    return (
                                        <Picker.Item
                                            label={item.name.toString()}
                                            value={item.name.toString()}
                                            key={item.id.toString()}
                                        />
                                    )
                                })}
                            </Picker>
                            <Text style={{ color: brandPrimary, fontSize: 14 }}>
                                Description:
                            </Text>
                            <TextInput
                                multiline={true}
                                numberOfLines={4}
                                placeholderTextColor={tertiary}
                                placeholder="Ex.: I used to take some medicine because of my accident"
                                style={{
                                    height: 170,
                                    backgroundColor: secondary,
                                    color: primary
                                }}
                                onChangeText={handleChange('description')}
                                onBlur={handleBlur('description')}
                                value={values.description}
                            />

                            <Desease.MessageBox type={messageType}>{message}</Desease.MessageBox>
                            {!isSubmitting &&
                                <Desease.StyledBotton onPress={() => handleSubmit()}>
                                    <Desease.BottonText>
                                        Save
                                    </Desease.BottonText>
                                </Desease.StyledBotton>}
                            {isSubmitting &&
                                <Desease.StyledBotton disabled={true}>
                                    <ActivityIndicator size="large" color={primary}>
                                    </ActivityIndicator>
                                </Desease.StyledBotton>}
                        </Desease.StyledFormArea>
                        )}
                    </Formik>
                ))
            }
        </View>
    );
}


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
        marginBottom: 8,
        color: primary
    },
    pickerLabelStyle: {
        color: brandPrimary,
        fontSize: 14,
        textAlign: 'left',
        marginBottom: -25
    }
})
export default CreateDesease 