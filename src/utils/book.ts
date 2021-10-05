export type OrderLevel = {
  price: number;
  size: number;
  total: number;
};

export enum SortOrder {
  desc = 'desc',
  asc = 'asc'
}

type PriceAndSize = number[];

export const filterPriceLevel = (arr: PriceAndSize[]): OrderLevel[] =>
  arr.filter((data) => data[data.length - 1] !== 0).map((level) => ({ price: level[0], size: level[1], total: 0 }));

export const includeCummulative = (arr: OrderLevel[]) =>
  arr.slice().reduce((acc, cur, index) => {
    const cumulative = acc[index - 1] ? acc[index - 1].total : 0;
    acc.push({ ...cur, total: cur.size + cumulative });
    return acc;
  }, [] as OrderLevel[]);
