import { useEffect } from 'react';

import { update } from '../redux/wsconnection/slice';
import { useAppSelector, useAppDispatch } from '../redux';

export const useDataFeed = () => {
  const dispatch = useAppDispatch();
  const dataFeedUrl = process.env.REACT_APP_DATA_FEED;
  const { connected } = useAppSelector((state) => state.wsconnection);

  useEffect(() => {
    if (dataFeedUrl) {
      const socket = new WebSocket(dataFeedUrl);

      socket.onopen = function (e) {
        dispatch(update({ connected: true }));
      };

      socket.onmessage = function (event) {
        console.log('>>> ', event.data);
      };

      socket.onclose = function (event) {
        dispatch(update({ connected: false }));
      };

      socket.onerror = function (error) {
        console.error('[error]::', error);
      };
    }
  }, [dataFeedUrl, dispatch]);

  return { connected };
};
