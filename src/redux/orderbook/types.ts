export enum Markets {
  PI_XBTUSD,
  PI_ETHUSD
}

export enum OrderSide {
  BUY = 'Buy',
  SELL = 'Sell'
}

export enum EventType {
  UNSUBSCRIBE = 'unsubscribe',
  SUBSCRIBE = 'subscribe'
}

export type Contract = {
  event: EventType;
  feed: string;
  product_ids: (keyof typeof Markets)[];
};
