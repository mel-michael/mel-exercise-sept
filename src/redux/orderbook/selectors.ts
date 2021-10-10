import { createSelector, Selector } from '@reduxjs/toolkit';

import { OrderBook, Markets } from './types';
import { OrderBookState } from './slice';
import { RootState } from '../store';

export type OrdersSelector = Selector<RootState, OrderBook>;

export type OrderBookSelector = Selector<RootState, OrderBookState>;

export const ordersSelector: OrderBookSelector = (state) => state.orderbook;

export const ordersByProduct = (id: Markets): OrdersSelector =>
  createSelector(ordersSelector, (orders) => orders[id]);
