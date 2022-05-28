import React, { useContext } from "react";
import { ActivityIndicator, View } from "react-native";

import { useAuth } from "../contexts/auth";

import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";

import Theme from '../styles/index';
const { primary, secondary, brandPrimary, tertiary } = Theme.light.colors;


const Routes: React.FC = () => {
    const { signed, loading } = useAuth();

    if (loading) {
        return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
            <ActivityIndicator size="large" color={brandPrimary} />
        </View>)
    }
    return signed ? <AppRoutes /> : <AuthRoutes />;
}
export default Routes;