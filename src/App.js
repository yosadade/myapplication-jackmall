import React from 'react';
import {Home} from './pages';
import FlashMessage from 'react-native-flash-message';

const App = () => {
  return (
    <>
      <Home />
      <FlashMessage position="top" />
    </>
  );
};

export default App;
