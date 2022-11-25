import { StyleSheet, View, Dimensions, Alert, FlatList, ActivityIndicator } from 'react-native';
import { Text, Button, ListItem, Icon } from '@rneui/base';
import { useState, useContext, useEffect } from 'react';
import AuthContext from '../contexts/auth';
import { getPautas, deletePauta } from '../service/pauta.service';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useIsFocused } from '@react-navigation/native';



const screen = Dimensions.get("screen");

const vh = screen.height;
const vw = screen.width;

export default function Pautas({ navigation }) {

    const [pautas, setPautas] = useState<any>([])
    const [isLoading, setIsLoading] = useState(true)
    const [pautasDay, setPautasDay] = useState<any>([])
    const [pautasMes, setPautasMes] = useState<any>([])

    const isFocused = useIsFocused();

    const { signOut } = useContext(AuthContext)


    useEffect(() => {
        carregarDados()
   
        console.log('teste')
    }, [isFocused])



    async function carregarDados() {
        
        await getPautas()
            .then((res) => {
                setPautas(res)
                preencherPautasArray(res)
                console.log(res)
            })
            .catch((e) => {
                console.log(e)
            })
    }


    function clickSair() {
        signOut();
        // getTest()
    }

    function today() {
        let date = new Date();
        let dateString;
        dateString = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear()
        return dateString;
    }

    async function deletarPauta(id: string) {
        await deletePauta(id)
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

    function preencherPautasArray(arr: []) {
        let date = new Date();
        let arrayDay: any = []
        let arrayMes: any = []
        arr.forEach((element: any) => {
            if (element.dataSessao[0] == date.getFullYear() &&
                element.dataSessao[1] == date.getMonth()+1 &&
                element.dataSessao[2] == date.getDate()) {
                arrayDay.push(element)
            }
            else if (element.dataSessao[0] == date.getFullYear() &&
                element.dataSessao[1] == date.getMonth()+1 &&
                element.dataSessao[2] != date.getDate() &&
                element.dataSessao[2] > date.getDate()) {
                arrayMes.push(element)
            }
        });

        setPautasDay(arrayDay)
        setPautasMes(arrayMes)
        setIsLoading(false)
    }

    function confirmRemoverPauta(item) {
        console.log(item)
        Alert.alert('Excluir Pauta', 'Deseja excluir a pauta?', [
            {
                text: 'Sim',
                onPress() {
                    // console.log("remove pauta")
                    deletarPauta(item.id)
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
                    onPress={() => navigation.navigate('CadastrarPauta', {item ,update: true})}
                    icon={<Icon name="edit" size={25} color="#01426A" />}
                    buttonStyle={{ minHeight: '100%', minWidth: '50%', backgroundColor: 'light-gray', borderRightWidth: 1 }}
                />
                <Button
                    onPress={() => confirmRemoverPauta(item)}
                    icon={<Icon name="delete" size={25} color="red" />}
                    buttonStyle={{ minHeight: '100%', minWidth: '50%', backgroundColor: 'light-gray' }}
                />
            </>
        )
    }

    function getPautaItemDay({ item, index }) {
        return (

            <ListItem.Swipeable
                key={item.id}
                bottomDivider
                containerStyle={(index % 2 == 0) ? styles.contentPar : styles.contentImpar}
                rightContent={getActions(item)}
                rightStyle={styles.buttonContainer}
            // onPress={() => navigation.navigate('CadastrarPauta', item)}
            >


                <ListItem.Content  >
                    <ListItem.Title style={styles.textItem} >Número: {item.id}</ListItem.Title>
                    <ListItem.Title style={styles.textItem} >Órgão Judicante: {item.orgaoJudicante}</ListItem.Title>
                    <ListItem.Title style={styles.textItem} >Sistema: {item.sistemaPauta}</ListItem.Title>
                    <ListItem.Title style={styles.textItem} >Meio julgamento: {item.meioJulgamento}</ListItem.Title>


                </ListItem.Content>
                <Icon name="arrow-left" size={30} color="black" />

            </ListItem.Swipeable>



        )
    }

    function getPautaItemMeses({ item, index }) {
        return (

            <ListItem.Swipeable
                key={item.id}
                bottomDivider
                containerStyle={(index % 2 == 0) ? styles.contentPar : styles.contentImpar}
                rightContent={getActions(item)}
                rightStyle={styles.buttonContainer}
            // onPress={() => navigation.navigate('CadastrarPauta', item)}
            >
                <ListItem.Content  >
                    <ListItem.Title style={styles.textItem} >Número: {item.id}</ListItem.Title>
                    <ListItem.Title style={styles.textItem} >Órgão Judicante: {item.orgaoJudicante}</ListItem.Title>
                    <ListItem.Title style={styles.textItem} >Sistema: {item.sistemaPauta}</ListItem.Title>
                    <ListItem.Title style={styles.textItem} >Meio julgamento: {item.meioJulgamento}</ListItem.Title>
                    <ListItem.Title style={styles.textItem} >Data: {item.dataSessao[2]}/{item.dataSessao[1]}/{item.dataSessao[0]}</ListItem.Title>

                </ListItem.Content>
                <Icon name="arrow-left" size={30} color="black" />
                {/* <ListItem.Chevron size={25} color={'black'} /> */}
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
                        (pautasDay.length) > 0 &&
                        <View>
                            <Text style={styles.textTitlePauta}>Hoje - {today()}</Text>
                            <FlatList
                                keyExtractor={item => item.id}
                                data={pautasDay}
                                renderItem={getPautaItemDay}
                            />

                        </View>

                    }

                    {

                        (pautasMes.length) > 0 &&
                        <View>
                            <Text style={styles.textTitlePauta}>Ainda este mês</Text>
                            <FlatList
                                keyExtractor={(item) => item.id}
                                data={pautasMes}
                                renderItem={getPautaItemMeses}
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
    textTitlePauta: {
        marginLeft: 16,
        fontSize: 20,
        padding: 3,
        color: '#01426A',
        fontWeight: 'bold'
    },
});  
