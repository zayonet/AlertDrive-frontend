import React, { useState, useEffect,ChangeEvent } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert, TextInput, Title } from "react-native";
import * as Sensores from "../Sensors/styles"
import { useAuth } from '../../contexts/auth';
//form
import { Field, Formik } from 'formik';
import { useFormik } from 'formik';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-community/picker'
//icons
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';
//Themes
import theme from "../../styles/index";

//geolocation
import {teste} from "../../service/weather" 


const { brandSecondary, brandSecondary2, primary, tertiary } = theme.light.colors;

//api server 
import api from '../../service/api';
import axios from 'axios';


interface weather {
    weather_description: string;
    temperature: string;
    pressure: string;
    humidity: string;
    visibility: string;
    wind_speed: string;
    wind_direction: string;
    cloudiness: string;
    name:string
}

const Weather: React.FC = ({ navigation }: any) => {

    const [data, setData] = useState({});
    const [location, setLocation] = useState("");

    const searchLocation = (loc) => {
        var url = 'https://api.openweathermap.org/data/2.5/weather?q='+loc+'&appid=ad8a5a30c452447aaf4e06e7504336ce';
        //console.log(loc)
        console.log(url)
        //console.log(teste(loc))
        axios.get(url).then((response) => {
            setData(response.data)
            if (data.main && data.weather && data.sys && data.base && data.visibility && data.wind) {
                console.log(data)
            }
        })
    };


    const [hidePassword, setHidePassword] = React.useState(true);
    const [show, setShow] = React.useState(false);

    const { signOut, user } = useAuth();


    //Feedback on login 
    const [message, setMessage] = React.useState();
    const [messageType, setMessageType] = React.useState();
    //const [isSubmitting, setSubmitting] = useState();

    async function handleSensor(credentials: weather, setSubmitting: any) {
        //handleMessage(null);
        console.log(credentials);
        const response = await api.post('/weather', credentials)
            .then((response) => {
                const result = response.data;
                if (result) {
                    navigation.navigate('weather');
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
                    user_id: "1",
                    vehicle_id: "0ef0bc67-8d49-42ed-94f5-cf3268cd9fb5",
                    weather_description: "",
                    temperature: "",
                    pressure: "",
                    humidity: "",
                    visibility: "",
                    wind_speed: "",
                    wind_direction: "",
                    name: "",
                    cloudiness: ""
                }}

                onSubmit={(values, { setSubmitting }) => {
                    values.weather_description = data.weather[0].main;
                    values.temperature = data.main.temp.toString();
                    values.pressure = data.main.pressure.toString();
                    values.humidity = data.main.humidity.toString();
                    values.visibility = data.visibility.toString();
                    values.wind_speed = data.wind.speed.toString();
                    values.wind_direction = data.wind.deg.toString();
                    values.cloudiness = data.clouds.all.toString();
                    handleSensor(values, setSubmitting)

                    //console.log(values); navigation.navigate('home')
                }
                }
            >

                {({ handleChange, handleBlur, handleSubmit, values, isSubmitting, }) =>
                (<Sensores.StyledFormArea>
                    <MyTextInput
                        label="Search"
                        icon="location"
                        placeholder={"Enter Location"} 
                        onChangeText={handleChange('name')}
                        onBlur={handleBlur('name')}
                        value={values.name}
                    />
                    <MyTextInput
                        label="weather description"
                        icon="sun"
                        placeholder={"weather description"} 
                        onChangeText={handleChange('weather_description')}
                        onBlur={handleBlur('weather_description')}
                        editable={false} selectTextOnFocus={false}
                        value={values.weather_description}
                    />
                    <MyTextInput
                        label="temperature"
                        icon="flame"
                        placeholder={"temperature"} 
                        onChangeText={handleChange('temperature')}
                        onBlur={handleBlur('temperature')}
                        editable={false} selectTextOnFocus={false}
                        value={values.temperature}
                    />
                    <MyTextInput
                        label="pressure"
                        icon="arrow-down"
                        placeholder={"pressure"} 
                        onChangeText={handleChange('pressure')}
                        onBlur={handleBlur('pressure')}
                        editable={false} selectTextOnFocus={false}
                        value={values.pressure}
                    />
                    <MyTextInput
                        label="humidity"
                        icon="north-star"
                        placeholder={"humidity"}
                        onChangeText={handleChange('humidity')}
                        onBlur={handleBlur('humidity')}
                        editable={false} selectTextOnFocus={false}
                        value={values.humidity}
                    />
                    <Sensores.StyledBotton onPress={() => {searchLocation(values.name)}}>
                        <Sensores.BottonText>
                            search
                        </Sensores.BottonText>
                    </Sensores.StyledBotton>
                    <Sensores.MessageBox type={messageType}>{message}</Sensores.MessageBox>
                    {!isSubmitting &&
                        <Sensores.StyledBotton onPress={() => handleSubmit()}>
                            <Sensores.BottonText>
                                Save
                            </Sensores.BottonText>
                        </Sensores.StyledBotton>}
                    {isSubmitting &&
                        <Sensores.StyledBotton disabled={true}>
                            <ActivityIndicator size="large" color={primary}>
                            </ActivityIndicator>
                        </Sensores.StyledBotton>}
                </Sensores.StyledFormArea>
                )}
            </Formik>
        </View>
    );
}


const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, isDate, showDatePicker, ...props }) => {
    return (<View>
        <Sensores.LeftIcon><Text>
            <Octicons name={icon} size={30} color={primary} /></Text>
        </Sensores.LeftIcon>
        <Sensores.StyledInputLabel><Text>{label}</Text></Sensores.StyledInputLabel>
        {!isDate && <Sensores.StyledTextInput {...props} />}
        {isDate && (<TouchableOpacity onPress={showDatePicker}>
            <Sensores.StyledTextInput {...props} />
        </TouchableOpacity>)}
        {isPassword && (
            <Sensores.RightIcon onPress={() => setHidePassword(!hidePassword)}>
                <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={tertiary} />
            </Sensores.RightIcon>
        )}
    </View>);
};
export default Weather 