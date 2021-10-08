import { createSlice } from '@reduxjs/toolkit';
import { uniqBy } from 'lodash';

import { ProductIds } from './types';
import { filterPriceLevel, includeCummulative, OrderLevel } from '../../utils/book';

type OrderBookState = {
  asks: OrderLevel[];
  bids: OrderLevel[];
  spread: number;
  productId: ProductIds;
  spreadPercentage: number;
};

const initialState: OrderBookState = {
  asks: [],
  bids: [],
  spread: 0,
  spreadPercentage: 0,
  productId: 'PI_XBTUSD'
};

const slice = createSlice({
  name: 'orderbook',
  initialState,
  reducers: {
    upsert: (state, { payload }) => {
      const filteredAsks = filterPriceLevel(payload.asks);
      const filteredBids = filterPriceLevel(payload.bids);

      const updatedAsks = uniqBy(state.asks.concat(filteredAsks), ({ price }) => price);
      const updatedBids = uniqBy(state.asks.concat(filteredBids), ({ price }) => price);

      const formatAsks = includeCummulative(state.asks.concat(updatedAsks));
      const formatBids = includeCummulative(state.bids.concat(updatedBids));

      const sortedAsks = uniqBy(formatAsks, ({ price }) => price);
      const sortedBids = uniqBy(formatBids, ({ price }) => price);

      const lowestAsk = sortedAsks[0].price || 0;
      const highestBid = sortedBids[0].price || 0;

      const spread = Math.abs(highestBid - lowestAsk);
      const midpoint = (lowestAsk + highestBid) / 2;

      const spreadPercentage = (spread / midpoint) * 100;

      return {
        ...state,
        spread,
        asks: sortedAsks,
        bids: sortedBids,
        spreadPercentage,
        productId: payload.product_id
      };
    }
  }
});

export const { upsert } = slice.actions;

export default slice.reducer;
