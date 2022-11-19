import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddUser from '../screens/AddUser';

const { Screen, Navigator } = createNativeStackNavigator();

import Login from '../screens/Login';

// Rotas que podem ser acessadas sem estar autenticado
export function AuthRoutes() {
    return (
      <Navigator>
        <Screen name="Login" component={Login}></Screen>
        <Screen name="AddUser" component={AddUser} options={{ title: 'Cadastro de usuário' }}></Screen>
      </Navigator>
    );
  }
  