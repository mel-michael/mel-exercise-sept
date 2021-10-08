export enum Products {
  PI_XBTUSD,
  PI_ETHUSD
}

export type ProductIds = keyof typeof Products;

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
  product_ids: ProductIds[];
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
  productId: ProductIds;
  spreadPercentage: number;
};

export type OrderBookMap = Record<ProductIds, OrderBook>;

export type OrderPayload = { feed: FeedType; product_id: ProductIds; bids: PriceAndSize[]; asks: PriceAndSize[] };
