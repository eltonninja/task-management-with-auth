import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import { useSelector as useAppSelector } from 'react-redux';
import storage from 'redux-persist/lib/storage';

import userReducer from './slices/user';
import todoReducer from './slices/todo';

const rootReducer = combineReducers({
  user: userReducer,
  todo: todoReducer,
});


export const createStore = () => {
  const persistedReducer = persistReducer({ key: 'todo-app', storage }, rootReducer);
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
    enhancers: [],
    devTools: process.env.NODE_ENV !== 'production',
  });

  const persistor = persistStore(store);
  return { store, persistor };
}


export const useSelector = useAppSelector;

export type AppStore = ReturnType<typeof createStore>['store'];
export type RootState = ReturnType<AppStore['getState']>;
