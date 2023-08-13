import React from 'react';
import { Order } from '../../model';
import { styled } from 'styled-components';
import OrderMenuDetail from './OrderMenuDetail';
import { getTimeFromPostgreSQL, orderStateChanger } from './feature/function';

interface Props {
  orders: Order[];
}

const OrderStateCard = ({ orders }: Props) => {
  return (
    <S.CardBox>
      {orders.map((order) => {
        return (
          <S.Card key={order.id}>
            <S.OrderInfoArea>
              <S.OrderInfoDetailArea>
                <S.OrderInfoDetailTitle>{order.user.name}</S.OrderInfoDetailTitle> <span>님</span>
                <S.OrderInfoDetailSub>
                  {order.id.slice(0, 8)} | {getTimeFromPostgreSQL(order.time)}
                </S.OrderInfoDetailSub>
              </S.OrderInfoDetailArea>
              <S.OrderInfoDineInArea $changeColor={order.dineIn}>
                <S.OrderInfoDineIn>{order.dineIn ? '매장' : '포장'}</S.OrderInfoDineIn>
              </S.OrderInfoDineInArea>
            </S.OrderInfoArea>
            {/* 디테일한 주문 내역 */}
            <OrderMenuDetail order={order}></OrderMenuDetail>
            <S.ActionButton
              onClick={() => {
                orderStateChanger(order);
              }}
            >
              주문접수
            </S.ActionButton>
          </S.Card>
        );
      })}
      <S.DummyArea></S.DummyArea>
    </S.CardBox>
  );
};

export default OrderStateCard;

const S = {
  CardBox: styled.div`
    width: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 30px;
  `,
  Card: styled.div`
    border-radius: 20px;
    box-sizing: border-box;
    width: 100%;
    padding-bottom: 20px;
    overflow: hidden;
    box-shadow: 0 5px 5px 1px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
  `,
  OrderInfoArea: styled.div`
    width: 100%;
    background-color: #b73d52;
    padding: 20px;
    display: flex;
    align-items: center;
    color: white;
  `,
  OrderInfoDetailArea: styled.div``,
  OrderInfoDetailTitle: styled.span`
    font-size: 22px;
    font-weight: 700;
  `,
  OrderInfoDetailSub: styled.div`
    margin-top: 5px;
    font-size: 16px;
  `,
  OrderInfoDineInArea: styled.div<{ $changeColor: boolean }>`
    margin-left: auto;
    font-size: 20px;
    color: ${(props) => {
      return props.$changeColor ? '#FFFf00' : 'white';
    }};
  `,
  OrderInfoDineIn: styled.div``,
  SubInfoArea: styled.div``,
  SubInfoContent: styled.div``,
  ActionButton: styled.button`
    margin: 0 50px;
    padding: 15px;
    border-radius: 30px;
    outline: none;
    border: none;
    background-color: #b73d52;
    color: white;
    &:hover {
      transition: 0.5s;
      transform: scale(1.05);
      color: #ffff00;
      font-size: 22px;
    }
  `,
  PriceArea: styled.div``,
  DummyArea: styled.div``
};
