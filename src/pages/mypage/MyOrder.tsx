import React from 'react';
import { getTimeFromPostgreSQL } from '../../components/order status detail/feature/function';
import { styled } from 'styled-components';

const store: Record<string, string> = {
  '1': '신정네거리역점',
  '2': '화곡역점'
};

interface OrderItem {
  id: string;
  time: string;
  storeId: string;
  orderMenu: {
    base: string;
    bread?: string;
    cheese?: string;
    sauce?: string;
    vegetables?: Array<{
      id: string;
      name: string;
      isAdd: boolean;
    }>;
  };
}

interface MyOrderProps {
  order: OrderItem;
}

function MyOrder({ order }: MyOrderProps) {
  return (
    <div>
      <OrderArea key={order.id}>
        <p>{order.id.slice(0, 8)}</p>
        <p>{getTimeFromPostgreSQL(order.time)}</p>
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
    </div>
  );
}

const OrderArea = styled.div`
  border: 1px solid black;
  width: 300px;
  margin: 20px;
  padding: 10px;
`;

export default MyOrder;
