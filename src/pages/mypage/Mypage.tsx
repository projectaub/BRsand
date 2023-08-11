import React, { useEffect } from 'react';
import { useState } from 'react';
import { supabase } from '../../supabase';
import { useNavigate } from 'react-router-dom';
import MyOrder from './MyOrder';

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

const Mypage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [user, setUser] = useState<any>();

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

      const { error: deleteUserError } = await supabase
        .from('orders')
        .delete()
        .contains('user', { id: user.id })
        .is('orderMenu', null);
      setUser(user);
      // null 값이 포함된 오더 지워줌

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
    <>
      {userName ? (
        <div>
          <h1>
            {userGrade} 멤버십 {userName} 님! 반가워요.
          </h1>
          <div>
            <p>{userName} 님의 주문이 진행중입니다.</p>
            {orders
              .filter((order) => !order.isDone)
              .map((order) => (
                <MyOrder order={order} />
              ))}
          </div>
          <div>
            <p>{userName} 님의 지난 주문입니다.</p>
            {orders
              .filter((order) => order.isDone)
              .map((order) => (
                <MyOrder order={order} />
              ))}
          </div>
        </div>
      ) : (
        <h1>주문내역이없습니다.</h1>
      )}
    </>
  );
};

export default Mypage;
