import React, { useState } from 'react';
import useGetOrder from '../../hook/useGetOrder';
import { supabase } from '../../supabase';

interface Menu {
  name: string;
  price: number;
  id: number;
}

const OrderMenu = () => {
  const [orderId] = useGetOrder();

  //메뉴 리스트를 서버에서 가져오면 좋을거같습니다.
  //나중에 전체 어드민에서 새로운 메뉴를 추가할 수 있도록..?
  const menuList = [
    { name: '바베큐치킨', price: 50000, id: 1 },
    { name: '랜치비건', price: 40000, id: 2 },
    { name: '마라비프', price: 100000, id: 3 },
    { name: '스위트어니언햄', price: 8000, id: 4 },
    { name: '핫칠리에그마요', price: 3000, id: 5 }
  ];

  //서버에 있는 주문 id값에 맞춰 메뉴와 가격을 업데이트 해줍니다.
  const updateOrder = async (menu: Menu) => {
    const order = {
      orderMenu: { base: menu.name },
      price: menu.price
    };
    await supabase.from('orders').update(order).eq('id', orderId);
  };

  //메뉴와 가격을 세팅해서
  return (
    <>
      <h1>메뉴를 골라주세요.</h1>
      {menuList?.map((menu) => {
        return (
          <button
            key={menu.id}
            onClick={() => {
              updateOrder(menu);
            }}
          >
            {menu.name}, {menu.price}
          </button>
        );
      })}
      <div>OrderMenu</div>
    </>
  );
};

export default OrderMenu;
