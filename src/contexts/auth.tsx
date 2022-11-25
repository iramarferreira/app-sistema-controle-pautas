import { createContext, useState, useEffect } from "react";
import * as authService from '../service/auth.service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from "../service/api";
import { Alert } from 'react-native';



interface AuthContextData {
    signed: boolean;
    biometriaValida(): void;
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
                // setSigned(true)
                api.defaults.headers.Authorization = `Bearer ${storagedToken}`;

            }
            setLoading(false);

        }

        loadStorageData();
    });

    function biometriaValida() {
        setSigned(true)
    }

    // Função para fazer login
    async function signIn(username: string, password: string) {

        if (username == '' || password == '') {
            alert('Preenche todos os campos')
            return
        }

        let response = undefined
        await authService.login(username, password).then(
            (res) => {
                // alert(res.token)
                response = res

            },
            (error) => {
                if (error.response.status === 401) {
                    Alert.alert('Dados inválidos', 'usuário e/ou senha inválidos')
                }
                else if (error.response.status === 500) {
                    Alert.alert('Error')
                }
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
            { signed: signed, biometriaValida, token: token, user: user, loading, signIn, signOut }
        }>
            {props.children}
        </AuthContext.Provider>
    )
}