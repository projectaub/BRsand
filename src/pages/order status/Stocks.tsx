import React from 'react';
import { supabase } from '../../supabase';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';

interface Stock {
  id: string;
  type: string;
  name: string;
  count: number;
}

function Stocks() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const params = useParams();
  useEffect(() => {
    fetchStocks();
  }, [stocks]);

  const fetchStocks = async () => {
    try {
      const { data, error } = await supabase.from(`stocks_${params.id}`).select();
      if (error) {
        console.error('Error fetching orders:', error);
      } else if (data !== null) {
        setStocks(data);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const getMoreStocks = async (id: string, count: number) => {
    try {
      const { data, error } = await supabase
        .from(`stocks_${params.id}`)
        .update({ count: count + 20 })
        .eq('id', id);
    } catch (error) {
      console.error('Error Updating orders:', error);
    }
  };

  return (
    <>
      <h1>재고현황</h1>
      <StockArea>
        {stocks.map((stock) => (
          <div id={stock.id}>
            <p>
              {stock.name} : {stock.count}
            </p>
            {stock.count <= 10 && <button onClick={() => getMoreStocks(stock.id, stock.count)}>발주</button>}
          </div>
        ))}
      </StockArea>
    </>
  );
}

const StockArea = styled.div`
  border: 1px solid black;
  width: 400px;
  margin: 20px;
  padding: 10px;
`;

export default Stocks;
