import React from 'react';
import { styled } from 'styled-components';
import { Stock } from '../../pages/order status/Stocks';
import { supabase } from '../../supabase';
import { useParams } from 'react-router-dom';

interface Props {
  stock: Stock;
}

const StocksCard = ({ stock }: Props) => {
  const params = useParams();

  const getMoreStocks = async (id: string, prev: number) => {
    try {
      const { data, error } = await supabase
        .from(`stocks_${params.id}`)
        .update({ count: prev + 20 })
        .eq('id', id)
        .select();
    } catch (error) {
      console.error('Error Updating orders:', error);
    }
  };

  return (
    <S.Container>
      <S.StockBox>
        <S.StockArea>
          <S.Name>{stock.name}</S.Name>
          <S.Category>{stock.type}</S.Category>
        </S.StockArea>
        {stock.count <= 25 ? (
          <div
            style={{
              marginLeft: 'auto'
            }}
          >
            <S.Stocks>{stock.count}개</S.Stocks>
            <S.StocksNeedMore
              onClick={() => {
                getMoreStocks(stock.id, stock.count);
              }}
            >
              발주
            </S.StocksNeedMore>
          </div>
        ) : (
          <S.Stocks>{stock.count}개</S.Stocks>
        )}
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
  `,
  StockArea: styled.div`
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 8px;
  `,
  Stocks: styled.div`
    margin-left: auto;
    padding: 10px;
  `,
  StocksNeedMore: styled.div`
    margin-left: auto;
    background-color: #ffd99b;
    border-radius: 20px;
    padding: 10px;
    cursor: pointer;
    &:hover {
      background-color: #b73d52;
      color: white;
    }
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
