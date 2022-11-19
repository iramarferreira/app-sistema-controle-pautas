import { StyleSheet, View, Dimensions } from 'react-native';
import { Text, Button } from '@rneui/base';
import { useState, useContext  } from 'react';
import AuthContext from '../contexts/auth';
import {getProcessoId} from '../service/processos.service';
import {api} from "../service/api";


const screen = Dimensions.get("screen");

const vh = screen.height;
const vw = screen.width;

export default function Processos() {

    const {signOut} = useContext(AuthContext)


    async function getTest() {
        await getProcessoId('d70e3c5d-3bc9-455e-be39-96a4dab18f98')
        .then((res) => {
            console.log(res)
        })
        .catch((e) => {
            console.log(e)
        })
        // console.log(api.defaults.headers.Authorization)
    }

    function clickSair(){
        signOut();
        // getTest()
    }

    return (

        <View style={styles.container}>

            <Text>Processos</Text>
            <Button title='Sair'
            onPress={clickSair}
            />
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
      margin: 0,
      padding: 0,
      height: vh,
      width: vw,
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
    },
});  
