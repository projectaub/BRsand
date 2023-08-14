import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import { supabase } from '../../supabase';
import { useParams } from 'react-router-dom';
import { Order } from '../../model';
import OrderStateCard from './OrderStateCard';
import { orderCounter, updateOrderData, filteredOrder } from '../../components/order status detail/feature/function';
import {} from '../../components/order status detail/feature/function';

const OrderStateArea = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const params = useParams();

  // 실시간 데이터 유지 함수
  updateOrderData(orders, setOrders);
  // ------------------------------------------------------------------------
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      await supabase.from('orders').delete().is('orderMenu', null);

      const { data, error } = await supabase.from('orders').select().eq('storeId', params.id).is('isDone', false);
      if (error) {
        console.error('Error fetching orders:', error);
      } else if (data !== null) {
        const sortTimeData = data.sort((a, b) => a.time.localeCompare(b.time));

        setOrders(sortTimeData);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };
  // ------------------------------------------------------------------------

  // 데이터 필터링 함수
  const filterdOrderList = filteredOrder(orders);

  return (
    <S.Container>
      <S.Wrapper>
        <S.TitleWrapper>
          <S.Title>신규주문 </S.Title>
          <S.OrderCount>{orderCounter(orders).new}건</S.OrderCount>
        </S.TitleWrapper>
        <S.InnerWrapper>
          <OrderStateCard orders={filterdOrderList.newOrder}></OrderStateCard>
          {/* <S.DummyArea></S.DummyArea> */}
        </S.InnerWrapper>
      </S.Wrapper>
      <S.Wrapper>
        <S.TitleWrapper>
          <S.Title>주문현황 </S.Title>
          <S.OrderCount>{orderCounter(orders).active}건</S.OrderCount>
        </S.TitleWrapper>
        <S.InnerWrapper>
          <OrderStateCard orders={filterdOrderList.activeOrder}></OrderStateCard>
          {/* <S.DummyArea></S.DummyArea> */}
        </S.InnerWrapper>
      </S.Wrapper>
    </S.Container>
  );
};

export default OrderStateArea;

const S = {
  Container: styled.div`
    display: flex;
    flex-grow: 2;
    overflow: hidden;
  `,
  Wrapper: styled.div`
    margin-top: 20px;
    height: 100vh;
    flex-grow: 1;
    align-items: center;
  `,
  InnerWrapper: styled.div`
    margin: 0 auto;
    padding-top: 30px;
    display: flex;
    align-items: center;
    flex-direction: column;
    overflow-y: scroll;
    height: calc(100vh - 160px);
    &::-webkit-scrollbar {
      display: none;
    }
  `,
  TitleWrapper: styled.div`
    box-sizing: border-box;
    padding: 0 30px 0 30px;
    margin: 0 auto;
    width: 400px;
    height: 40px;
    border-radius: 20px;
    background-color: #b73d52;
    display: flex;
    color: white;
    align-items: center;
  `,
  Title: styled.div`
    font-size: 20px;
    font-weight: 700;
  `,
  OrderCount: styled.div`
    margin-left: auto;
    font-size: 20px;
    font-weight: 700;
  `
};
