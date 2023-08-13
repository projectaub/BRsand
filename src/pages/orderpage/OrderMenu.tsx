import React, { useState } from 'react';
import useGetOrder from '../../hook/useGetOrder';
import { supabase } from '../../supabase';
import OrderPay from '../../components/order detail/OrderPay';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { styled } from 'styled-components';

interface Menu {
  name: string;
  price: number;
  id: number;
  img: string;
}

const OrderMenu = () => {
  //임시 라우터 이동 함수
  const navigate = useNavigate();

  const [orderId] = useGetOrder();
  const [pay, setPay] = useState(false);
  const [menu, setMenu] = useState<Menu | undefined>();
  const [menuList, setMenuList] = useState<Menu[]>([]);
  const [picked, setPicked] = useState(false);

  //메뉴 리스트를 서버에서 가져오면 좋을거같습니다.
  //나중에 전체 어드민에서 새로운 메뉴를 추가할 수 있도록..?
  // const menuList = [
  //   { name: '바베큐치킨', price: 50000, id: 1 },
  //   { name: '랜치비건', price: 40000, id: 2 },
  //   { name: '마라비프', price: 100000, id: 3 },
  //   { name: '스위트어니언햄', price: 8000, id: 4 },
  //   { name: '핫칠리에그마요', price: 3000, id: 5 }
  // ];

  //
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data, error } = await supabase.from('menu').select();
    console.log(data);
    setMenuList(data!);
    if (error) {
      console.error('Error fetching orders:', error);
    }
  };

  //통계 css

  //서버에 있는 주문 id값에 맞춰 메뉴와 가격을 업데이트 해줍니다.
  const updateOrder = async () => {
    const order = {
      orderMenu: { base: menu?.name },
      price: menu?.price
    };
    await supabase.from('orders').update(order).eq('id', orderId);

    alert('주문 잘 들어감');
    navigate('/mypage');
  };

  //메뉴와 가격을 세팅해서
  return (
    <>
      {/* 결제모달창 컴포넌트입니다. */}
      {pay && <OrderPay updateOrder={updateOrder} setPay={setPay}></OrderPay>}

      <S.Caption>메뉴를 골라주세요.</S.Caption>

      {menuList?.map((menu) => {
        return (
          <div style={{ display: 'inline-block' }}>
            <S.MenuBtn
              key={menu.id}
              onClick={() => {
                setMenu(menu);
                setPay(true);
                setPicked(true);
              }}
            >
              <S.ImageContainer>
                <img src={menu.img} style={{ width: '130px' }} alt={menu.name} />
              </S.ImageContainer>
              <S.TextContainer>
                <S.Name>{menu.name}</S.Name>
                <S.Price> {menu.price}</S.Price>
              </S.TextContainer>
            </S.MenuBtn>
          </div>
        );
      })}
    </>
  );
};

const S = {
  Caption: styled.p`
    font-size: 18px;
    margin: 8px 0px;
    font-weight: 700;
    margin-left: 15px;
    color: #b73d52;
  `,
  MenuBtn: styled.div`
    position: relative;
    width: 180px;
    margin: 7px;
    height: 180px;
    cursor: pointer;
    &:hover {
      background-color: #ffe8c4;
    }
  `,
  ImageContainer: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 130px;
  `,

  TextContainer: styled.div`
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 10px;

    background-color: #b73d52;
    height: 50px;
  `,
  Name: styled.p`
    text-align: center;
    font-size: 19px;

    color: white;
  `,
  Price: styled.p`
    text-align: center;
    color: white;
    font-weight: bold;
  `
};

export default OrderMenu;
