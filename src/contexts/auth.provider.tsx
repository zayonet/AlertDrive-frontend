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
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadStorageData() {

            const storageUser = await AsyncStorage.getItem('@DriveAlert:user');
            const storageToken = await AsyncStorage.getItem('@DriveAlert:token');

            if (storageUser && storageToken) {
                api.defaults.headers.Authorization = `Bearer ${storageToken}`;
                setUser(JSON.parse(storageUser));
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

        await AsyncStorage.setItem('@DriveAlert:user', JSON.stringify(response.data.user));
        await AsyncStorage.setItem('@DriveAlert:token', response.data.token);
    }
    function signOut() {
        AsyncStorage.clear().then(() => { setUser(null); })
    }
    return (
        <AuthContext.Provider value={{ signed: Boolean(user), user, signIn, signOut, loading }}>
            {children}
        </AuthContext.Provider>
    )
};
export default AuthProvider;
