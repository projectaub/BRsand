import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import Stocks from './Stocks';
import { supabase } from '../../supabase';
import { useParams } from 'react-router-dom';

interface User {
  id: number;
  name: string;
  gender: string;
  age: number;
  email: string;
  grade: string;
}

interface Order {
  id: string;
  dineIn: boolean;
  isActive: boolean;
  isDone: boolean;
  orderMenu: any;
  price: number;
  storeId: string;
  time: string;
  user: User;
}

const store: Record<string, string> = {
  '1': '신정네거리역점',
  '2': '화곡역점'
};

const Orderstatus: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const params = useParams();

  useEffect(() => {
    fetchOrders();
  }, []);

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
    const orderConfirmed = window.confirm('주문을 접수하시겠습니까?');
    if (orderConfirmed) {
      try {
        const { data, error } = await supabase.from('orders').update({ isActive: !isActive }).eq('id', id);
      } catch (error) {
        console.error('Error Updating orders:', error);
      }
    } else {
      return;
    }
  };

  const completeOrderHandler = async (id: any, isDone: boolean) => {
    const completeOrder = window.confirm('[조리완료]로 변경하시겠습니까?');
    if (completeOrder) {
      try {
        const { data, error } = await supabase.from('orders').update({ isDone: !isDone }).eq('id', id);
      } catch {}
    }
  };

  const newOrderCount = orders.filter((order) => !order.isActive && order.storeId == params.id).length;
  const oldOrderCount = orders.filter((order) => order.isActive && !order.isDone && order.storeId == params.id).length;

  return (
    <>
      <div>
        <h1>신규주문 : {newOrderCount} </h1>
        {orders
          .filter((order) => !order.isActive && order.storeId == params.id)
          .map((order) => (
            <OrderArea key={order.id}>
              <h1>{store[order.storeId]}</h1>
              <p>주문번호 : {order.id.slice(0, 8)}</p>
              <p>주문시간 : {order.time}</p>
              <p>결제금액 : {order.price}원</p>
              <p>{order.dineIn ? '매장' : '포장'}</p>
              <p>상태 : 주문접수대기</p>
              <button onClick={() => confirmOrderHandler(order.id, order.isActive)}>주문접수</button>
              <div>
                {order.orderMenu !== null && order.user !== null && (
                  <div>
                    <h2>주문자명 {order.user.name}</h2>
                    <p>메뉴 : {order.orderMenu.base}</p>
                    {order.orderMenu.bread && <p>빵 : {order.orderMenu.bread}</p>}
                    {order.orderMenu.cheese && <p>치즈 : {order.orderMenu.cheese}</p>}
                    {order.orderMenu.sauce && <p>소스 : {order.orderMenu.sauce}</p>}
                    {order.orderMenu.vegetables &&
                      order.orderMenu.vegetables
                        .filter((vege: any) => !vege.isAdd)
                        .map((vege: any) => <p>(-){vege.name}</p>)}
                  </div>
                )}
              </div>
            </OrderArea>
          ))}
        <h1>조리진행중 : {oldOrderCount}</h1>
        {orders
          .filter((order) => order.isActive && !order.isDone && order.storeId == params.id)
          .map((order) => (
            <OrderArea key={order.id}>
              <h1>{store[order.storeId]}</h1>
              <p>주문번호 : {order.id.slice(0, 8)}</p>
              <p>주문시간 : {order.time}</p>
              <p>결제금액 : {order.price}원</p>
              <p>{order.dineIn ? '매장' : '포장'}</p>
              <p>상태 : 주문접수완료</p>
              <button onClick={() => completeOrderHandler(order.id, order.isDone)}>조리완료</button>
              <div>
                {order.orderMenu !== null && order.user !== null && (
                  <div>
                    <h2>주문자명 {order.user.name}</h2>
                    <p>메뉴 : {order.orderMenu.base}</p>
                    {order.orderMenu.bread && <p>빵 : {order.orderMenu.bread}</p>}
                    {order.orderMenu.cheese && <p>치즈 : {order.orderMenu.cheese}</p>}
                    {order.orderMenu.sauce && <p>소스 : {order.orderMenu.sauce}</p>}
                    {order.orderMenu.vegetables &&
                      order.orderMenu.vegetables
                        .filter((vege: any) => !vege.isAdd)
                        .map((vege: any) => <p>(-){vege.name}</p>)}
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
