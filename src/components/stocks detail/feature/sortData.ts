interface Stock {
  id: string;
  type: string;
  name: string;
  count: number;
}
interface SortedStockList {
  stock: Stock[];
}

export const sortStockData = (stock: Stock[]): SortedStockList[] => {
  const bread: Stock[] = [];
  const vegetable: Stock[] = [];
  const cheese: Stock[] = [];
  const base: Stock[] = [];

  stock.forEach((stock) => {
    if (stock.type === '베이스') {
      base.push(stock);
    } else if (stock.type === '야채') {
      vegetable.push(stock);
    } else if (stock.type === '빵') {
      bread.push(stock);
    } else {
      cheese.push(stock);
    }
  });

  const stockList: SortedStockList[] = [{ stock: base }, { stock: bread }, { stock: vegetable }, { stock: cheese }];
  console.log(stockList);

  return stockList;
};
