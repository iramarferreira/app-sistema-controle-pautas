import { createNativeStackNavigator } from '@react-navigation/native-stack';

const { Screen, Navigator } = createNativeStackNavigator();

import Login from './screens/Login';

export function Routes() {
    return (
      <Navigator>
        <Screen name="Login" component={Login}></Screen>
      </Navigator>
    );
  }
  