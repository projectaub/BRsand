import React from 'react';
import { Order } from '../../model';
import { styled } from 'styled-components';
import OrderMenuDetail from './OrderMenuDetail';
import { getTimeFromPostgreSQL, orderStateChanger } from './feature/function';
import { supabase } from '../../supabase';

interface Props {
  orders: Order[];
}
const OrderStateCard = ({ orders }: Props) => {
  return (
    <S.CardBox>
      {orders.map((order) => {
        return (
          <S.Card key={order.id}>
            <S.SubInfoArea>
              <S.SubInfoContent>{order.dineIn ? '매장 식사' : '포장'}</S.SubInfoContent>
              <S.SubInfoContent>{order.orderMenu.bread !== undefined ? '커스텀' : '완제품'}</S.SubInfoContent>
              <S.SubInfoContent>{order.isActive ? '조리중' : '접수 대기중'}</S.SubInfoContent>
            </S.SubInfoArea>
            <S.MainInfoArea>
              <p>주문번호 : {order.id.slice(0, 8)}</p>
              <p>주문시간 : {getTimeFromPostgreSQL(order.time)}</p>
              <h2>주문자명 : {order.user.name}</h2>
            </S.MainInfoArea>

            {/* 디테일한 주문 내역 */}
            <OrderMenuDetail order={order}></OrderMenuDetail>

            <S.PriceArea>최종 결제 금액 : {order.price}원</S.PriceArea>
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
    </S.CardBox>
  );
};

export default OrderStateCard;

const S = {
  CardBox: styled.div`
    border-radius: 10px;
    border: 1px solid black;
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  `,
  Card: styled.div`
    border-radius: 10px;
    border: 1px solid black;
    padding: 20px;
    width: 300px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  `,
  MainInfoArea: styled.div`
    font-size: 18px;
    font-weight: 500;
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: orange;
    padding: 10px;
    border-radius: 10px;
  `,
  SubInfoArea: styled.div`
    display: flex;
    gap: 5px;
  `,
  SubInfoContent: styled.div`
    padding: 10px;
    color: white;
    background-color: royalblue;
    border-radius: 10px;
  `,

  ActionButton: styled.button`
    padding: 10px;
    color: white;
    background-color: royalblue;
    border-radius: 10px;
    outline: none;
    border: none;
    font-size: 18px;
  `,
  PriceArea: styled.div`
    padding: 10px;
    color: white;
    background-color: royalblue;
    border-radius: 10px;
    text-align: right;
  `
};
