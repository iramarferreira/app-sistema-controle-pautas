import { createNativeStackNavigator } from '@react-navigation/native-stack';

const { Screen, Navigator } = createNativeStackNavigator();

import Login from '../screens/Login';
import Home from '../screens/Home';

// Rotas que podem ser acessadas se estiver autenticado
export function AppRoutes() {
    return (
      <Navigator>
        <Screen name='Home' component={Home}></Screen>
      </Navigator>
    );
  }
  