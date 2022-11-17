import { StyleSheet, View, Dimensions } from 'react-native';
import { Text, Button } from '@rneui/base';
import { useState, useContext  } from 'react';
import AuthContext from '../contexts/auth';

const screen = Dimensions.get("screen");

const vh = screen.height;
const vw = screen.width;

export default function Home() {

    const {signOut} = useContext(AuthContext)

    function clickSair(){
        signOut();
    }

    return (

        <View style={styles.container}>

            <Text>Hello World</Text>
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
