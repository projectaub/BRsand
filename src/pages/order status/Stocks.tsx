import React from 'react';
import { supabase } from '../../supabase';
import { useEffect, useState } from 'react';

interface Stock {
  id: string;
  type: string;
  name: string;
  count: number;
}

function Stocks() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  useEffect(() => {
    fetchOrders();
  }, [stocks]);

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase.from('stocks').select();
      if (error) {
        console.error('Error fetching orders:', error);
      } else if (data !== null) {
        setStocks(data);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const getMoreStocks = async (id: any, count: number) => {
    try {
      const { data, error } = await supabase
        .from('stocks')
        .update({ count: count + 20 })
        .eq('id', id);
    } catch (error) {
      console.error('Error Updating orders:', error);
    }
  };
  return (
    <div>
      <h1>재고현황</h1>
      {stocks.map((stock) => (
        <div id={stock.id}>
          <h1>
            {stock.name} : {stock.count}
          </h1>
          <p>{stock.type}</p>
          {stock.count <= 5 && <button onClick={() => getMoreStocks(stock.id, stock.count)}>발주</button>}
        </div>
      ))}
    </div>
  );
}

export default Stocks;
