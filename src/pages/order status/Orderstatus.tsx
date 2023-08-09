import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import Stocks from './Stocks';
import { supabase } from '../../supabase';
import { useParams } from 'react-router-dom';
import OrderStateArea from '../../components/order status detail/OrderStateArea';
import { Order } from '../../model';
import { checkNewOrderById } from '../../components/order status detail/feature/function';
// ------------------------------------

// 이것 또한 나중에 따로 파일링
const store: Record<string, string> = {
  '1': '신정네거리역점',
  '2': '화곡역점'
};

// ------------------------------------
const Orderstatus: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const params = useParams();

  //실시간 업데이트 // 구독
  supabase
    .channel('custom-db-channel')
    .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'orders' }, (payload) => {
      const newOrder = payload.new as Order;

      // 함수실행 => 기존의 주문번호를 가지고 같은게 있으면 그 인덱스를 반환하고 신규주문이면 0을 반환함
      const condition = checkNewOrderById(orders, newOrder);
      if (condition === 0) {
        //신규 주문이기 때문에 추가해서 state 세팅
        setOrders([...orders, newOrder]);
      } else {
        // orders  해당하는 주문만 값을 바꿔서 setOrders
        orders.splice(condition, 1, newOrder);
        setOrders([...orders]);
      }
    })
    .subscribe();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    console.log(params.id);
    try {
      //주문 현황에서 보여주지 않아도 되는 주문완료건 데이터도 함께 가져옴
      // const { data, error } = await supabase.from('orders').select();
      // 주문 현황에서 주문완료건이 아닌 isDone => false값 / storeId= params.id값 filter로 가져옴
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

  const confirmOrderHandler = async (id: string, isActive: boolean) => {
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

  const completeOrderHandler = async (id: string, isDone: boolean) => {
    const completeOrder = window.confirm('[조리완료]로 변경하시겠습니까?');
    if (completeOrder) {
      try {
        const { data, error } = await supabase.from('orders').update({ isDone: !isDone }).eq('id', id);
      } catch {}
    }
  };

  const newOrderCount = orders.filter((order) => !order.isActive && order.storeId == params.id).length;
  const oldOrderCount = orders.filter((order) => order.isActive && order.storeId == params.id).length;

  return (
    <>
      <OrderStateArea orderList={orders}></OrderStateArea>
      <div>
        <h1>신규주문 : {newOrderCount} </h1>
        {orders
          .filter((order) => !order.isActive)
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
          .filter((order) => order.isActive)
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
