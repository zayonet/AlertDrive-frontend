import React, { createContext, useState, useEffect } from "react";
//import AsyncStorage from "@react-native-community/async-storage";
//api server 
import * as logged from '../service/auth';
import api from '../service/api';
import axios from 'axios';

import AuthContext from './auth';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from "react-native";
import IUserCredentiasl from "../interface/user";

interface User {
    name: string;
    email: string;
}

interface IUser {
    id: number | string;
    name: string;
    email: string;
<<<<<<< HEAD
    nif: number;
    password: string;
    birthday: string;
    gender: string;
    phone: number;
    photo: string;
    street: string;
    house_number: string;
    post_code: string;
    city: string;
    country_id: string;
    aboutme: string;
=======
>>>>>>> a8e08eb49879e6efcbe0796cf0e2bf99a825a423
    active: string;
    created_at: Date | string;
    updated_at: Date | string;
}
/* interface AutContextData {
    signed: boolean;
    user: object;
    signIn(): Promise<void>;
}
const AuthContext = createContext<AutContextData>({} as AutContextData); */

const AuthProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<IUser | null>(null);
<<<<<<< HEAD
    const [token, setToken] = useState<string | null>(null);
=======
>>>>>>> a8e08eb49879e6efcbe0796cf0e2bf99a825a423
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadStorageData() {

            const storageUser = await AsyncStorage.getItem('@DriveAlert:user');
            const storageToken = await AsyncStorage.getItem('@DriveAlert:token');

            if (storageUser && storageToken) {
                api.defaults.headers.Authorization = `Bearer ${storageToken}`;
                setUser(JSON.parse(storageUser));
<<<<<<< HEAD
                setToken(api.defaults.headers.Authorization);
=======
>>>>>>> a8e08eb49879e6efcbe0796cf0e2bf99a825a423
            }
            setLoading(false);

        }
        loadStorageData();
    })

    async function signIn(credentials: IUserCredentiasl) {
        //const response = await logged.login();
        const response = await api.post('/session', credentials);
        //console.log(response.data)
        /* axios.post(api + '/session', credentials)
            .then(response => {
                console.log(response)
                console.log(response.data)
            })
            .catch((error) => console.warn("fetch error:", error))
            .then((response) => {
                console.log(response)
            }) */
        //const { token, user } = response.data;
        //const { token, user } = response;
        //console.log(response.data);
        setUser(response.data.user)
        api.defaults.headers['Authorization'] = `Bearer ${response.data.token}`;
<<<<<<< HEAD
        setToken(response.data.token);
=======
>>>>>>> a8e08eb49879e6efcbe0796cf0e2bf99a825a423

        await AsyncStorage.setItem('@DriveAlert:user', JSON.stringify(response.data.user));
        await AsyncStorage.setItem('@DriveAlert:token', response.data.token);
    }
    function signOut() {
        AsyncStorage.clear().then(() => { setUser(null); })
    }
    return (
<<<<<<< HEAD
        <AuthContext.Provider value={{ signed: Boolean(user), user, signIn, signOut, loading, token }}>
=======
        <AuthContext.Provider value={{ signed: Boolean(user), user, signIn, signOut, loading }}>
>>>>>>> a8e08eb49879e6efcbe0796cf0e2bf99a825a423
            {children}
        </AuthContext.Provider>
    )
};
export default AuthProvider;
