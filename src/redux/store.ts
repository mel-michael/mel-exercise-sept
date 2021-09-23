import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

import wsconnectionReducer from './wsconnection/slice';

const reducers = {
  wsConnection: wsconnectionReducer
};

const rootReducers = combineReducers(reducers);

const store = configureStore({
  reducer: rootReducers
});

export type RootState = ReturnType<typeof combineReducers>;
type AppDispatch = typeof store.dispatch;

export const useApDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
