import * as React from 'react';
import { View, Text, ActivityIndicator, TextInput, StyleSheet } from "react-native";
import * as ativity from "./styles"
import { useAuth } from '../../contexts/auth';
//form
import { Formik } from 'formik';
import { Picker } from '@react-native-community/picker'
//icons
import { Octicons } from '@expo/vector-icons';
//Themes
import theme from "../../styles/index";
const { secondary, brandPrimary, primary, tertiary } = theme.light.colors;
import { showMessage } from "react-native-flash-message";

//api server 
import api from '../../service/api';


interface activity {
    whitch_food_ate: string;
    whitch_food_drank: string;
    smoked: string;
    description: string;
    user_id: string;
}
interface IActivity {
    id: string;
    whitch_food_ate: string;
    whitch_food_drank: string;
    smoked: string;
    description: string;
    user_id: string;
    created_at: string;
}
const yesOrNo = [
    { name: "", id: 1 },
    { name: "Yes", id: 2 },
    { name: "No", id: 3 }
];

const CreateActivity: React.FC = ({ navigation }: any) => {
    const { signOut, user, token } = useAuth();
    //Feedback on login 
    const [message, setMessage] = React.useState();
    const [messageType, setMessageType] = React.useState();
    const Authorization = `${token}`;

    async function handleActivity(credentials: activity, setSubmitting: any) {
        //handleMessage(null);
        console.log(credentials);
        const response = await api.post('/activity', credentials)
            .then((response) => {
                const result = response.data;
                if (result) {
                    navigation.navigate('Job');
                }
                setSubmitting(false);
                showMessage({
                    message: "Perfeito!",
                    description: "Dados guardados com sucesso",
                    type: "success",
                });
                navigation.navigate('Activity');
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

            <Formik
                initialValues={{
                    user_id: user?.id,
                    whitch_food_ate: "",
                    whitch_food_drank: "",
                    smoked: "",
                    description: ""
                }}

                onSubmit={(values, { setSubmitting }) => {
                    values = { ...values }
                    if (
                        values.whitch_food_ate == '' ||
                        values.whitch_food_drank == '' ||
                        values.smoked == '') {
                        handleMessage('Please, fill all the fields');
                        setSubmitting(false);
                    } else {
                        handleActivity(values, setSubmitting)
                    }
                    //console.log(values); navigation.navigate('home')
                }
                }
            >
                {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) =>
                (<ativity.StyledFormArea>
                    <Text style={styles.pickerLabelStyle}>
                        Which food did you eat now?
                    </Text>
                    <Picker
                        enabled={true}
                        mode="dropdown"
                        placeholderTextColor={tertiary}
                        onValueChange={handleChange('whitch_food_ate')}
                        onBlur={handleBlur('whitch_food_ate')}
                        selectedValue={values.whitch_food_ate}
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
                        Did you drink anything? {values.body_user_id}
                    </Text>
                    <Picker
                        enabled={true}
                        mode="dropdown"
                        placeholderTextColor={tertiary}
                        onValueChange={handleChange('whitch_food_drank')}
                        onBlur={handleBlur('whitch_food_drank')}
                        selectedValue={values.whitch_food_drank}
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
                        Did you smoke?
                    </Text>
                    <Picker
                        enabled={true}
                        mode="dropdown"
                        onValueChange={handleChange('smoked')}
                        onBlur={handleBlur('smoked')}
                        selectedValue={values.smoked}
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
                    <Text style={{ color: brandPrimary, fontSize: 14 }}>
                        Some description:
                    </Text>
                    <TextInput
                        multiline={true}
                        numberOfLines={4}
                        placeholderTextColor={tertiary}
                        placeholder="Ex.: I used to drink after eat"
                        style={{
                            height: 170,
                            backgroundColor: secondary,
                            color: primary
                        }}
                        onChangeText={handleChange('description')}
                        onBlur={handleBlur('description')}
                        value={values.description}
                    />
                    <ativity.MessageBox type={messageType}>{message}</ativity.MessageBox>
                    {!isSubmitting &&
                        <ativity.StyledBotton onPress={() => handleSubmit()}>
                            <ativity.BottonText>
                                Save
                            </ativity.BottonText>
                        </ativity.StyledBotton>}
                    {isSubmitting &&
                        <ativity.StyledBotton disabled={true}>
                            <ActivityIndicator size="large" color={primary}>
                            </ActivityIndicator>
                        </ativity.StyledBotton>}
                </ativity.StyledFormArea>
                )}
            </Formik>
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
export default CreateActivity 