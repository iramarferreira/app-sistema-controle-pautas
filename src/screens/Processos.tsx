import { StyleSheet, View, Dimensions } from 'react-native';
import { Text, Button } from '@rneui/base';
import { useState, useContext, useEffect } from 'react';
import AuthContext from '../contexts/auth';
import {getProcessoId} from '../service/processos.service';
import {api} from "../service/api";
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';


const screen = Dimensions.get("screen");

const vh = screen.height;
const vw = screen.width;

type Process = {
    numero: String,
    relator: String,
    partes: String
}

export default function Processos() {

    const {signOut} = useContext(AuthContext)

    const [process, setProcess] = useState<Process[]>([])

    useEffect(() => {
        axios.get('/processos')
            .then(function (response) {
                setProcess(response)
            })
            .catch(function (error) {
                alert(error);
            })
    }, [])

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
            <View style={styles.contentProcess}>
                  <Text style={styles.textProcess}>Processo: 001.005.02.1.0008</Text>
                  <Text style={styles.textProcess}>Relator: Ministro Fulano</Text>
                  <Text style={styles.textProcess}>Partes: Cicrano, Beltrano</Text>
            </View>
            <View style={styles.contentProcess}>
                  <Text style={styles.textProcess}>Processo: 001.005.02.1.0008</Text>
                  <Text style={styles.textProcess}>Relator: Ministro Fulano</Text>
                  <Text style={styles.textProcess}>Partes: Cicrano, Beltrano</Text>
            </View>
            <View style={styles.contentProcess}>
                  <Text style={styles.textProcess}>Processo: 001.005.02.1.0008</Text>
                  <Text style={styles.textProcess}>Relator: Ministro Fulano</Text>
                  <Text style={styles.textProcess}>Partes: Cicrano, Beltrano</Text>
            </View>
            <View style={styles.contentProcess}>
                  <Text style={styles.textProcess}>Processo: 001.005.02.1.0008</Text>
                  <Text style={styles.textProcess}>Relator: Ministro Fulano</Text>
                  <Text style={styles.textProcess}>Partes: Cicrano, Beltrano</Text>
            </View>
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
      justifyContent: 'flex-start',
      backgroundColor: '#fff',
    },
    contentProcess: {
        margin: 0,
        paddingTop: 10,
        paddingEnd: 10,
        marginBottom: 5,
        padding: 5,
        width: vw,
        backgroundColor: '#D9D9D9'
    },
    textProcess: {
        fontWeight: 'bold',
        fontSize: 16
    }
});  
