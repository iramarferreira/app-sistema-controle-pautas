import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, View } from 'react-native';
import { CgList } from 'react-icons/cg'


// Navegação por tabs
const { Screen, Navigator } = createBottomTabNavigator();

import Login from '../screens/Login';
import Processos from '../screens/Processos';
import CadastrarProcessos from '../screens/CadastrarProcessos';
import Pautas from '../screens/Pautas';
import CadastrarPauta from '../screens/CadastrarPauta';

// Rotas que podem ser acessadas se estiver autenticado
export function AppRoutes() {
  return (
    <Navigator screenOptions={{
      tabBarStyle: { backgroundColor: '#5A5A5A'},
      tabBarActiveBackgroundColor: '#01426A',
      tabBarLabelStyle: styles.text,
      tabBarItemStyle: styles.BarItemStyle,
      tabBarIconStyle: { display: "none" }

    }}>
      <Screen name='Pautas' component={Pautas} options={{ title: 'Pautas' }}></Screen>
      <Screen name='CadastrarPauta' component={CadastrarPauta} options={{ title: 'Cadastrar Pauta' }} ></Screen>
      <Screen name='Processos' component={Processos} options={{title: 'Processos'}}></Screen>
      <Screen name='CadastrarProcessos' component={CadastrarProcessos} options={{ title: 'Cadastrar Processos' }}></Screen>
     

    </Navigator>
  );
}


const styles = StyleSheet.create({

  text: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },


  BarItemStyle: {
    borderColor: '#FFFFFF',

    justifyContent: 'center',
    borderRadius: 2,
    paddingBottom: 2,
  },
});

