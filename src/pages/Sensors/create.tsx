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
//sensores
import { Gyroscope } from 'expo-sensors';
import { Accelerometer } from 'expo-sensors';

global.SampleVar = true;

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
  const [data1, setData1] = useState({
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


  const g_subscribe = () => {
    setSubscription(
      Gyroscope.addListener(gyroscopeData => {
        setData1(gyroscopeData);
      })
    );
  };
  const g_unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    g_subscribe();
    return () => g_unsubscribe();
  }, []);

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
          vehicle_id: "0ef0bc67-8d49-42ed-94f5-cf3268cd9fb5",
          accelerometerX: "",
          accelerometerY: "",
          accelerometerZ: "",
          gyroscopeX: "",
          gyroscopeY: "",
          gyroscopeZ: ""
        }}

        onSubmit={(values, { setSubmitting }) => {
          values = { ...values }
          values.accelerometerX=x.toString();
          values.accelerometerY=y.toString();
          values.accelerometerZ=z.toString();
          values.gyroscopeX=data1.x.toString();
          values.gyroscopeY=data1.y.toString();
          values.gyroscopeZ=data1.z.toString();
          handleSensor(values, setSubmitting)

          //console.log(values); navigation.navigate('home')
        }
        }
      >
        {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) =>
        (<Sensores.StyledFormArea>
          <MyTextInput
            label="Value of accelerometer X"
            placeholder={round(x).toString()}
            onChangeText={handleChange('accelerometerX')}
            onBlur={handleBlur('accelerometerX')}
            editable={false} selectTextOnFocus={false}
            value={values.accelerometerX} />
          <MyTextInput
            label="Value of accelerometer Y"
            placeholder={round(y).toString()}
            onChangeText={handleChange('accelerometerY')}
            onBlur={handleBlur('accelerometerY')}
            editable={false} selectTextOnFocus={false}
            value={values.accelerometerY} />
          <MyTextInput
            label="Value of accelerometer Z"
            placeholder={round(z).toString()}
            onChangeText={handleChange('accelerometerZ')}
            onBlur={handleBlur('accelerometerZ')}
            editable={false} selectTextOnFocus={false}
            value={values.accelerometerZ}
          />
          <MyTextInput
            label="Value of gyroscope X"
            placeholder={round(data1.x).toString()}
            onChangeText={handleChange('gyroscopeX')}
            onBlur={handleBlur('gyroscopeX')}
            editable={false} selectTextOnFocus={false}
            value={values.gyroscopeY}
          />
          <MyTextInput
            label="Value of gyroscope Y"
            placeholder={round(data1.y).toString()}
            onChangeText={handleChange('gyroscopeY')}
            onBlur={handleBlur('gyroscopeY')}
            editable={false} selectTextOnFocus={false}
            value={values.gyroscopeY}
          />
          <MyTextInput
            label="Value of gyroscope Z"
            placeholder={round(data1.z).toString()}
            onChangeText={handleChange('gyroscopeZ')}
            onBlur={handleBlur('gyroscopeZ')}
            editable={false} selectTextOnFocus={false}
            value={values.gyroscopeZ}
          />
          <Sensores.MessageBox type={messageType}>{message}</Sensores.MessageBox>
          {!isSubmitting && SampleVar &&
            <Sensores.StyledBotton onPress={handleSubmit()}>
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