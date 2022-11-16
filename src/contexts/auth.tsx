import { createContext, useState } from "react";
import * as authService from '../service/auth.service';

interface AuthContextData {
    signed: boolean;
    token: string;
    user: object | null;
    signIn(username:string, password:string): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export default AuthContext;

export const AuthProvider = (props: any) => {

    const [user, setUser] = useState<object | null>(null);
    const [token, setToken] = useState<string>('');
    const [signed, setSigned] = useState<boolean>(false);
    
    async function signIn(username:string, password:string) {
     
        let response = undefined
        await authService.login(username, password).then(
            (res) => {
                alert(res.token)
                response = res
                
            },
            (error) => {
                alert(error)
                response = 'error'
            }
        )

        if(response){
            setToken(response.token);
            setUser({
                username: response.username, 
                email: response.email
            })
            setSigned(true);
            console.log(response)
        }
        
        
    }

    function signOut() {
        setUser(null);
        setToken('');
        setSigned(false)
      }

    return (
        <AuthContext.Provider value={
            { signed: signed, token: token, user: user, signIn }
        }>
            {props.children}
        </AuthContext.Provider>
    )
}