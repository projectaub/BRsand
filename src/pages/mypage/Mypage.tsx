import React, { useEffect } from 'react';
import { useState } from 'react';
import { styled } from 'styled-components';
import { supabase } from '../../supabase';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  name: string;
  gender: string;
  age: number;
  email: string;
  grade: string;
  aud: string;
  role: string;
  email_confirmed_at: string;
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

const Mypage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [user, setUser] = useState<any>();

  // const getUser = async () => {
  //   const {
  //     data: { user }
  //   } = await supabase.auth.getUser();

  //   if (!user) {
  //     setUser(undefined);
  //   } else {
  //     setUser(user);
  //     console.log(user);
  //   }
  // };

  // useEffect(() => {
  //   getUser();
  // }, []);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const {
        data: { user }
      } = await supabase.auth.getUser();

      if (user === null) {
        alert('로그인 후 이용 가능합니다.');
        navigate('/');
        return;
      }

      const { data, error } = await supabase.from('orders').select().contains('user', { id: user.id });
      console.log(data);
      if (error) {
        console.error('Error fetching orders:', error);
      } else if (data !== null) {
        setOrders(data);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const userName = orders[0]?.user.name;
  const userGrade = orders[0]?.user.grade;

  return (
    <div>
      <h1>
        {userGrade} 멤버십 {userName} 님! 반가워요.
      </h1>
      <div>
        <p>{userName} 님의 주문이 진행중입니다.</p>
        {orders
          .filter((order) => !order.isDone)
          .map((order) => (
            <OrderArea key={order.id}>
              <p>{order.id.slice(0, 8)}</p>
              <p>{order.time}</p>
              <p>{store[order.storeId]}</p>
              <p>메뉴 : {order.orderMenu.base}</p>
              {order.orderMenu.bread && <p>빵 : {order.orderMenu.bread}</p>}
              {order.orderMenu.cheese && <p>치즈 : {order.orderMenu.cheese}</p>}
              {order.orderMenu.sauce && <p>소스 : {order.orderMenu.sauce}</p>}
              {order.orderMenu.vegetables &&
                order.orderMenu.vegetables
                  .filter((vege: any) => !vege.isAdd)
                  .map((vege: any) => <p key={vege.id}>(-){vege.name}</p>)}
            </OrderArea>
          ))}
      </div>
      <div>
        <p>{userName} 님의 지난 주문입니다.</p>
        {orders
          .filter((order) => order.isDone)
          .map((order) => (
            <OrderArea key={order.id}>
              <p>{order.id.slice(0, 8)}</p>
              <p>{order.time}</p>
              <p>{store[order.storeId]}</p>
              <p>메뉴 : {order.orderMenu.base}</p>
              {order.orderMenu.bread && <p>빵 : {order.orderMenu.bread}</p>}
              {order.orderMenu.cheese && <p>치즈 : {order.orderMenu.cheese}</p>}
              {order.orderMenu.sauce && <p>소스 : {order.orderMenu.sauce}</p>}
              {order.orderMenu.vegetables &&
                order.orderMenu.vegetables
                  .filter((vege: any) => !vege.isAdd)
                  .map((vege: any) => <p key={vege.id}>(-){vege.name}</p>)}
            </OrderArea>
          ))}
      </div>
    </div>
  );
};

const OrderArea = styled.div`
  border: 1px solid black;
  width: 300px;
  margin: 20px;
  padding: 10px;
`;

export default Mypage;
