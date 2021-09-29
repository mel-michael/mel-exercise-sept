import { configureStore, combineReducers } from '@reduxjs/toolkit';

import orderbookReducer from './orderbook/slice';
import wsconnectionReducer from './wsconnection/slice';

const reducers = {
  orderbook: orderbookReducer,
  wsconnection: wsconnectionReducer,
};

const rootReducers = combineReducers(reducers);

const store = configureStore({
  reducer: rootReducers
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
