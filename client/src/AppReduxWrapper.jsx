import React from 'react';
import AppRouter from 'src/AppRouter';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import store from 'src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';

const persistor = persistStore(store);

const AppContainer = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AppRouter />
    </PersistGate>
  </Provider>
);

export default AppContainer;
