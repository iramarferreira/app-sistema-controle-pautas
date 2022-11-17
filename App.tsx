import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/contexts/auth';

import Routes from './src/routes/Routes';

const App = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Routes />
      </AuthProvider>

    </NavigationContainer>
  );
};

export default App;