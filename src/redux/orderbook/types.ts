export enum MarketList {
  PI_XBTUSD,
  PI_ETHUSD
}

export type Markets = keyof typeof MarketList;

export enum OrderSide {
  BUY = 'Buy',
  SELL = 'Sell'
}

export enum EventType {
  UNSUBSCRIBE = 'unsubscribe',
  SUBSCRIBE = 'subscribe'
}

export enum FeedType {
  book_ui_1 = 'book_ui_1',
  book_ui_1_snapshot = 'book_ui_1_snapshot'
}

export type Contract = {
  event: EventType;
  feed: FeedType;
  product_ids: Markets[];
};

export type OrderLevel = {
  price: number;
  size: number;
  total: number;
};

export type PriceAndSize = number[];

export type OrderBook = {
  asks: OrderLevel[];
  bids: OrderLevel[];
  spread: number;
  productId: Markets;
  spreadPercentage: number;
};

export type OrderBookMap = Record<Markets, OrderBook>;

export type OrderPayload = { feed: FeedType; product_id: Markets; bids: PriceAndSize[]; asks: PriceAndSize[] };
