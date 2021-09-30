import { createSlice } from '@reduxjs/toolkit';
import { uniqBy, sortBy } from 'lodash';

import { filterPriceLevel, includeCummulative, OrderLevel } from '../../utils/book';

type OrderBookState = {
  asks: OrderLevel[];
  bids: OrderLevel[];
  spread: number;
  spreadPercentage: number;
};

const initialState: OrderBookState = {
  asks: [],
  bids: [],
  spread: 0,
  spreadPercentage: 0
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

      const sortedAsks = sortBy(updatedAsks, ({ price }) => price);
      const sortedBids = sortBy(updatedBids, ({ price }) => price).reverse();

      const lowestAsk = sortedAsks[0].price || 0;
      const highestBid = sortedBids[0].price || 0;

      const spread = highestBid - lowestAsk;
      const midpoint = (lowestAsk + highestBid) / 2;

      const spreadPercentage = (spread / midpoint) * 100;

      return {
        ...state,
        asks: sortedAsks,
        bids: sortedBids,
        spread,
        spreadPercentage
      };
    }
  }
});

export const { upsert } = slice.actions;

export default slice.reducer;
