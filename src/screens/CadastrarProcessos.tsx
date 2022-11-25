import { StyleSheet, View, Dimensions, ScrollView, Alert } from 'react-native';
import { Text, Button, Input } from '@rneui/base';
import { useState, useContext, useEffect  } from 'react';
import AuthContext from '../contexts/auth';
import {getProcessoId, postProcesso} from '../service/processos.service';
import {api} from "../service/api";
import axios from 'axios';
import { getPautas, postVinculacaoProcessoPauta } from '../service/pauta.service';

const screen = Dimensions.get("screen");

const vh = screen.height;
const vw = screen.width;

type Pautas = {
    stringPauta: string,
    id: string
}

export default function CadastrarProcessos() {

    const {signOut} = useContext(AuthContext)
    const [ numberProcess, setNumberProcess ] = useState("");
    const [ partsProcess, setPartsProcess ] = useState("");
    const [ reporterProcess, setReporterProcess ] = useState("");
    const [ resumeProcess, setResumeProcess ] = useState("");
    const [ pautas, setPautas ] = useState<Pautas[]>([]);
    const [ pautaSelected, setPautaSelected ] = useState(-1)
    const [ loadingCadastro, setLoadingCadastro ] = useState(false);

    useEffect(()=>{
        carregarPautas()
    }, [])

    async function carregarPautas() {
        getPautas()
            .then(function(res: any[]){
                const newPautas = res.map(pauta => {
                    const stringPauta = `${pauta.orgaoJudicante} - ${pauta.dataPublicacao[1]}/${pauta.dataPublicacao[2]}`
                    return { stringPauta, id: pauta.id}
                })
                setPautas(newPautas)

            })
            .catch(function(err){
                console.log(err)
            })
            console.log(pautas)
    }

    async function registerProcess() {
        setLoadingCadastro(true)
        if(pautaSelected == -1){
            alert('Selecione a pauta')
            return 
        }
        else if(numberProcess == ''){
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
                vincularProcessoPauta(response)
                // alert("Processo Cadastrado com successo!");
            })
            .catch(function (error) {
                alert(error);
            });
        } catch (err) {
            alert(err)
        }

        async function vincularProcessoPauta(res: any){
            await postVinculacaoProcessoPauta(pautas[pautaSelected], res)
            .then(function (response) {
                Alert.alert("", "Processo cadastrado com successo!");
            })
            .catch(function (error) {
                // Alert.alert(error);
                Alert.alert("Erro", "Aconteceu algum erro");
            });
        }

        setNumberProcess('')
        setPartsProcess('')
        setReporterProcess('')
        setResumeProcess('')
        setPautaSelected(-1)
        setLoadingCadastro(false)
    }

    return (

        <View style={styles.container}>
            <View style = {styles.dataProcessPauta}>
                <Text style={styles.textPauta}>Pauta: </Text>
                <ScrollView style={styles.scroll}>
                    {
                        pautas.map((pauta, key) => {
                            return(
                                <Button key={key} buttonStyle={key != pautaSelected ? styles.scrollContent : styles.scrollContentSelected } onPress={()=>setPautaSelected(key)}>

                                    <Text style={{color: 'white', fontWeight: 'bold'}}>{`${pauta.stringPauta}`}</Text>
                                </Button>
                            )
                        })
                    }
                    
                </ScrollView>
            </View>
            <View style = {styles.dataProcess}>
                <Text style={styles.text}>Dados do Processo:</Text>
                <Input style={styles.textInput}
                    placeholder='Número do processo'
                    value={numberProcess}
                    onChangeText={value => setNumberProcess(value)}

                    />
                <Input style={styles.textInput}
                    placeholder='Partes do processo'
                    value={partsProcess}
                    onChangeText={value => setPartsProcess(value)}

                    />
                <Input style={styles.textInput}
                    placeholder='Relator do processo'
                    value={reporterProcess}
                    onChangeText={value => setReporterProcess(value)}

                    />
                <Input style={styles.textInput}
                    placeholder='Resumo do processo'
                    value={resumeProcess}
                    onChangeText={value => setResumeProcess(value)}

                    />
                <Button 
                    title='Cadastrar' 
                    loading={loadingCadastro}
                    disabled={(pautaSelected == -1) || (numberProcess == '') || (partsProcess == '') || (reporterProcess == '') || (resumeProcess == '')}
                    buttonStyle={{ backgroundColor: '#01426A', width: '80%', alignSelf: 'center' }} 
                    onPress={registerProcess} />
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
    textPauta: {
        margin: 8,
        marginLeft: 24,
        padding: 0,
        width: vw,
        color: "#01426A",
        fontWeight: 'bold',
        fontSize: 16,
    },
    dataProcessPauta: {
        margin: 0,
        padding: 0,
        width: vw,
        alignItems: 'center'
    },
    dataProcess: {
        margin: 0,
        padding: 0,
        width: vw,
    },
    scroll: {
        width: '80%',
        height: 100,
        backgroundColor: 'white',
        borderRadius: 2,
        borderWidth: 1,
        borderColor: "#01426A"
    },
    scrollContent: {
        width: '100%',
        height: 35,
        backgroundColor: '#5A5A5A',
        borderRadius: 2,
        borderBottomWidth: 1,
        borderColor: 'gray',
        alignItems: 'center'
    },
    scrollContentSelected: {
        width: '100%',
        height: 35,
        backgroundColor: '#01426A',
        borderRadius: 2,
        borderBottomWidth: 1,
        borderColor: 'gray',
        alignItems: 'center',
        textDecorationColor: 'white'
    }
});  
