import React, { useState, useEffect } from 'react';
import useGetOrder from '../../hook/useGetOrder';
import { supabase } from '../../supabase';
import { User } from '../../model/data';
import OrderPay from '../../components/order detail/OrderPay';

interface veges {
  name: string;
  id: number;
  isAdd: boolean;
}

interface Menu {
  name: string;
  price: number;
  id: number;
}

const OrderCustom = () => {
  const vegetableList = [
    { name: '토마토', id: 1, isAdd: true },
    { name: '오이', id: 2, isAdd: true },
    { name: '양상추', id: 3, isAdd: true },
    { name: '올리브', id: 4, isAdd: true },
    { name: '아보카도', id: 5, isAdd: true },
    { name: '양파', id: 6, isAdd: true },
    { name: '할라피뇨', id: 7, isAdd: true },
    { name: '파프리카', id: 8, isAdd: true }
  ];
  const [base, setBase] = useState<Menu>();
  const [bread, setBread] = useState('');
  const [sauce, setSauce] = useState('');
  const [cheese, setCheese] = useState('');
  const [vegetables, setVegetables] = useState<veges[]>(vegetableList);
  const [pay, setPay] = useState(false);

  //로그인한 유저의 주문번호를 가져옵니다.
  //주문이 되고있는 번호는 단 하나겠지요..?

  //이것도 나중에는 서버에서 가져오는 방향으로... 어드민에서 추가할 수 있을꺼같습니다.
  const baseList = [
    { name: '치킨', price: 30000, id: 1 },
    { name: '비건 콩고기', price: 260000, id: 2 },
    { name: '에그마요', price: 960000, id: 3 },
    { name: '비프', price: 302200, id: 4 },
    { name: '햄', price: 573200, id: 5 }
  ];

  const breadList = [
    { name: '화이트', id: 1 },
    { name: '크로아상', id: 2 },
    { name: '베이글', id: 3 },
    { name: '번', id: 4 }
  ];

  const cheeseList = [
    { name: '모짜렐라', id: 1 },
    { name: '체다', id: 2 },
    { name: '고르곤졸라', id: 3 }
  ];

  const sauceList = [
    { name: '바베큐', id: 1 },
    { name: '핫칠리', id: 2 },
    { name: '랜치', id: 3 },
    { name: '마라', id: 4 },
    { name: '스위트어니언', id: 5 }
  ];

  const [orderId] = useGetOrder();
  console.log(orderId);

  const updateOrder = async () => {
    const sandwich = {
      base: base?.name,
      bread,
      sauce,
      cheese,
      vegetables
    };

    const order = {
      orderMenu: sandwich,
      price: base?.price
    };
    await supabase.from('orders').update(order).eq('id', orderId);
    alert('서버가서 확인해봐');
  };

  return (
    <>
      {/* 결제모달창 컴포넌트입니다. */}
      {pay && <OrderPay updateOrder={updateOrder} setPay={setPay}></OrderPay>}

      {/* 먼저 베이스를 골라줍니다. */}
      <h1>베이스를 골라주세요.</h1>
      {baseList.map((base) => {
        return (
          <button
            key={base.id}
            onClick={() => {
              setBase(base);
            }}
          >
            {base.name}
          </button>
        );
      })}

      {/* 베이스를 고르면 빵을 고를 수 있습니다. */}
      {base ? (
        <>
          <h1>빵을 골라주세요.</h1>
          {breadList.map((bread) => {
            return (
              <button
                key={bread.id}
                onClick={() => {
                  setBread(bread.name);
                }}
              >
                {bread.name}
              </button>
            );
          })}
        </>
      ) : (
        ''
      )}

      {/* 빵을 고르면 소스를 고를 수 있습니다. */}
      {bread.length !== 0 && (
        <>
          <h1>소스를 골라보세요.</h1>
          {sauceList.map((sauce) => {
            return (
              <button
                key={sauce.id}
                onClick={() => {
                  setSauce(sauce.name);
                }}
              >
                {sauce.name}
              </button>
            );
          })}
        </>
      )}

      {/* 소스를 고르면 치즈를 고를 수 있습니다. */}
      {sauce.length !== 0 && (
        <>
          <h1>치즈를 골라보세요.</h1>
          {cheeseList.map((cheese) => {
            return (
              <button
                key={cheese.id}
                onClick={() => {
                  setCheese(cheese.name);
                }}
              >
                {cheese.name}
              </button>
            );
          })}
        </>
      )}

      {/* 치즈를 고르면 드디어 야채를 고를 수 있습니다. 야채는 기본적으로 다 true고 빼고 싶은 야채를 클릭하면 됩니다. */}
      {cheese.length !== 0 && (
        <>
          <h1>빼고싶은 야채를 골라주세요..</h1>
          {vegetables.map((vege, index) => {
            return (
              <button
                key={vege.id}
                onClick={() => {
                  const newList = vegetables.map((item) => {
                    if (item.name === vege.name) {
                      return { ...item, isAdd: !vege.isAdd };
                    } else {
                      return item;
                    }
                  });
                  setVegetables(newList);
                }}
              >
                {vege.name}
              </button>
            );
          })}
        </>
      )}

      {/* 이제 드디어 주문 할 수 있습니다. */}
      <>
        <h1>주문할수있어요</h1>
        {cheese.length !== 0 && (
          <button
            onClick={() => {
              setPay(!pay);
            }}
          >
            주문하기~!
          </button>
        )}
      </>
    </>
  );
};

export default OrderCustom;
