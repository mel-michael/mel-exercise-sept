import { createSlice } from '@reduxjs/toolkit';

type OrderBookState = {
  asks: number[];
  bids: number[];
};

const initialState: OrderBookState = {
  asks: [],
  bids: []
};

const slice = createSlice({
  name: 'orderbook',
  initialState,
  reducers: {
    upsert: (state, action) => {
      console.log('Payload', action);
      const data = JSON.parse(action.payload);
      console.log('DaATTA', data);

      return {
        ...state,
        asks: { ...state.asks, ...data.asks },
        bids: { ...state.bids, ...data.bids }
      };
    }
  }
});

export const { upsert } = slice.actions;

export default slice.reducer;
