export type OrderLevel = {
  price: number;
  size: number;
  total?: number;
};

export enum SortOrder {
  desc = 'desc',
  asc = 'asc'
}

// Price Level : [price, size][]
type PriceLevel = number[];

export const filterPriceLevel = (arr: PriceLevel[]): OrderLevel[] =>
  arr.filter((data) => data[data.length - 1] !== 0).map((level) => ({ price: level[0], size: level[1] }));

export const includeCummulative = (arr: OrderLevel[]) =>
  arr.slice().reduce((acc, cur, index) => {
    const cumulative = cur.size || 0;
    cur.total = acc[index] ? acc[index].size + cumulative : cumulative;
    acc.push(cur);
    return acc;
  }, [] as OrderLevel[]);
