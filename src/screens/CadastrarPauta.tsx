import { StyleSheet, View, Dimensions, ScrollView } from 'react-native';
import { Text, Button } from '@rneui/base';
import { useState, useContext  } from 'react';
import AuthContext from '../contexts/auth';
import {getProcessoId} from '../service/processos.service';
import {api} from "../service/api";

import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { postPauta } from '../service/pauta.service';

const screen = Dimensions.get("screen");

const vh = screen.height;
const vw = screen.width;

export default function CadastrarPauta() {

    const {signOut} = useContext(AuthContext)
    const [ turmaSelected, setTurmaSelected ] = useState(-1)
    const [ sistemaSelected, setSistemaSelected ] = useState(-1)
    const [ meioSelected, setMeioSelected ] = useState(-1)
    const [ loadingCadastro, setLoadingCadastro ] = useState(false);

    const [date, setDate] = useState(new Date());

    const turmas = [
        { id: 1, name: '1ª Turma' },
        { id: 2, name: '2ª Turma' },
        { id: 3, name: '3ª Turma' },
        { id: 4, name: '4ª Turma' },
        { id: 5, name: '5ª Turma' },
        { id: 6, name: '6ª Turma' },
        { id: 7, name: '7ª Turma' },
        { id: 8, name: '8ª Turma' },
        { id: 9, name: 'Órgão Especial' },
        { id: 10, name: 'Tribunal Pleno' },
        { id: 11, name: 'SDC' },
        { id: 12, name: 'SDI' },
        { id: 13, name: 'SbDI-1' },
        { id: 14, name: 'SbDI-2' }
    ]

    const sistemas = [
        { name: 'TST' },
        { name: 'PJe' }
    ]
    
    const meios = [
        { name: 'HIBRIDO' },
        { name: 'VIRTUAL' },
        { name: 'PRESENCIAL' }
    ]

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setDate(currentDate);
    };
    
    const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
        value: date,
        onChange,
        mode: currentMode,
        is24Hour: true,
        minimumDate: new Date(),
    });
    };

    const showDatepicker = () => {
    showMode('date');
    };

    async function registerPauta() {
        setLoadingCadastro(true)

        const pauta = {
            orgaoJudicante: turmas[turmaSelected].name,
            sistemaPauta: sistemas[sistemaSelected].name,
            meioJulgamento: meios[meioSelected].name,
            dataSessao: date,
            dataDivulgacao: new Date(),
            dataPublicacao: new Date()
        }

        console.log(pauta)
        
        try {
            await postPauta(pauta)
            .then(function (response) {
                alert("Pauta Cadastrada com successo!");
            })
            .catch(function (error) {
                alert(error);
            });
        } catch (err) {
            alert(err)
        }

        setTurmaSelected(-1)
        setSistemaSelected(-1)
        setMeioSelected(-1)
        setLoadingCadastro(false)
    }

    return (
        <View style={styles.container}>
            <View style = {styles.content}>
                <Text style={styles.text}>Orgão Judicante: </Text>
                <ScrollView style={styles.scroll}>
                    {
                        turmas.map((turma, key) => {
                            return(
                                <Button key={key} buttonStyle={key != turmaSelected ? styles.scrollContent : styles.scrollContentSelected } onPress={()=>setTurmaSelected(key)}>

                                    <Text style={{color: 'white', fontWeight: 'bold'}}>{`${turma.name}`}</Text>
                                </Button>
                            )
                        })
                    }
                </ScrollView>
            </View>

            <View style = {styles.content}>
                <Text style={styles.text}>Sistema de pauta: </Text>
                <View style={styles.viewSistem}>
                    {
                        sistemas.map((sistema, key) => {
                            return(
                                <Button key={key} buttonStyle={key != sistemaSelected ? styles.buttonSistem : styles.buttonSistemSelected } onPress={()=>setSistemaSelected(key)}>

                                    <Text style={{color: 'white', fontWeight: 'bold'}}>{`${sistema.name}`}</Text>
                                </Button>
                            )
                        })
                    }
                </View>
            </View>

            <View style = {styles.content}>
                <Text style={styles.text}>Meio de julgamento: </Text>
                <View style={styles.viewSistem}>
                    {
                        meios.map((meio, key) => {
                            return(
                                <Button key={key} buttonStyle={key != meioSelected ? styles.buttonSistem : styles.buttonSistemSelected } onPress={()=>setMeioSelected(key)}>

                                    <Text style={{color: 'white', fontWeight: 'bold'}}>{`${meio.name}`}</Text>
                                </Button>
                            )
                        })
                    }
                </View>
            </View>

            <View style={styles.viewButton}>
                <Text style={styles.text}>Data da pauta: </Text>
                <Button onPress={showDatepicker} title={`${((date.getDate() )) + "/" + ((date.getMonth() + 1)) + "/" + date.getFullYear()}`} buttonStyle={{alignSelf: 'center', backgroundColor: '#01426A', width: '80%', marginBottom: 16 }} />
            </View>

            <View style={styles.viewButton}>

                <Button 
                        title='Cadastrar' 
                        loading={loadingCadastro}
                        disabled={(turmaSelected == -1) || (sistemaSelected == -1) || (meioSelected == -1)}
                        buttonStyle={{ backgroundColor: '#01426A', alignSelf: 'center', width: '80%' }} 
                        onPress={registerPauta}
                        />
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
        justifyContent: 'flex-start',
        backgroundColor: '#fff',
    },
    text: {
        margin: 8,
        marginLeft: 24,
        padding: 0,
        width: vw,
        color: "#01426A",
        fontWeight: 'bold',
        fontSize: 16,
    },
    content: {
        flexDirection: 'column',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    scroll: {
        width: '80%',
        height: 100,
        backgroundColor: 'white',
        borderRadius: 2,
        borderWidth: 1,
        borderColor: "#01426A"
    },
    viewSistem: {
        width: '80%',
        marginBottom: 10
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
    },
    buttonSistem: {
        marginBottom: 5,
        height: 35,
        backgroundColor: '#5A5A5A',
        borderRadius: 2,

    },
    buttonSistemSelected: {
        marginBottom: 5,
        height: 35,
        backgroundColor: '#01426A',
        borderRadius: 2,
    },
    viewButton: {
        margin: 0,
        padding: 0,
        width: vw,
    }
});  
