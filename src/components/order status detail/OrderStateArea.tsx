import React from 'react';
import { styled } from 'styled-components';
import { Order } from '../../model';
import OrderStateCard from './OrderStateCard';

interface Props {
  orderList: Order[];
}

const OrderStateArea = ({ orderList }: Props) => {
  // console.log(orderList);
  const orders = orderList;

  return (
    <S.Container>
      <S.Wrapper>
        <S.Title>신규주문</S.Title>
        <OrderStateCard orders={orders.filter((item) => item.isActive === false)}></OrderStateCard>
      </S.Wrapper>
      <S.Wrapper>
        <S.Title>주문현황</S.Title>
        <OrderStateCard orders={orders.filter((item) => item.isActive === true)}></OrderStateCard>
      </S.Wrapper>
    </S.Container>
  );
};

export default OrderStateArea;

const S = {
  Container: styled.div`
    display: flex;
  `,
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 30px;
  `,
  Title: styled.div`
    font-size: 24px;
    font-weight: 700;
    color: green;
  `
};
