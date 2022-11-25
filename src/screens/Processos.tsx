import { StyleSheet, View, Dimensions, ActivityIndicator, FlatList, Alert } from 'react-native';
import { Text, Button, ListItem } from '@rneui/base';
import { useState, useContext, useEffect } from 'react';
import AuthContext from '../contexts/auth';
import {deleteProcesso, getProcessoId} from '../service/processos.service';
import {api} from "../service/api";
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import axios from 'axios';

import { getProcessos } from '../service/processos.service';
import { Icon } from '@rneui/themed';
import { ListItemSwipeable } from '@rneui/base/dist/ListItem/ListItem.Swipeable';
import { ListItemContent } from '@rneui/base/dist/ListItem/ListItem.Content';
import { ListItemTitle } from '@rneui/base/dist/ListItem/ListItem.Title';


const screen = Dimensions.get("screen");

const vh = screen.height;
const vw = screen.width;

export default function Pautas({ navigation }) {

    const [processos, setProcessos] = useState<any>([])
    const [isLoading, setIsLoading] = useState(true)

    const { signOut } = useContext(AuthContext)

    const isFocused = useIsFocused();

    useEffect(() => {
        carregarDados()
   
        console.log('teste')
    }, [isFocused])



    async function carregarDados() {
        await getProcessos()
            .then((res) => {
                setProcessos(res)
                console.log(res)
            })
            .catch((e) => {
                console.log(e)
            })

        setIsLoading(false)
        
    }


    async function deletarProcesso(id: string) {
        await deleteProcesso(id)
            .then((res) => {
                console.log(res)
                if (res.status == 200) {
                    carregarDados()
                }
            })
            .catch((e) => {
                console.log(e)
            })
    }

    function confirmRemoverProcesso(item) {
        console.log(item)
        Alert.alert('Excluir Processo', 'Deseja excluir a Processo?', [
            {
                text: 'Sim',
                onPress() {
                    // console.log("remove pauta")
                    deletarProcesso(item.id)
                }
            },
            {
                text: 'Não',
                onPress() {
                    return
                }
            }
        ])
    }

    function getActions( item ) {
        return (
            <>
                <Button
                    onPress={() => navigation.navigate('CadastrarProcessos', {item ,update: true})}
                    icon={<Icon name="edit" size={25} color="#01426A" />}
                    buttonStyle={{ minHeight: '100%', minWidth: '50%', backgroundColor: 'light-gray', borderRightWidth: 1 }}
                />
                <Button
                    onPress={() => confirmRemoverProcesso(item)}
                    icon={<Icon name="delete" size={25} color="red" />}
                    buttonStyle={{ minHeight: '100%', minWidth: '50%', backgroundColor: 'light-gray' }}
                />
            </>
        )
    }

    function showProcessos({ item, index }) {
        return (
            <ListItem.Swipeable
                key={item.id}
                bottomDivider
                containerStyle={(index % 2 == 0) ? styles.contentPar : styles.contentImpar}
                rightContent={getActions(item)}
                rightStyle={styles.buttonContainer}
            // onPress={() => navigation.navigate('CadastrarPauta', item)}
            >
                <ListItem.Content>
                    <ListItem.Title style={styles.textItem} >Processo: {item.numero}</ListItem.Title>
                    <ListItem.Title style={styles.textItem} >Relator: {item.relator}</ListItem.Title>
                    <ListItem.Title style={styles.textItem} >Partes: {item.partes}</ListItem.Title>
                </ListItem.Content>
                <Icon name="arrow-left" size={30} color="black" />
            </ListItem.Swipeable>
        )
    }
    return (
        <View>
            {isLoading ?
                <View style={{height: '100%', flex: 0, justifyContent: "center", alignItems: "center" }}>
                    <ActivityIndicator size="large" color="#666" />
                </View>
                :
                <>
                    {
                        (processos.length) > 0 &&
                        <View>
                            <FlatList
                                keyExtractor={item => item.id}
                                data={processos}
                                renderItem={showProcessos}
                            />
                        </View>
                    }
                </>
            }
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
    buttonContainer: {
        flexDirection: 'row',

    },
    textItem: {
        color: '#000000',
        fontWeight: 'bold'
    },
    contentPar: {
        backgroundColor: '#9F9F9F'
    },
    contentImpar: {
        backgroundColor: '#D9D9D9'
    },
    seta: {
        width: vw * 0.05
    },
    textTitleProcesso: {
        marginLeft: 16,
        fontSize: 20,
        padding: 3,
        color: '#01426A',
        fontWeight: 'bold'
    },
});  