import React from 'react';
import { getTimeFromPostgreSQL } from '../../components/order status detail/feature/function';
import { styled } from 'styled-components';

const store: Record<string, string> = {
  '1': '신정네거리역점',
  '2': '화곡역점'
};

const storeCall: Record<string, string> = {
  '1': '02-2607-9979',
  '2': '02-2603-5353'
};

interface OrderItem {
  id: string;
  time: string;
  storeId: string;
  price: number;
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
  const priceChangeHandler = (price: any) => {
    price = String(price); // price를 문자열로 변환
    price = price.replace(/[^0-9]/g, '');
    const numValue = price.replaceAll(',', '');
    price = numValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return `${price} 원`; // 변환된 가격 값을 반환
  };

  return (
    <div style={{ width: '100%' }}>
      <OrderArea key={order.id}>
        <Stp>주문일시 : {getTimeFromPostgreSQL(order.time)}</Stp>
        <Stp>주문번호 : {order.id.slice(0, 8)}</Stp>
        <Stp>
          {store[order.storeId]}
          <CallBtn onClick={() => alert(`${storeCall[order.storeId]}`)}>가게전화</CallBtn>
        </Stp>
        <FoodArea>
          <Stp>메뉴 : {order.orderMenu.base}</Stp>
          {order.orderMenu.bread && <Stp>빵 : {order.orderMenu.bread}</Stp>}
          {order.orderMenu.cheese && <Stp>치즈 : {order.orderMenu.cheese}</Stp>}
          {order.orderMenu.sauce && <Stp>소스 : {order.orderMenu.sauce}</Stp>}
          {order.orderMenu.vegetables &&
            order.orderMenu.vegetables
              .filter((vege: any) => !vege.isAdd)
              .map((vege: any) => <Stp key={vege.id}>(-){vege.name}</Stp>)}
          <Sprice>{priceChangeHandler(order.price)}</Sprice>
        </FoodArea>
      </OrderArea>
    </div>
  );
}

const OrderArea = styled.div`
  border-radius: 5px;
  background-color: #fff0d8;
  width: 300px;
  margin: 20px;
  padding: 10px;
  box-shadow: 1px 1px 3px #a6a6a6;
  margin: 20px auto;
`;

const FoodArea = styled.div`
  border-top: 1px solid gray;
  width: 280px;
  margin: auto 0;
  padding-top: 10px;
`;

const Stp = styled.p`
  margin-bottom: 5px;
`;

const Sprice = styled.p`
  margin-top: 10px;
  margin-right: 5px;
  text-align: right;
  font-weight: bold;
  font-size: 18px;
  color: #3c3c3c;
`;

const CallBtn = styled.button`
  width: 70px;
  height: 23px;
  margin-left: 5px;
  line-height: 20px;
  background-color: #e7a583;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  &:hover {
    box-shadow: 1px 1px 1px #a6a6a6;
  }
`;

export default MyOrder;
