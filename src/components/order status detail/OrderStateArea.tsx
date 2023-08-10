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
      const { data, error } = await supabase.from('orders').select().eq('storeId', params.id).is('isDone', false);
      if (error) {
        console.error('Error fetching orders:', error);
      } else if (data !== null) {
        setOrders(data);
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
        <S.Title>신규주문 {orderCounter(orders).new}건</S.Title>
        <OrderStateCard orders={filterdOrderList.newOrder}></OrderStateCard>
      </S.Wrapper>
      <S.Wrapper>
        <S.Title>주문현황 {orderCounter(orders).active}건</S.Title>
        <OrderStateCard orders={filterdOrderList.activeOrder}></OrderStateCard>
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
