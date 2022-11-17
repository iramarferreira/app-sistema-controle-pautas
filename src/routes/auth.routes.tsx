import { createNativeStackNavigator } from '@react-navigation/native-stack';

const { Screen, Navigator } = createNativeStackNavigator();

import Login from '../screens/Login';

// Rotas que podem ser acessadas sem estar autenticado
export function AuthRoutes() {
    return (
      <Navigator>
        <Screen name="Login" component={Login}></Screen>
      </Navigator>
    );
  }
  