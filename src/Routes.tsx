import { createNativeStackNavigator } from '@react-navigation/native-stack';

const { Screen, Navigator } = createNativeStackNavigator();

import Login from './screens/Login';
import Home from './screens/Home';

export function Routes() {
    return (
      <Navigator>
        <Screen name="Login" component={Login}></Screen>
        <Screen name='Home' component={Home}></Screen>
      </Navigator>
    );
  }
  