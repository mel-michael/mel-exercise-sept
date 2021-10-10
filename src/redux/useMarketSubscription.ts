import { useEffect } from 'react';

import { WS } from '../utils/ws';
import { useAppDispatch } from './hooks';
import { Contract, EventType, FeedType, Markets } from './orderbook/types';

type MarketProps = {
  event: EventType;
  productId: Markets;
};

export const useMarketSubscriptions = ({ event, productId }: MarketProps): void => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const message: Contract = { event, feed: FeedType.book_ui_1, product_ids: [productId] };
    if (productId && event === EventType.SUBSCRIBE) {
      WS.send(JSON.stringify(message));
    }
    if (productId && event === EventType.UNSUBSCRIBE) {
      WS.send(JSON.stringify(message));
    }

    return () => {
      message.event = EventType.UNSUBSCRIBE;
      WS.send(JSON.stringify(message));
    };
  }, [dispatch, productId, event]);
};


/**
 * 
 * 
 * "asks": [
    [
      43196.5,
      2812
    ],
    [
      43202,
      1403
    ],
  ]
 */
