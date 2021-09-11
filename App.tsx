/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import { UserDataProvider } from './src/context/UserDataProvider';
import Home from './src/screens/Home';
import OnBoard from './src/screens/OnBoard';
import CreatePasscode from './src/screens/CreatePasscode';
import EnterInformation from './src/screens/EnterInformation';

function App() {
  const [sc, setSc] = useState("OnBoard");
  // React navigation libraries are all shitty

  return (
      <UserDataProvider>
        {sc === "OnBoard" && <OnBoard navigation={{navigate: (s) => setSc(s)}}/>}
        {sc === "CreatePasscode" && <CreatePasscode navigation={{navigate: (s) => setSc(s)}} />}
        {sc === "EnterInformation" && <EnterInformation navigation={{navigate: (s) => setSc(s)}}/>}
        {sc === "Home" && <Home/>}
      </UserDataProvider>
  )
}

export default App;
