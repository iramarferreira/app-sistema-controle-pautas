import { StyleSheet, View, Dimensions } from 'react-native';
import { Text, Button, Input } from '@rneui/base';
import { useState, useContext, useEffect  } from 'react';
import AuthContext from '../contexts/auth';
import {getProcessoId, postProcesso} from '../service/processos.service';
import {api} from "../service/api";
import axios from 'axios';
import { getPautas } from '../service/pauta.service';

const screen = Dimensions.get("screen");

const vh = screen.height;
const vw = screen.width;

export default function CadastrarProcessos() {

    const {signOut} = useContext(AuthContext)
    const [ numberProcess, setNumberProcess ] = useState("");
    const [ partsProcess, setPartsProcess ] = useState("");
    const [ reporterProcess, setReporterProcess ] = useState("");
    const [ resumeProcess, setResumeProcess ] = useState("");
    const [ pautas, setPautas ] = useState<any[]>([]);

    useEffect(()=>{
        carregarPautas()
    }, [])

    async function carregarPautas() {
        getPautas()
            .then(function(res: any[]){
                const newPautas = res.map(pauta => {
                    const stringPauta = `${pauta.orgaoJudicante} - ${pauta.dataPublicacao[1]}/${pauta.dataPublicacao[2]}`
                    return { stringPauta, id: pauta.id }
                })
                setPautas(newPautas)

            })
            .catch(function(err){
                console.log(err)
            })
            console.log(pautas)
    }

    async function registerProcess() {
        if(numberProcess == ''){
            alert('Preenche o número do processo')
            return 
        }
        else if(partsProcess == ''){
            alert('Preenche as partes do processo')
            return 
        }
        else if(reporterProcess == ''){
            alert('Preenche o relator do processo')
            return 
        }
        else if(resumeProcess == ''){
            alert('Preenche o resumo do processo')
            return 
        }

        const process = {
            numero: numberProcess,
            partes: partsProcess,
            relator: reporterProcess,
            resumo: resumeProcess
        }
        
        try {
            await postProcesso(process)
            .then(function (response) {
                alert("Processo Cadastrado com successo!");
            })
            .catch(function (error) {
                alert(error);
            });
        } catch (err) {
            alert(err)
        }

        setNumberProcess('')
        setPartsProcess('')
        setReporterProcess('')
        setResumeProcess('')
        
    }

    return (

        <View style={styles.container}>
            <View style = {styles.dataProcess}>
                <Text style={styles.text}>Pauta: </Text>

            </View>
            <View style = {styles.dataProcess}>
                <Text style={styles.text}>Dados do Processo:</Text>
                <Input style={styles.textInput}
                    placeholder='Número do processo'
                    onChangeText={value => setNumberProcess(value)}

                    />
                <Input style={styles.textInput}
                    placeholder='Partes do processo'
                    onChangeText={value => setPartsProcess(value)}

                    />
                <Input style={styles.textInput}
                    placeholder='Relator do processo'
                    onChangeText={value => setReporterProcess(value)}

                    />
                <Input style={styles.textInput}
                    placeholder='Resumo do processo'
                    onChangeText={value => setResumeProcess(value)}

                    />
                <Button title='Cadastrar' buttonStyle={{ backgroundColor: '#01426A', width: '80%', alignSelf: 'center' }} onPress={registerProcess} />
            </View>

        </View>
    )

}

const styles = StyleSheet.create({
    container: {
      margin: 0,
      padding: 0,
      paddingBottom: 20,
      height: vh,
      width: vw,
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      backgroundColor: '#fff',
    },
    textInput: {
        margin: 0,
        padding: 0,
        width: vw,
    },
    text: {
        margin: 8,
        padding: 0,
        width: vw,
        color: "#01426A",
        fontWeight: 'bold',
        fontSize: 16,
    },
    dataProcess: {
        margin: 0,
        padding: 0,
        width: vw,
    },
});  
