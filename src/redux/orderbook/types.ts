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
  book_ui_2 = 'book_ui_2'
}

export type Contract = {
  event: EventType;
  feed: FeedType;
  product_ids: ProductIds[];
};
