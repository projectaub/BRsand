import React from 'react';
import { styled } from 'styled-components';
import { Stock } from '../../pages/order status/Stocks';

interface Props {
  stock: Stock;
}

const StocksCard = ({ stock }: Props) => {
  return (
    <S.Container>
      <S.StockBox>
        <S.StockArea>
          <S.Name>{stock.name}</S.Name>
          <S.Category>{stock.type}</S.Category>
        </S.StockArea>
        <S.Stocks>{stock.count}개</S.Stocks>
      </S.StockBox>
    </S.Container>
  );
};

export default StocksCard;

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
  `,
  StockBox: styled.div`
    display: flex;
    margin: 0 20px;
    align-items: center;
    padding: 15px 20px;
    border-bottom: 1px solid black;
    /* background-color: orange; */
  `,
  StockArea: styled.div`
    /* height: 80px; */
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 8px;
  `,
  Stocks: styled.div`
    margin-left: auto;
  `,
  Name: styled.div`
    font-weight: 500;
    font-size: 18px;
  `,
  Category: styled.div`
    font-size: 12px;
  `,

  Btn: styled.button`
    width: calc(361px / 2 - 8px);
    padding: 8px;
    outline: none;
    border: 1px solid #226f54;
    border-radius: 50px;
    background-color: white;
    font-size: 18px;
    color: #226f54;
  `
};
