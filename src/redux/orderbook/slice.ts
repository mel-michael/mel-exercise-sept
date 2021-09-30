import { createSlice } from '@reduxjs/toolkit';
import { uniqBy, sortBy } from 'lodash';

import { filterPriceLevel, includeCummulative, OrderLevel } from '../../utils/book';

type OrderBookState = {
  asks: OrderLevel[];
  bids: OrderLevel[];
};

const initialState: OrderBookState = {
  asks: [],
  bids: []
};

const slice = createSlice({
  name: 'orderbook',
  initialState,
  reducers: {
    upsert: (state, { payload }) => {
      const formatBids = includeCummulative(filterPriceLevel(payload.bids));
      const formatAsks = includeCummulative(filterPriceLevel(payload.asks));

      const updatedAsks = uniqBy(state.asks.concat(formatAsks), ({ price }) => price);
      const updatedBids = uniqBy(state.bids.concat(formatBids), ({ price }) => price);

      return {
        ...state,
        asks: sortBy(updatedAsks, ({ price }) => price),
        bids: sortBy(updatedBids, ({ price }) => price).reverse()
      };
    }
  }
});

export const { upsert } = slice.actions;

export default slice.reducer;
