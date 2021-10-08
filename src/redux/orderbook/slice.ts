import { createSlice } from '@reduxjs/toolkit';
import { uniqBy } from 'lodash';

import { ProductIds, OrderPayload, OrderBookMap } from './types';
import { filterPriceLevel, includeCummulative } from '../../utils/book';

export type OrderBookState = OrderBookMap & { activeProduct: ProductIds };

const initialState = { activeProduct: 'PI_XBTUSD' } as OrderBookState;

const slice = createSlice({
  name: 'orderbook',
  initialState,
  reducers: {
    upsert: (state, { payload }: { payload: OrderPayload }) => {
      const productId = payload.product_id;
      const product = state[productId] || { asks: [], bids: [] };
      const filteredAsks = filterPriceLevel(payload.asks);
      const filteredBids = filterPriceLevel(payload.bids);

      const updatedAsks = uniqBy(product.asks.concat(filteredAsks), ({ price }) => price);
      const updatedBids = uniqBy(product.bids.concat(filteredBids), ({ price }) => price);

      const formatAsks = includeCummulative(product.asks.concat(updatedAsks));
      const formatBids = includeCummulative(product.bids.concat(updatedBids));

      const sortedAsks = uniqBy(formatAsks, ({ price }) => price);
      const sortedBids = uniqBy(formatBids, ({ price }) => price);

      const lowestAsk = sortedAsks[0].price || 0;
      const highestBid = sortedBids[0].price || 0;

      const spread = Math.abs(highestBid - lowestAsk);
      const midpoint = (lowestAsk + highestBid) / 2;

      const spreadPercentage = (spread / midpoint) * 100;

      return {
        ...state,
        [productId]: {
          ...state[productId],
          asks: sortedAsks,
          bids: sortedBids,
          spreadPercentage,
          productId,
          spread
        },
        activeProduct: productId
      };
    }
  }
});

export const { upsert } = slice.actions;

export default slice.reducer;
