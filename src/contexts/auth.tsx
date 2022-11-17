import { createContext, useState, useEffect } from "react";
import * as authService from '../service/auth.service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {api} from "../service/api";


interface AuthContextData {
    signed: boolean;
    token: string;
    user: object | null;
    loading: boolean;
    signIn(username: string, password: string): Promise<void>;
    signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export default AuthContext;

export const AuthProvider = (props: any) => {

    const [user, setUser] = useState<object | null>(null);
    const [token, setToken] = useState<string>('');
    const [signed, setSigned] = useState<boolean>(false);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        async function loadStorageData() {
            const storagedUser = await AsyncStorage.getItem('@user');
            const storagedToken = await AsyncStorage.getItem('@token');
           
            if (storagedUser && storagedToken) {
                setUser(JSON.parse(storagedUser));
                setToken(storagedToken)
                setSigned(true)
                api.defaults.headers.Authorization = `Bearer ${storagedToken}`;

            }
            setLoading(false);

        }

        loadStorageData();
    });

    // Função para fazer login
    async function signIn(username: string, password: string) {

        let response = undefined
        await authService.login(username, password).then(
            (res) => {
                alert(res.token)
                response = res

            },
            (error) => {
                alert(error)
            }
        )

        if (response) {
            api.defaults.headers.Authorization = `Baerer ${response.token}`;
            
            setToken(response.token);
            let userResponse = {

                username: response.username,
                email: response.email

            }
            setUser(userResponse)
            setSigned(true);
            console.log(response)

            await AsyncStorage.setItem('@user', JSON.stringify(userResponse));
            await AsyncStorage.setItem('@token', response.token);
        }


    }

    async function signOut() {
        await AsyncStorage.clear();
        setUser(null);
        setToken('');
        setSigned(false)
    }

    return (
        <AuthContext.Provider value={
            { signed: signed, token: token, user: user, loading, signIn, signOut }
        }>
            {props.children}
        </AuthContext.Provider>
    )
}