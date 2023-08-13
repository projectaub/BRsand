import { SortedStockList } from '../../../pages/order status/Stocks';
import { supabase } from '../../../supabase';

export const updateStockData = (
  stockList: SortedStockList[] | null,
  setStocks: React.Dispatch<React.SetStateAction<SortedStockList[] | null>>,
  id: string
) => {
  supabase
    .channel('custom-stock-channel')
    .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: `stocks_${id}` }, (payload) => {
      const newStockList = stockList?.map((stocks) => {
        const list = stocks.stock.map((item) => {
          if (item.id === payload.new.id) {
            return payload.new;
          } else {
            return item;
          }
        });
        return { stock: list };
      }) as SortedStockList[];
      console.log(newStockList);
      setStocks([...newStockList]);
    })
    .subscribe();
};
