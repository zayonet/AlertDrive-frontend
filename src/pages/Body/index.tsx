import * as React from 'react';
<<<<<<< HEAD
import { View, Text, TouchableOpacity, ActivityIndicator, Alert, TextInput, StyleSheet } from "react-native";
import * as Body from "./styles"
import { useAuth } from '../../contexts/auth';
=======
import { View, Text, TouchableOpacity, ActivityIndicator, Alert, TextInput, Title } from "react-native";
import * as Body from "./styles"
import { useAuth } from '../../contexts/auth';
//form
import { Field, Formik } from 'formik';
import { useFormik } from 'formik';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-community/picker'
>>>>>>> a8e08eb49879e6efcbe0796cf0e2bf99a825a423
//icons
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';
//Themes
import theme from "../../styles/index";
<<<<<<< HEAD
const { brandPrimary, secondary, primary, tertiary } = theme.light.colors;

//api server 
import api from '../../service/api';
import { Avatar, Badge, Icon, withBadge, Card, ListItem, Divider } from 'react-native-elements'
import { color } from 'react-native-elements/dist/helpers';
=======
import Select from '../../components/select';
const { brandSecondary, brandSecondary2, primary, tertiary } = theme.light.colors;

//api server 
import api from '../../service/api';
import axios from 'axios';

>>>>>>> a8e08eb49879e6efcbe0796cf0e2bf99a825a423
const glicemia_types = [
    { name: "Hipoclicémia", id: 1 },
    { name: "Normal", id: 2 },
    { name: "Pré-Diabetes", id: 3 },
    { name: "Diabetes", id: 4 },
];

const blood_types = [
    { name: "AB+", id: 1 },
    { name: "AB-", id: 2 },
    { name: "A+", id: 3 },
    { name: "A-", id: 4 },
    { name: "B+", id: 5 },
    { name: "B-", id: 6 },
    { name: "O+", id: 7 },
    { name: "O-", id: 8 }
];

interface body {
    weigh: string;
    heights: string;
    blood_type: string;
    body_pressure_max: string;
    body_pressure_min: string;
    glicemia: string;
}
<<<<<<< HEAD
interface IBody {
    id: string;
    weigh: string;
    heights: string;
    blood_type: string;
    body_pressure_max: string;
    body_pressure_min: string;
    glicemia: string;
    user_id: string;
    created_at: string;
}
const BodyUser: React.FC = ({ navigation }: any) => {
    const [userBody, setUserBody] = React.useState<IBody[]>([]);

    const { user, token } = useAuth();
    const Authorization = `${token}`;

    async function getUserBodyAsync() {
        const response = await api.get(`/body_user/user/${user?.id}`, { headers: { Authorization } })
        //console.log(response.data)
        const bodyUser = (response.data as IBody[]).map((item: {
            id: string;
            weigh: string;
            heights: string;
            blood_type: string;
            body_pressure_max: string;
            body_pressure_min: string;
            glicemia: string;
            user_id: string;
            created_at: string;
        }) => {
            return {
                id: item.id,
                user_id: item.user_id,
                weigh: item.weigh,
                heights: item.heights,
                blood_type: item.blood_type,
                body_pressure_max: item.body_pressure_max,
                body_pressure_min: item.body_pressure_min,
                glicemia: item.glicemia,
                created_at: item.created_at
            }
        })
        console.log(bodyUser)
        /* if (typeof myVar !== 'undefined') {
            // myVar is defined
        } */
        setUserBody(bodyUser)
    }
    React.useEffect(() => {
        getUserBodyAsync()
        const updateNavigation = navigation.addListener('focus', () => {
            getUserBodyAsync();

        });
        return updateNavigation;
    }, [])
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>My Body</Text>

            {!userBody.length && <>
                <Text>No information was filled</Text>
                <Body.StyledBotton onPress={() => navigation.navigate('CreateUserBody')}>
                    <Body.BottonText>
                        Click to fill information
                    </Body.BottonText>
                </Body.StyledBotton>
            </>}
            {userBody &&
                userBody.map((item) => (
                    <Card key={item.id}>
                        <View style={styles.row}>
                            <Text>Peso:</Text>
                            <Badge value={<Text style={styles.badgeStyleText}>{item?.weigh}</Text>} />
                        </View>

                        <View style={styles.row}>
                            <Text>Altura:</Text>
                            <Badge value={<Text style={styles.badgeStyleText}>{item?.heights}</Text>} />
                        </View>

                        <View style={styles.row}>
                            <Text>Blood Type:</Text>
                            <Badge value={<Text style={styles.badgeStyleText}>{item?.blood_type}</Text>} />
                        </View>
                        <View style={styles.row}>
                            <Text>Miximum Pressure:</Text>
                            <Badge value={<Text style={styles.badgeStyleText}>{item?.body_pressure_max}</Text>} />
                        </View>
                        <View style={styles.row}>
                            <Text>Minimum Pressure:</Text>
                            <Badge value={<Text style={styles.badgeStyleText}>{item?.body_pressure_min}</Text>} />
                        </View>
                        <View style={styles.row}>
                            <Text>Glicemia:</Text>
                            <Badge value={<Text style={styles.badgeStyleText}>{item?.glicemia}</Text>} />
                        </View>
                        <Divider style={{ backgroundColor: brandPrimary }} />
                        <Body.StyledBotton onPress={() => navigation.navigate('UpdateUserBody')}>
                            <Body.BottonText>
                                Update all information
                            </Body.BottonText>
                        </Body.StyledBotton>
                    </Card>

                ))
            }

            <Badge status="error" />
            <Badge status="primary" />
            <Badge status="warning" />
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
    },
    badgeStyleText: {
        fontSize: 13,
        Padding: 10,
        paddingLeft: 10,
        paddingRight: 15,
        color: tertiary
    },
    /* content: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }, */
    row: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: 'space-between',
        marginBottom: 10

    },
    columnSize: {
        width: 170,
    },
    marginRight: {
        marginRight: 10
    },
})
=======

const BodyUser: React.FC = ({ navigation }: any) => {
    const [hidePassword, setHidePassword] = React.useState(true);
    const [show, setShow] = React.useState(false);

    const { signOut, user } = useAuth();



    //Feedback on login 
    const [message, setMessage] = React.useState();
    const [messageType, setMessageType] = React.useState();
    //const [isSubmitting, setSubmitting] = useState();

    async function handleUserBody(credentials: body, setSubmitting: any) {
        //handleMessage(null);
        console.log(credentials);
        const response = await api.post('/body_user', credentials)
            .then((response) => {
                const result = response.data;
                if (result) {
                    navigation.navigate('Body');
                }
                setSubmitting(false);
            })
            .catch(error => {
                console.log(error)
                setSubmitting(false);
                //handleMessage("An error ocurred. Check your network and try again");
            })

        }
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

            <Formik
                initialValues={{
                    user_id:user?.id,
                    weigh:"",
                    heights: '',
                    blood_type: '',
                    body_pressure_max: '',
                    body_pressure_min: '',
                    glicemia: ''
                }}

                onSubmit={(values, { setSubmitting }) => {
                    values = { ...values }
                    if (
                        values.weigh == '' ||
                        values.heights == '' ||
                        values.blood_type == '' ||
                        values.body_pressure_max == '' ||
                        values.body_pressure_min == '' ||
                        values.glicemia == '') {
                        //handleMessage('Please, fill all the fields');
                        setSubmitting(false);
                    } else {
                        handleUserBody(values, setSubmitting)
                    }
                    //console.log(values); navigation.navigate('home')
                }
                }
            >
                {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) =>
                (<Body.StyledFormArea>
                    <MyTextInput
                        label="Introduce weigh"
                        icon="person"
                        placeholder="75"
                        placeholderTextColor={tertiary}
                        onChangeText={handleChange('weigh')}
                        onBlur={handleBlur('weight')}
                        value={values.weigh}
                        hidePassword={undefined}
                        setHidePassword={undefined} />
                    <MyTextInput
                        label="Introduce heights"
                        icon="person"
                        placeholder="1,75"
                        placeholderTextColor={tertiary}
                        onChangeText={handleChange('heights')}
                        onBlur={handleBlur('heights')}
                        value={values.heights}
                        hidePassword={undefined}
                        setHidePassword={undefined} />
                    
                    
                    <MyTextInput
                        label="Introduce body pressure max"
                        icon="pulse"
                        placeholder="200"
                        placeholderTextColor={tertiary}
                        onChangeText={handleChange('body_pressure_max')}
                        onBlur={handleBlur('body_pressure_max')}
                        value={values.body_pressure_max}
                        hidePassword={undefined}
                        setHidePassword={undefined} />
                    <MyTextInput
                        label="Introduce body pressure min"
                        icon="pulse"
                        placeholder="120"
                        placeholderTextColor={tertiary}
                        onChangeText={handleChange('body_pressure_min')}
                        onBlur={handleBlur('body_pressure_min')}
                        value={values.body_pressure_min}
                        hidePassword={undefined}
                        setHidePassword={undefined} />

                    <Text style={{ color: "#9c7c38"}}>
                        Select your blood type
                    </Text>
                    <Picker
                        enabled={true}
                        label="Introduce heights"
                        mode="dropdown"
                        placeholder="Select blood_type"
                        placeholderTextColor={tertiary}
                        onValueChange={handleChange('blood_type')}
                        onBlur={handleBlur('blood_type')}
                        selectedValue={values.blood_type}
                    >
                        {blood_types.map((item) => {
                            return (
                                <Picker.Item
                                    label={item.name.toString()}
                                    value={item.name.toString()}
                                    key={item.id.toString()}
                                />
                            )
                        })}
                    </Picker>
                    <Text style={{ color: "#9c7c38"}}>
                        Select your glicemia type
                    </Text>
                    <Picker
                        enabled={true}
                        label="Introduce glicemia"
                        mode="dropdown"
                        placeholder="Select glicemia type"
                        placeholderTextColor={tertiary}
                        onValueChange={handleChange('glicemia')}
                        onBlur={handleBlur('glicemia')}
                        selectedValue={values.blood_type}
                    >
                        {glicemia_types.map((item) => {
                            return (
                                <Picker.Item
                                    label={item.name.toString()}
                                    value={item.name.toString()}
                                    key={item.id.toString()}
                                />
                            )
                        })}
                    </Picker>
                    <Body.MessageBox type={messageType}>{message}</Body.MessageBox>
                    {!isSubmitting &&
                        <Body.StyledBotton onPress={() => handleSubmit()}>
                            <Body.BottonText>
                                Save
                            </Body.BottonText>
                        </Body.StyledBotton>}
                    {isSubmitting &&
                        <Body.StyledBotton disabled={true}>
                            <ActivityIndicator size="large" color={primary}>
                            </ActivityIndicator>
                        </Body.StyledBotton>}
                </Body.StyledFormArea>
                )}
            </Formik>
        </View>
    );
}

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, isDate, showDatePicker, ...props }) => {
    return (<View>
        <Body.LeftIcon><Text>
            <Octicons name={icon} size={30} color={primary} /></Text>
        </Body.LeftIcon>
        <Body.StyledInputLabel><Text>{label}</Text></Body.StyledInputLabel>
        {!isDate && <Body.StyledTextInput {...props} />}
        {isDate && (<TouchableOpacity onPress={showDatePicker}>
            <Body.StyledTextInput {...props} />
        </TouchableOpacity>)}
        {isPassword && (
            <Body.RightIcon onPress={() => setHidePassword(!hidePassword)}>
                <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={tertiary} />
            </Body.RightIcon>
        )}
    </View>);
};
>>>>>>> a8e08eb49879e6efcbe0796cf0e2bf99a825a423
export default BodyUser 