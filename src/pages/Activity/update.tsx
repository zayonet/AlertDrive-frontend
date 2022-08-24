import * as React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, TextInput } from "react-native";
import * as ativity from "./styles"
import { useAuth } from '../../contexts/auth';
//form
import { Formik } from 'formik';
import { Picker } from '@react-native-community/picker'
//Themes
import theme from "../../styles/index";
const { brandPrimary, secondary, primary, tertiary } = theme.light.colors;
import { showMessage } from "react-native-flash-message";

//api server 
import api from '../../service/api';
import { object } from 'yup';

interface activity {
    whitch_food_ate: string;
    whitch_food_drank: string;
    smoked: string;
    description: string;
    user_id: string | number | undefined;
}
interface IActivity {
    id: string;
    whitch_food_ate: string;
    whitch_food_drank: string;
    smoked: string;
    description: string;
    user_id: string | number | undefined;
    created_at: string;
}
const yesOrNo = [
    { name: "", id: 1 },
    { name: "Yes", id: 2 },
    { name: "No", id: 3 }
];
const UpdateAtivity: React.FC = ({ route, navigation }: any) => {
    const [userActivity, setUserActivity] = React.useState<IActivity[]>([]);

    const { user, token } = useAuth();
    const Authorization = `${token}`;
    const { itemId, userId, itemfood,
        itemDrink,
        itemSmoked,
        itemDescription } = route.params;
    /* 
        async function getUserActivityAsync(itemId: any) {
            const response = await api.get(`/activity/${itemId}`, { headers: { Authorization } })
    
            //console.log(response.data)
            const activityUser = (response.data as IActivity[]).map((item: {
                id: string;
                whitch_food_ate: string;
                whitch_food_drank: string;
                smoked: string;
                description: string;
                user_id: string | number | undefined;
                created_at: string;
            }) => {
                return {
                    id: item.id,
                    user_id: item.user_id,
                    whitch_food_ate: item.whitch_food_ate,
                    whitch_food_drank: item.whitch_food_drank,
                    smoked: item.smoked,
                    description: item.description,
                    created_at: item.created_at
                }
            })
            console.log(activityUser)
            setUserActivity(response.data)
        }
        const getUserBody = (itemId: any) => {
            api.get(`/activity/${itemId}`, { headers: { Authorization } })
                .then(function (response) {
                    const result = response.data;
                    alert(response.data);
                    setUserActivity(result.data);
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
        React.useEffect(() => {
            if (route.params?.itemId) {
                //getUserActivityAsync(route.params?.itemId)
                getUserActivityAsync(route.params?.itemId)
                console.log(route.params?.itemId)
                alert(route.params?.itemId) 
            }
        }, [route.params?.itemId]) */

    async function updateUserActivity(credentials: activity, activity_id: string) {
        handleMessage(null);
        console.log(credentials);
        const response = await api.put(`/activity/${activity_id}`, credentials, { headers: { Authorization } })
            .then((response) => {
                const result = response.data;
                console.log(result);
                showMessage({
                    message: "Perfeito!",
                    description: "Dados guardados com sucesso",
                    type: "success",
                });
                navigation.navigate('Activity');
            })
            .catch(error => {
                console.log(error)
                handleMessage("An error ocurred. Check your network and try again! Try to login again");
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
            {/* {userActivity?.map((userActivity, index) => { */}
            <Formik
                /* key={index} */
                initialValues={{
                    id: itemId,
                    user_id: userId,
                    whitch_food_ate: itemfood,
                    whitch_food_drank: itemDrink,
                    smoked: itemSmoked,
                    description: itemDescription
                }}

                onSubmit={(values) => {
                    values = { ...values }
                    if (
                        values.whitch_food_ate == '' ||
                        values.whitch_food_drank == '' ||
                        values.smoked == '') {
                        handleMessage('Please, fill all the fields');
                    } else {
                        updateUserActivity(values, itemId)
                    }
                    //console.log(values); navigation.navigate('home')
                }
                }
            >
                {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) =>
                (<ativity.StyledFormArea>
                    <Text style={styles.pickerLabelStyle}>
                        Did you eat 20 ago?
                    </Text>
                    <Text>{userActivity}</Text>
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
                        Did you drink anything?
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

            {/*  })} */}
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
export default UpdateAtivity 