import React, { useContext } from "react";
import { ActivityIndicator, View } from "react-native";

import { useAuth } from "../contexts/auth";

import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";

import Theme from '../styles/index';
const { primary, secondary, brandPrimary, tertiary } = Theme.light.colors;


const Routes: React.FC = () => {
    
    return  <AppRoutes />;
}
export default Routes;