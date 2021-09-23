import { configureStore, combineReducers } from '@reduxjs/toolkit';

import wsconnectionReducer from './wsconnection/slice';

const reducers = {
  wsconnection: wsconnectionReducer
};

const rootReducers = combineReducers(reducers);

const store = configureStore({
  reducer: rootReducers
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
