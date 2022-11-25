import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Dimensions, ActivityIndicator, Alert } from 'react-native';
import { Button, Text, Input, Image, Icon } from '@rneui/base';
import { useState, useContext } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AuthContext from '../contexts/auth';
import logoTST from '../assets/logo_tst.png';
import { RootStackParamList } from './RootStackParamList';
import {register} from '../service/auth.service';
import { UserRegister } from '../models/UserRegister';


const BASE_URI_logo = Image.resolveAssetSource(logoTST).uri;

const screen = Dimensions.get("screen");

const vh = screen.height;
const vw = screen.width;


type Props = NativeStackScreenProps<RootStackParamList, 'AddUser'>;


export default function AddUser({navigation }: Props) {
  const { signed, user, token, signIn } = useContext(AuthContext);

  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('visibility');


  async function cadastrarUser() {
    setLoadingAdd(true)
    let roles = ['user']
    let userRegister: UserRegister = {};
    if(username == ''){
      alert('Preenche o nome do usuário')
      return 
    }
    else if(email == ''){
      alert('Preenche um email')
      return 
    }
    userRegister.username = username
    userRegister.email = email
    userRegister.role = roles
    userRegister.password = password

    // cadastrar um usuário
    await register(userRegister)
      .then((res) => {
        if(res.status === 200){
          Alert.alert('Usuário cadastrado', 'Agora realize o login')
          navigation.navigate('Login')
        }else{
          Alert.alert('Erro','Aconteceu algum erro no cadastro do usuário')
          Alert.alert(res.data)
        }
      })
      .catch((e) => {
        console.log(e.response.data)
        if(e.response.status === 400 && e.response.data?.message.includes('Username')){
          Alert.alert('Erro','Nome de usuário já existente')
        }
        else if(e.response.status === 400 && e.response.data?.message.includes('Email')){
          Alert.alert('Erro','Email já existente')
        }
        else if(e.response.status === 500){
          Alert.alert('Error')
        }
    })
    setLoadingAdd(false)
   
  }

  const handlePasswordVisibility = () => {
    if (rightIcon === 'visibility') {
      setRightIcon('visibility-off');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'visibility-off') {
      setRightIcon('visibility');
      setPasswordVisibility(!passwordVisibility);
    }
  };

  return (
    <View style={styles.container}>

      <View style={styles.viewLogo}>
        <Image
          source={{ uri: BASE_URI_logo }}
          PlaceholderContent={<ActivityIndicator />}
          containerStyle={styles.image}
        />
      </View>

      <View style={styles.viewForm}>
        {/* <Text style={styles.text}>Username</Text> */}
        <Input 
          style={styles.textInput}
          leftIcon={
            <Icon
              name='supervised-user-circle'
              size={24}
            />
          }
          placeholder='Nome do usuário'
          onChangeText={value => setUsername(value)}

        />

        <Input style={styles.textInput}
          rightIcon={
            <Icon
              name={rightIcon}
              size={24}
              onPress={() => handlePasswordVisibility()}
          />
        }
          placeholder='Senha (6 a 40 caracteres)'
          secureTextEntry={passwordVisibility}
          onChangeText={value => setPassword(value)}
        />

        <Input style={styles.textInput}
         leftIcon={
          <Icon
            name='email'
            size={24}
          />
        }
          placeholder='Email'
          onChangeText={value => setEmail(value)}
        />


        <Button
          title='Cadastrar'
          loading={loadingAdd}
          buttonStyle={{
            backgroundColor: '#01426A',
          }}
          onPress={cadastrarUser}
          disabled={(password.length < 6 || password.length > 40) || (!(email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)?.length > 0))}
        />

        <Button
          title='Cancelar'
          buttonStyle={{
            backgroundColor: '#DCDCDC',
          }}
          containerStyle={{
            marginTop: 10,
          }}
          titleStyle={{ marginHorizontal: 20, color: 'black' }}
          onPress={() => navigation.navigate('Login')}
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
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  },


  viewForm: {
    width: 0.9 * vw,
    marginTop: 30
  },

  textInput: {
    margin: 0,
    padding: 0,
    width: vw,
  },

  viewLogo: {
    width: vw,
    marginTop: 0.1 * vh,
    alignItems: 'center'
  },

  image: {

    width: 300,
    height: 146
  },
});
