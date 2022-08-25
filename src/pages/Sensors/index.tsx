import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert, TextInput, Title } from "react-native";
import * as Sensores from "./styles"
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
import Select from '../../components/select';

import { Gyroscope } from 'expo-sensors';
import { Accelerometer } from 'expo-sensors';



const { brandSecondary, brandSecondary2, primary, tertiary } = theme.light.colors;

//api server 
import api from '../../service/api';
import axios from 'axios';


interface sensors {
  accelerometerX: string;
  accelerometerY: string;
  accelerometerZ: string;
  gyroscopeX: string;
  gyroscopeY: string;
  gyroscopeZ: string;
}

const Sensors: React.FC = ({ navigation }: any) => {

  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0
  });
  const [subscription, setSubscription] = useState(null);

  const _subscribe = () => {
    setSubscription(
      Accelerometer.addListener(accelerometerData => {
        setData(accelerometerData);
      })
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);
  const { x, y, z} = data;

  function round(n) {
    if (!n) {
      return 0;
    }
    return Math.floor(n * 100) / 100;
  }
  const [hidePassword, setHidePassword] = React.useState(true);
  const [show, setShow] = React.useState(false);

  const { signOut, user } = useAuth();



  //Feedback on login 
  const [message, setMessage] = React.useState();
  const [messageType, setMessageType] = React.useState();
  //const [isSubmitting, setSubmitting] = useState();

  async function handleSensor(credentials: sensors, setSubmitting: any) {
    //handleMessage(null);
    console.log(credentials);
    const response = await api.post('/sensor', credentials)
      .then((response) => {
        const result = response.data;
        if (result) {
          navigation.navigate('Sensors');
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
          user_id: user?.id,
          accelerometerX: round(data?.x).toString(),
          accelerometerY: round(data?.y).toString(),
          accelerometerZ: round(data?.z).toString(),
          gyroscopeX: "",
          gyroscopeY: "",
          gyroscopeZ: ""
        }}

        onSubmit={(values, { setSubmitting }) => {
          values = { ...values }

          handleSensor(values, setSubmitting)

          //console.log(values); navigation.navigate('home')
        }
        }
      >
        {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) =>
        (<Sensores.StyledFormArea>
          <MyTextInput
            label="Value of accelerometer X"
            onChangeText={handleChange('accelerometerX')}
            onBlur={handleBlur('accelerometerX')}
            editable={false} selectTextOnFocus={false}
            value={values.accelerometerX} />
          <MyTextInput
            label="Value of accelerometer Y"
            onChangeText={handleChange('accelerometerY')}
            onBlur={handleBlur('accelerometerY')}
            editable={false} selectTextOnFocus={false}
            value={values.accelerometerY} />
          <MyTextInput
            label="Value of accelerometer Z"
            onChangeText={handleChange('accelerometerZ')}
            onBlur={handleBlur('accelerometerZ')}
            editable={false} selectTextOnFocus={false}
            value={values.accelerometerZ}
          />
          <MyTextInput
            label="Introduce gyroscopeX"
            onChangeText={handleChange('gyroscopeX')}
            onBlur={handleBlur('gyroscopeX')}
            value={values.gyroscopeY}
          />
          <MyTextInput
            label="Introduce gyroscopeY"
            onChangeText={handleChange('gyroscopeY')}
            onBlur={handleBlur('gyroscopeY')}
            value={values.gyroscopeY}
          />
          <MyTextInput
            label="Introduce gyroscopeZ"
            onChangeText={handleChange('gyroscopeZ')}
            onBlur={handleBlur('gyroscopeZ')}
            value={values.gyroscopeZ}
          />


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
export default Sensors 