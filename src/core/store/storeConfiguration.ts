import { combineReducers, configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';

import { poiReducer } from './poi';


const poiPersistConfig = {
  key: 'poi',
  storage: AsyncStorage,
  blacklist: ['points', 'chargingStatus'],
};

const rootReducer = combineReducers({
  poi: persistReducer(poiPersistConfig, poiReducer),
});

const persistedReducer = persistReducer({
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  blacklist: ['poi'],
}, rootReducer);

const createStore = () => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
    devTools: __DEV__,
  });

  const persistor = persistStore(store);

  return {
    store,
    persistor,
  };
};

const { store, persistor } = createStore();

export type AppDispatch = typeof store.dispatch;

export {
  store,
  persistor
};
