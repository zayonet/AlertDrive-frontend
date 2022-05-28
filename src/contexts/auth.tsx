import { createContext, useContext } from "react";
import IUserCredentiasl from "../interface/user"
interface User {
    name: string;
    email: string;
}
interface IUser {
    id: number | string;
    name: string;
    email: string;
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
    active: string;
    created_at: Date | string;
    updated_at: Date | string;
}


interface AutContextData {
    signed: boolean;
    user: IUser | null;
    signIn(credentials: IUserCredentiasl): Promise<void>;
    signOut(): void;
    loading: boolean;
}
const AuthContext = createContext<AutContextData>({} as AutContextData);

export default AuthContext;
export function useAuth() {
    const context = useContext(AuthContext)
    return context;
}