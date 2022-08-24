import * as React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert, TextInput, StyleSheet, Title } from "react-native";
import * as profile from "./styles"
import { useAuth } from '../../contexts/auth';
//form
import { Field, Formik } from 'formik';
import { Picker } from '@react-native-community/picker'
import DateTimePicker from '@react-native-community/datetimepicker';
//icons
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';
//Themes
import theme from "../../styles/index";
import Select from '../../components/select';
import api from '../../service/api';
import axios, { AxiosError } from 'axios';
import { ThemeContext } from 'styled-components/native';
import { Base64 } from 'js-base64';
import formatDate from '../../utils/formatDate';
import { TextInputMask } from 'react-native-masked-text'
const { brandPrimary, secondary, primary, tertiary } = theme.light.colors;

const genders = [
    { name: "Male", id: 1 },
    { name: "Female", id: 2 },
    { name: "Other", id: 3 }
];
interface IUser {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    birthday: Date;
    country_id: string;
    nif: number;
    gender: string;
    phone: number;
}
interface ICountries {
    id: string;
    country_name: string;
    countrycode: string;
    phoneCode: string;
    created_at: string;
}

interface IPassword {
    password: string;
}

const Profile: React.FC = ({ navigation }: any) => {
    const [hidePassword, setHidePassword] = React.useState(true);
    const [show, setShow] = React.useState(false);
    const [date, setDate] = React.useState(new Date(2000, 0, 1));
    const { signOut, user } = useAuth();
    const [countries, setCountries] = React.useState<ICountries[]>([]);
    //Actual date of birth to be sent
    const [userDate, setUserDate] = React.useState(new Date(2000, 0, 1));
    //Feedback on login 
    const [message, setMessage] = React.useState();
    const [messageType, setMessageType] = React.useState();
    const [decodePassword, setDecodePassword] = React.useState<IPassword>();
    const decrypt_password = () => {

        const temp2 = Base64.decode(user?.password!);
        console.log(temp2)
        setDecodePassword(temp2);
    }


    const getCountryAsync = async () => {
        try {
            const response = await api.get('/country');
            /*  alert(JSON.stringify(response.data)); */

            const country = response.data.map((item: {
                id: string;
                country_name: string;
                countrycode: string;
                phoneCode: string;
                created_at: string;
            }) => {
                return {
                    id: item.id,
                    country_name: item.country_name,
                    countrycode: item.countrycode,
                    phoneCode: item.phoneCode,
                    created_at: formatDate(item.created_at)
                };
            }
            );
            setCountries(country);
        } catch (error) {
            // handle error
            alert(error);
        }
    };
    const getCountry = () => {
        api.get('/country')
            .then(function (response) {
                const result = response.data;
                alert(JSON.stringify(response.data));
            })
            .catch(err => {
                if (err.response) {
                    alert(JSON.stringify(err.response))
                    // client received an error response (5xx, 4xx)
                } else if (err.request) {
                    alert(JSON.stringify(err.request))
                    // client never received a response, or request never left 
                } else {
                    alert(JSON.stringify(err.message))
                    // anything else 
                }
            })
            .finally(function () {
                // always executed
                alert('Finally called');
            });
    };
    React.useEffect(() => {
        getCountryAsync();
    }, [getCountryAsync]);
    React.useMemo(() => {
        decrypt_password
    }, [decrypt_password])
    async function updateUser(credentials: IUser, setSubmitting: any) {
        handleMessage(null);
        console.log(credentials);
        const response = await api.put('/user/' + user?.id, credentials)
            .then((response) => {
                const result = response.data;
                setSubmitting(false);
            })
            .catch(error => {
                console.log(error)
                setSubmitting(false);
                handleMessage("An error ocurred. Check your network and try again");
            })
    }

    const onChange = (event: any, selectedDate: Date | undefined) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);
        setUserDate(currentDate);
    };

    const showDataPicker = () => {
        setShow(true);
    }
    const handleMessage = (message: any, type: any = 'FAILED') => {
        setMessage(message);
        setMessageType(type);
    }
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode='date'
                    is24Hour={true}
                    onChange={onChange}
                />
            )}
            <Formik
                initialValues={
                    {
                        name: user?.name,
                        nif: user?.nif,
                        email: user?.email,
                        password: user?.password,
                        birthday: formatDate(user?.birthday!),
                        gender: user?.gender,
                        phone: user?.phone,
                        photo: user?.photo,
                        street: user?.street,
                        house_number: user?.house_number,
                        post_code: user?.post_code,
                        city: user?.city,
                        country_id: user?.country_id,
                        aboutme: user?.aboutme,
                    }
                }
                onSubmit={(values, { setSubmitting }) => {
                    values = { ...values/* , birthday: userDate */ }
                    if (
                        values.email == '' ||
                        values.password == '' ||
                        values.birthday == '' ||
                        values.nif == 0 ||
                        values.gender == '' ||
                        values.phone == 0) {
                        handleMessage('Please, fill all the fields');
                        setSubmitting(false);
                    } else {
                        updateUser(values, setSubmitting)
                    }
                    //console.log(values); navigation.navigate('home')
                }
                }
            >
                {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) =>
                (<profile.StyledFormArea>
                    <MyTextInput
                        label="Full Name"
                        icon="person"
                        placeholder="Jose Pinto"
                        placeholderTextColor={tertiary}
                        onChangeText={handleChange('name')}
                        onBlur={handleBlur('name')}
                        value={values.name} isPassword={undefined}
                        hidePassword={undefined}
                        setHidePassword={undefined} />

                    <View style={styles.container}>
                        <View style={styles.row}>
                            <View style={[styles.box, styles.marginR]}>
                                <MyTextInput
                                    label="Email Adress"
                                    icon="mail"
                                    placeholder="jose@mail.com"
                                    placeholderTextColor={tertiary}
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                    keyboardType="email-address" isPassword={undefined}
                                    hidePassword={undefined}
                                    setHidePassword={undefined}
                                />
                            </View>
                            <View style={styles.box}>
                                <MyTextInput
                                    label="Password"
                                    icon="lock"
                                    placeholder="* * * * * *"
                                    placeholderTextColor={tertiary}
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                    secureTextEntry={hidePassword}
                                    hidePassword={hidePassword}
                                    isPassword={true}
                                    setHidePassword={setHidePassword}
                                />
                            </View>
                        </View>
                    </View>
                    <Text>{decodePassword}</Text>
                    <View style={styles.container}>
                        <View style={styles.row}>
                            <View style={[styles.box, styles.marginR]}>
                                <MyTextInput
                                    label="Date of Birth"
                                    icon="calendar"
                                    placeholder="20/10/1985"
                                    placeholderTextColor={tertiary}
                                    onChangeText={handleChange('birthday')}
                                    onBlur={handleBlur('birthday')}
                                    value={values.birthday}
                                /* value={userDate ? userDate.toDateString() : ''}
                                isDate={true}
                                editable={false}
                                showDatePicker={showDataPicker} */
                                />
                            </View>
                            <View style={styles.box}>
                                <Text style={styles.pickerLabelStyle}>Gender</Text>
                                <Picker
                                    enabled={true}
                                    mode="dropdown"
                                    placeholder="Select Gender"
                                    placeholderTextColor={tertiary}
                                    onValueChange={handleChange('gender')}
                                    onBlur={handleBlur('gender')}
                                    selectedValue={values.gender}
                                    pickerStyleType={styles.pickerSelectStyle}
                                    style={styles.pickerSelectStyle}
                                >
                                    {genders.map((item) => {
                                        return (
                                            <Picker.Item
                                                label={item.name.toString()}
                                                value={item.name.toString()}
                                                key={item.id.toString()}
                                            />
                                        )
                                    })}
                                </Picker>
                            </View>
                        </View>
                    </View>

                    <View style={styles.container}>
                        <View style={styles.row}>
                            <View style={[styles.box, styles.marginR]}>
                                <MyTextInput
                                    label="phone"
                                    icon="device-mobile"
                                    placeholder="Phone N.º"
                                    placeholderTextColor={tertiary}
                                    onChangeText={handleChange('phone')}
                                    onBlur={handleBlur('phone')}
                                    value={values.phone}
                                />
                            </View>
                            <View style={styles.box}>
                                {/* <MyTextInput
                                    label="phone"
                                    icon="device-mobile"
                                    placeholder="Phone N.º"
                                    placeholderTextColor={tertiary}
                                    onChangeText={handleChange('phone')}
                                    onBlur={handleBlur('phone')}
                                    value={values.phone}
                                /> */}
                                <MyTextInput
                                    label="Street"
                                    icon="location"
                                    placeholder="Your street"
                                    placeholderTextColor={tertiary}
                                    onChangeText={handleChange('street')}
                                    onBlur={handleBlur('street')}
                                    value={values.street}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={styles.container}>
                        <View style={styles.row}>
                            <View style={[styles.box, styles.marginR]}>
                                <MyTextInput
                                    label="House number"
                                    icon="home"
                                    placeholder="Your house number"
                                    placeholderTextColor={tertiary}
                                    onChangeText={handleChange('house_number')}
                                    onBlur={handleBlur('house_number')}
                                    value={values.house_number}
                                />
                            </View>
                            <View style={styles.box}>
                                <MyTextInput
                                    label="Post Code"
                                    icon="inbox"
                                    placeholder="Your post code"
                                    placeholderTextColor={tertiary}
                                    onChangeText={handleChange('post_code')}
                                    onBlur={handleBlur('post_code')}
                                    value={values.post_code}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={styles.container}>
                        <View style={styles.row}>
                            <View style={[styles.box, styles.marginR]}>
                                <MyTextInput
                                    label="City"
                                    icon="milestone"
                                    placeholder="Your city"
                                    placeholderTextColor={tertiary}
                                    onChangeText={handleChange('city')}
                                    onBlur={handleBlur('city')}
                                    value={values.city}
                                />
                            </View>
                            <View style={styles.box}>
                                {/* <MyTextInput
                                    label="Country"
                                    icon="globe"
                                    placeholder="Your country"
                                    placeholderTextColor={tertiary}
                                    onChangeText={handleChange('country_id')}
                                    onBlur={handleBlur('country_id')}
                                    value={values.country_id}
                                /> */}
                                <Text style={styles.pickerLabelStyle}>Country</Text>
                                <Picker
                                    enabled={true}
                                    mode="dropdown"
                                    placeholder="Select Country"
                                    placeholderTextColor={tertiary}
                                    onValueChange={handleChange('country_id')}
                                    onBlur={handleBlur('country_id')}
                                    selectedValue={values.country_id}
                                    pickerStyleType={styles.pickerSelectStyle}
                                    style={styles.pickerSelectStyle}
                                >
                                    {countries.map((item) => {
                                        return (
                                            <Picker.Item
                                                label={item.country_name.toString()}
                                                value={item.id.toString()}
                                                key={item.id.toString()}
                                            />
                                        )
                                    })}
                                </Picker>
                            </View>
                        </View>
                    </View>
                    <profile.MessageBox type={messageType}>{message}</profile.MessageBox>
                    {!isSubmitting &&
                        <profile.StyledBotton onPress={() => handleSubmit()}>
                            <profile.BottonText>
                                Save
                            </profile.BottonText>
                        </profile.StyledBotton>}
                    {isSubmitting &&
                        <profile.StyledBotton disabled={true}>
                            <ActivityIndicator size="large" color={primary}>
                            </ActivityIndicator>
                        </profile.StyledBotton>}
                </profile.StyledFormArea>
                )}
            </Formik>
        </View >
    );
}

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, isDate, showDatePicker, ...props }) => {
    return (<View>
        <profile.LeftIcon><Text>
            <Octicons name={icon} size={30} color={primary} /></Text>
        </profile.LeftIcon>
        <profile.StyledInputLabel><Text>{label}</Text></profile.StyledInputLabel>
        {!isDate && <profile.StyledTextInput {...props} />}
        {isDate && (<TouchableOpacity onPress={showDatePicker}>
            <profile.StyledTextInput {...props} />
        </TouchableOpacity>)}
        {isPassword && (
            <profile.RightIcon onPress={() => setHidePassword(!hidePassword)}>
                <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={tertiary} />
            </profile.RightIcon>
        )}
    </View>);
};
const styles = StyleSheet.create({
    /*  containerInput: {
         display: 'flex',
         justifyContent: 'center'
     }, */
    container: {
        marginTop: 0,
    },
    row: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    box: {
        width: 170,
    },
    marginR: {
        marginRight: 10
    },
    zero: {
        padding: 0,
        margin: 0,
    },
    pickerSelectStyle: {
        backgroundColor: secondary,
        Padding: 10,
        paddingLeft: 50,
        paddingRight: 5,
        borderRadius: 5,
        fontSize: 16,
        height: 49,
        marginVertical: 30,
        marginBottom: 10,
        color: primary
    },
    pickerLabelStyle: {
        color: brandPrimary,
        fontSize: 13,
        textAlign: 'left',
        marginBottom: -25
    }
})
export default Profile 