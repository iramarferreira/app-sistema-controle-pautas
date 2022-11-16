import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Button, Text, Input } from '@rneui/base';
import { useState, useContext  } from 'react';
import { login } from '../service/auth.service';
import AuthContext from '../contexts/auth';


const screen = Dimensions.get("screen");

const vh = screen.height;
const vw = screen.width;

export default function Login() {
  const { signed, user, token, signIn } = useContext(AuthContext);

  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');


  function clickLogin(){
    signIn(username, password)
    console.log(token)
    console.log(user)
  }


  return (
    <View style={styles.container}>

      <View style={styles.viewUsername}>
        <Text style={styles.text}>Username</Text>
        <Input style={styles.textInput}
          placeholder='Digite seu username'
          onChangeText={value => setUsername(value)}

        />
      </View>

      <View style={styles.viewPassword}>
        <Text style={styles.text}>Senha</Text>
        <Input style={styles.textInput}
          placeholder='Digite sua senha'
          secureTextEntry={true}
          onChangeText={value => setPassword(value)}
        />


        <Button
          title='Entrar'
          onPress={clickLogin}
        />
      </View>


    </View>
  );
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

  viewUsername: {
    width: 0.8*vw,

  },

  viewPassword: {
    width: 0.8*vw,
  },

  text: {
    marginLeft: 6,
    fontSize: 20,
  },

  textInput: {
    margin: 0,
    padding: 0,
    width: vw,
  }
});
