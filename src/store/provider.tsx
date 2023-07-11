import { PropsWithChildren, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { AppStore, createStore } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import { Persistor } from 'redux-persist';

export const AppProvider = ({ children }: PropsWithChildren) => {
  const [store, setStore] = useState<AppStore | null>(null);
  const [persistor, setPersistor] = useState<Persistor | null>(null);
  useEffect(() => {
    const { store, persistor } = createStore();
    setStore(store);
    setPersistor(persistor);
  }, []);

  return !!store && !!persistor && (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
