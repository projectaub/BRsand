import React from 'react';
import { Order } from '../../model';
import { styled } from 'styled-components';
import OrderMenuDetail from './OrderMenuDetail';
import { getTimeFromPostgreSQL, orderStateChanger } from './feature/function';
import { supabase } from '../../supabase';

interface Props {
  orders: Order[];
}

interface StyledProps {
  BgColor: boolean;
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
              <S.OrderInfoDineInArea dineIn={order.dineIn}>
                <S.OrderInfoDineIn>{order.dineIn ? '매장' : '포장'}</S.OrderInfoDineIn>
              </S.OrderInfoDineInArea>
            </S.OrderInfoArea>

            <S.SubInfoArea>
              {/* <S.SubInfoContent></S.SubInfoContent> */}
              {/* <S.SubInfoContent>{order.orderMenu.bread !== undefined ? '커스텀' : '완제품'}</S.SubInfoContent> */}
              {/* <S.SubInfoContent>{order.isActive ? '조리중' : '접수 대기중'}</S.SubInfoContent> */}
            </S.SubInfoArea>
            {/* 디테일한 주문 내역 */}
            <OrderMenuDetail order={order}></OrderMenuDetail>

            {/* <S.PriceArea>최종 결제 금액 : {order.price}원</S.PriceArea> */}
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
    flex-direction: column;
    /* background-color: orange; */
    gap: 30px;
  `,
  Card: styled.div`
    border-radius: 20px;
    box-sizing: border-box;
    width: 100%;
    /* background-color: royalblue; */
    padding-bottom: 20px;
    overflow: hidden;
    box-shadow: 0 5px 5px 1px rgba(0, 0, 0, 0.1);
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
  OrderInfoDineInArea: styled.div<{ dineIn: boolean }>`
    margin-left: auto;
    font-size: 20px;
    color: ${(props) => {
      return props.dineIn ? '#FFFf00' : 'white';
    }};
  `,
  OrderInfoDineIn: styled.div``,
  SubInfoArea: styled.div``,
  SubInfoContent: styled.div``,

  ActionButton: styled.button``,
  PriceArea: styled.div``,
  DummyArea: styled.div``
};
