import React from 'react';
import StocksCard from './StocksCard';
import { styled } from 'styled-components';
import { SortedStockList } from '../../pages/order status/Stocks';

interface Props {
  stocks: SortedStockList;
}

const StockArea = ({ stocks }: Props) => {
  //   console.log(stocks.stock);

  return (
    <S.Container>
      <S.StockTitle>{stocks.stock[0].type}</S.StockTitle>
      {stocks.stock.map((item) => {
        return <StocksCard key={item.id} stock={item}></StocksCard>;
      })}
    </S.Container>
  );
};

export default StockArea;

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    /* background-color: royalblue; */
    gap: 10px;
  `,
  StockTitle: styled.div`
    font-size: 20px;
    font-weight: 700;
    text-align: center;
    background-color: #ffd99b;
    padding: 10px;
    margin: 10px 20px;
    border-radius: 30px;
  `
};
