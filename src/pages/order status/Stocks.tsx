import React from 'react';
import { supabase } from '../../supabase';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import StocksCard from '../../components/stocks detail/StocksCard';
import StockArea from '../../components/stocks detail/StockArea';
import { sortStockData } from '../../components/stocks detail/feature/sortData';

export interface Stock {
  id: string;
  type: string;
  name: string;
  count: number;
}
export interface SortedStockList {
  stock: Stock[];
}
// interface SortedStock

function Stocks() {
  const [stocks, setStocks] = useState<SortedStockList[] | null>(null);
  const params = useParams();
  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = async () => {
    try {
      const { data, error } = await supabase.from(`stocks_${params.id}`).select();
      if (error) {
        console.error('Error fetching orders:', error);
      } else if (data !== null) {
        setStocks(sortStockData(data));
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  return (
    <S.Container>
      {stocks?.map((stock: SortedStockList, index) => {
        return <StockArea key={index} stocks={stock}></StockArea>;
      })}
    </S.Container>
  );
}

// const StockArea = styled.div`
//   border: 1px solid black;
//   width: 400px;
//   margin: 20px;
//   padding: 10px;
// `;

export default Stocks;

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    /* background-color: royalblue; */
    width: 300px;
    padding-top: 20px;
    overflow-y: scroll;
  `,
  CaptionArea: styled.div`
    margin-top: 30px;
  `,
  Caption: styled.p`
    font-size: 18px;
    margin: 8px 0px 0px 15px;
    font-weight: 700;
    color: #b73d52;
  `,
  BtnArea: styled.div`
    height: 80px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 8px;
    border-bottom: 1px solid black;
    margin-left: 15px;
    margin-right: 15px;
  `,
  Name: styled.div`
    font-weight: 500;
    font-size: 24px;
  `,
  Address: styled.div`
    font-size: 18px;
  `,

  Btn: styled.button`
    width: calc(361px / 2 - 8px);
    padding: 8px;
    outline: none;
    border: 1px solid #226f54;
    border-radius: 50px;
    /* background-color: white; */
    font-size: 18px;
    color: #226f54;
  `
};
