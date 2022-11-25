import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Dimensions, ActivityIndicator, Alert } from 'react-native';
import { Button, Text, Input, Image, Icon } from '@rneui/base';
import { useState, useContext, useEffect } from 'react';
import { login } from '../service/auth.service';
import AuthContext from '../contexts/auth';
import logoTST from '../assets/logo_tst.png';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './RootStackParamList';
import * as LocalAuthentication from 'expo-local-authentication'



const BASE_URI_logo = Image.resolveAssetSource(logoTST).uri;

const screen = Dimensions.get("screen");

const vh = screen.height;
const vw = screen.width;


type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;


export default function Login({ navigation }: Props) {
  const { signed, biometriaValida, user, token, signIn } = useContext(AuthContext);

  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loadingLogin, setLoadingLogin] = useState(false);

  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const [biometric, setBiometric] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('visibility');

  // Check if hardware supports biometrics
  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);
      if (compatible)
        handleBiometricAuth()
    })();


  }, []);





  const handleBiometricAuth = async () => {
    if ((user != null) && (token != '')) {
      // verificar se tem biometria salva
      console.log("Entrou")
      const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
      if (!savedBiometrics) {
        return Alert.alert(
          'Biometria não cadastrada',
          'Por favor, confirme seu login com usuário e senha',
          [{ text: "OK", onPress: () => console.log("Não encontrado biometria") }]
        );
      } else {

        let LocalAuthenticationOptions = {
          promptMessage: "Login com Biometria",
          cancelLabel: "Cancelar",
          disableDeviceFallback: true
        }

        let result = await LocalAuthentication.authenticateAsync(LocalAuthenticationOptions);
        if (result.success) {
          setBiometric(true)
          biometriaValida()
          return
        }
      }

    }
    return

  }


  // if (isBiometricSupported && !biometric && (user != null) && (token != '')) {
  //   handleBiometricAuth()
  //   return
  // }

  async function clickLogin() {
    setLoadingLogin(true)
    await signIn(username, password)
    console.log(token)
    console.log(user)
    setLoadingLogin(false)

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
        <Input style={styles.textInput}
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
          placeholder='senha'
          rightIcon={
            <Icon
              name={rightIcon}
              size={24}
              onPress={() => handlePasswordVisibility()}
            />
          }

          secureTextEntry={passwordVisibility}
          onChangeText={value => setPassword(value)}
        />

        <Button
          title='Entrar'

          loading={loadingLogin}
          buttonStyle={{
            backgroundColor: '#01426A',
          }}
          onPress={clickLogin}
          disabled={(password.length < 6 || password.length > 40) || (username.length == 0)}
        />

        <Button
          title='Cadastro'
          buttonStyle={{
            backgroundColor: '#DCDCDC',
          }}
          containerStyle={{
            marginTop: 10,
          }}
          titleStyle={{ marginHorizontal: 20, color: 'black' }}

          onPress={() => navigation.navigate('AddUser')}
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
