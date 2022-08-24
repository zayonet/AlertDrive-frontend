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

interface IBody {

    id: string;
    weigh: string;
    heights: string;
    blood_type: string;
}

interface IDesease {
    desease_name: string;
    desease_type: string;
    description: string;
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
    const [userBody, setUserBody] = React.useState<IBody[]>([]);
    //Feedback on login 
    const [message, setMessage] = React.useState();
    const [messageType, setMessageType] = React.useState();
    const Authorization = `${token}`;

    async function getUserBodyAsync() {
        const response = await api.get(`/body_user/user/${user?.id}`, { headers: { Authorization } })
        //console.log(response.data)
        const bodyUser = (response.data as IBody[]).map((item: {
            id: string;
            weigh: string;
            heights: string;
            blood_type: string;
        }) => {
            return {
                id: item.id,
                weigh: item.weigh,
                heights: item.heights,
                blood_type: item.blood_type,
            }
        })
        /* bodyUser.map((item: {
            id: string;
        }) => {
            item.id
            setUserBody(item.id);
        }) */
        setUserBody(bodyUser)
    }

    React.useEffect(() => {
        getUserBodyAsync()
        getUserBody()
    }, [])
    const getUserBody = () => {
        api.get(`/body_user/user/${user?.id}`, { headers: { Authorization } })
            .then(function (response) {
                const result = response.data;
                //alert(JSON.stringify(result));
                /* result.map((item: {
                    id: string;
                }) => {
                    item.id
                    setUserBody(item.id);
                }) */
                //setUserBody(result);
            })
            .catch(err => {
                if (err.response) {
                    handleMessage("An error ocurred.", JSON.stringify(err.response));
                    // client received an error response (5xx, 4xx)
                } else if (err.request) {
                    handleMessage("An error ocurred.", JSON.stringify(err.response));
                    // client never received a response, or request never left 
                } else {
                    alert(JSON.stringify(err.message))
                    handleMessage("An error ocurred.", JSON.stringify(err.response));
                    // anything else 
                }
            })
            .finally(function () {
                // always executed
                showMessage({
                    message: "Perfeito!",
                    description: "Informações carregadas",
                    type: "success",
                });
            });
    };
    async function handleUserDeseaseUser(credentials: IDesease, setSubmitting: any) {
        //handleMessage(null);
        console.log(credentials);
        const response = await api.post('/desease', credentials)
            .then((response) => {
                const result = response.data;
                if (result) {
                    navigation.navigate('Desease');
                }
                setSubmitting(false);
                showMessage({
                    message: "Perfeito!",
                    description: "Dados guardados com sucesso",
                    type: "success",
                });
                navigation.navigate('Desease');
            })
            .catch(error => {
                console.log(error)
                setSubmitting(false);
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
                userBody.map((item, key) => (
                    <Formik
                        key={key}
                        initialValues={{
                            user_id: user?.id,
                            desease_name: "",
                            desease_type: "",
                            description: "",
                            body_user_id: item?.id,
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
                                handleUserDeseaseUser(values, setSubmitting)
                            }
                        }
                        }
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) =>
                        (<Desease.StyledFormArea>
                            <Text style={styles.pickerLabelStyle}>
                                Did you accidented before? {values.body_user_id}
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
                            {/* <MyTextInput
                        label="Description:"
                        icon="book"
                        placeholder="Ex.: I used to take some medicine because of my accident"
                        placeholderTextColor={tertiary}
                        onChangeText={handleChange('description')}
                        onBlur={handleBlur('description')}
                        value={values.description} /> */}

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

const MyTextInput = ({ label, icon, ...props }) => {
    return (<View>
        <Desease.LeftIcon><Text>
            <Octicons name={icon} size={30} color={primary} /></Text>
        </Desease.LeftIcon>
        <Desease.StyledInputLabel><Text>{label}</Text></Desease.StyledInputLabel>
        <Desease.StyledTextInput {...props} />
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