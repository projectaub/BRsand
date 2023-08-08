import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import Stocks from './Stocks';
import { supabase } from '../../supabase';

interface User {
  id: number;
  name: string;
  gender: string;
  age: number;
  email: string;
  grade: string;
}

interface Order {
  id: number;
  dineIn: boolean;
  isActive: boolean;
  isDone: boolean;
  orderMenu: any;
  price: number;
  storeId: string;
  time: string;
  user: User;
}

const Orderstatus: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetchOrders();
  }, [orders]);

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase.from('orders').select();
      if (error) {
        console.error('Error fetching orders:', error);
      } else if (data !== null) {
        setOrders(data);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const confirmOrderHandler = async (id: any, isActive: boolean) => {
    console.log(id);
    try {
      const { data, error } = await supabase.from('orders').update({ isActive: !isActive }).eq('id', id);
    } catch (error) {
      console.error('Error Updating orders:', error);
    }
  };

  return (
    <>
      <div>
        <h1>신규주문</h1>
        {orders
          .filter((order) => !order.isActive)
          .map((order) => (
            <OrderArea key={order.id}>
              <h1>{order.storeId}</h1>
              <p>주문번호 : {order.id}</p>
              <p>결제금액 : {order.price}원</p>
              <p>{order.dineIn ? '매장' : '포장'}</p>
              <p>상태 : 주문접수대기</p>
              <button onClick={() => confirmOrderHandler(order.id, order.isActive)}>주문접수</button>
              <p>{order.isDone ? '수령완료' : '미수령'}</p>
              <div>
                {order.orderMenu !== null && order.user !== null && (
                  <div>
                    <h2>주문자명 {order.user.name}</h2>
                    <p>메뉴 : {order.orderMenu.base}</p>
                    <p>빵 : {order.orderMenu.bread}</p>
                    <p>치즈 : {order.orderMenu.cheese}</p>
                    <p>소스 : {order.orderMenu.sauce}</p>
                  </div>
                )}
              </div>
            </OrderArea>
          ))}
        <h1>조리진행중</h1>
        {orders
          .filter((order) => order.isActive)
          .map((order) => (
            <OrderArea key={order.id}>
              <h1>{order.storeId}</h1>
              <p>주문번호 : {order.id}</p>
              <p>결제금액 : {order.price}원</p>
              <p>{order.dineIn ? '매장' : '포장'}</p>
              <p>상태 : 주문접수완료</p>
              <button onClick={() => confirmOrderHandler(order.id, order.isActive)}>조리완료</button>
              <p>{order.isDone ? '수령완료' : '미수령'}</p>
              <div>
                {order.orderMenu !== null && order.user !== null && (
                  <div>
                    <h2>주문자명 {order.user.name}</h2>
                    <p>메뉴 : {order.orderMenu.base}</p>
                    <p>빵 : {order.orderMenu.bread}</p>
                    <p>치즈 : {order.orderMenu.cheese}</p>
                    <p>소스 : {order.orderMenu.sauce}</p>
                  </div>
                )}
              </div>
            </OrderArea>
          ))}
      </div>
      <Stocks />
    </>
  );
};

const OrderArea = styled.div`
  border: 1px solid black;
  width: 400px;
  margin: 20px;
  padding: 10px;
`;

export default Orderstatus;
