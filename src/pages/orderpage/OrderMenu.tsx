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
  const [showItsOrder, setShowItsOrder] = useState(true);

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

    alert('결제가 완료되었습니다.');
    navigate('/mypage');
  };

  //메뉴와 가격을 세팅해서
  return (
    <>
      {/* 결제모달창 컴포넌트입니다. */}
      {pay && <OrderPay updateOrder={updateOrder} setPay={setPay}></OrderPay>}
      {showItsOrder && (
        <>
          <S.Caption>메뉴를 골라주세요.</S.Caption>
          {menuList?.map((menu) => {
            return (
              <div style={{ display: 'inline-block' }}>
                <S.MenuBtn
                  key={menu.id}
                  onClick={() => {
                    setMenu(menu);
                    setPay(true);
                    setShowItsOrder(false);
                  }}
                >
                  <S.ImageContainer>
                    <img src={menu.img} style={{ height: '90px' }} alt={menu.name} />
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
      )}
    </>
  );
};

const S = {
  Caption: styled.p`
    font-size: 18px;
    margin: 8px 0px;
    font-weight: 700;
    margin-left: 15px;
    color: #000000;
  `,
  MenuBtn: styled.div`
    position: relative;
    width: 180px;
    margin: 7px;
    height: 180px;
    cursor: pointer;
    border-radius: 7px;
    overflow: hidden;
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
