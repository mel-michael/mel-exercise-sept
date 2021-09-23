import { createSlice } from '@reduxjs/toolkit';

type WSConnectionState = { connected: boolean };

const initialState: WSConnectionState = { connected: false };

export const slice = createSlice({
  name: 'wsconnection',
  initialState,
  reducers: {
    update: (state, { payload }: { payload: Partial<WSConnectionState> }) => ({
      ...state,
      ...payload
    })
  }
});

export const { update } = slice.actions;

export default slice.reducer;
