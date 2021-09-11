/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect } from 'react';
import OnBoard from './src/screens/OnBoard';
import CreatePasscode from './src/screens/CreatePasscode';
import EnterInformation from './src/screens/EnterInformation';
import { UserDataProvider } from './src/context/UserDataProvider';
import Home from './src/screens/Home';

function App() {
  return (
    <UserDataProvider>
      <Home/>
    </UserDataProvider>
  )
}

export default App;
