import React, { useState, useEffect } from 'react';
import useGetOrder from '../../hook/useGetOrder';
import { supabase } from '../../supabase';
import { User } from '../../model/data';
import OrderPay from '../../components/order detail/OrderPay';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

interface Ingredient {
  name: string;
  id: number;
  isAdd: boolean;
  type: string;
  price: number;
  img: string;
}

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
  const navigate = useNavigate();
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
  const [baseList, setBaseList] = useState<Ingredient[]>([]);
  const [bread, setBread] = useState('');
  const [breadList, setBreadList] = useState<Ingredient[]>([]);
  const [sauce, setSauce] = useState('');
  const [sauceList, setSauceList] = useState<Ingredient[]>([]);
  const [cheese, setCheese] = useState('');
  const [cheeseList, setCheeseList] = useState<Ingredient[]>([]);
  const [vegetables, setVegetables] = useState<veges[]>(vegetableList);
  const [showBaseOrder, setShowBaseOrder] = useState(true);
  const [showBreadOrder, setShowBreadOrder] = useState(true);
  const [showSauceOrder, setShowSauceOrder] = useState(true);
  const [showCheeseOrder, setShowCheeseOrder] = useState(true);

  const [pay, setPay] = useState(false);

  //로그인한 유저의 주문번호를 가져옵니다.
  //주문이 되고있는 번호는 단 하나겠지요..?

  //이것도 나중에는 서버에서 가져오는 방향으로... 어드민에서 추가할 수 있을꺼같습니다.
  // const baseList = [
  //   { name: '치킨', price: 30000, id: 1 },
  //   { name: '비건 콩고기', price: 260000, id: 2 },
  //   { name: '에그마요', price: 960000, id: 3 },
  //   { name: '비프', price: 302200, id: 4 },
  //   { name: '햄', price: 573200, id: 5 }
  // ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data, error } = await supabase.from('custom').select();
    const baseData = data?.filter((data) => data.type === '베이스');
    const breadData = data?.filter((data) => data.type === '빵');
    const sauceData = data?.filter((data) => data.type === '소스');
    const cheeseData = data?.filter((data) => data.type === '치즈');
    setBaseList(baseData!);
    setBreadList(breadData!);
    setCheeseList(cheeseData!);
    setSauceList(sauceData!);
    if (error) {
      console.error('Error fetching orders:', error);
    }
  };

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
    navigate('/mypage');
  };

  return (
    <>
      {/* 결제모달창 컴포넌트입니다. */}
      {pay && <OrderPay updateOrder={updateOrder} setPay={setPay}></OrderPay>}

      {/* 먼저 베이스를 골라줍니다. */}
      {showBaseOrder && (
        <div>
          <S.Caption>베이스를 골라주세요.</S.Caption>
          {baseList.map((base) => {
            return (
              <div style={{ display: 'inline-block' }}>
                <S.MenuBtn
                  key={base.id}
                  onClick={() => {
                    setBase(base);
                    setShowBaseOrder(false);
                  }}
                >
                  <S.ImageContainer>
                    <img src={base.img} style={{ height: '90px' }} alt={base.name} />
                  </S.ImageContainer>
                  <S.TextContainerB>
                    <S.Name>{base.name}</S.Name>
                    <S.Price> {base.price}</S.Price>
                  </S.TextContainerB>
                </S.MenuBtn>
              </div>
            );
          })}
        </div>
      )}

      {/* 베이스를 고르면 빵을 고를 수 있습니다. */}
      {showBreadOrder && base ? (
        <>
          <S.Caption>빵을 골라주세요.</S.Caption>
          {breadList.map((bread) => {
            return (
              <div style={{ display: 'inline-block' }}>
                <S.MenuBtn
                  key={bread.id}
                  onClick={() => {
                    setBread(bread.name);
                    setShowBreadOrder(false);
                  }}
                >
                  <S.ImageContainer>
                    <img src={bread.img} style={{ height: '90px' }} alt={bread.name} />
                  </S.ImageContainer>
                  <S.TextContainer>
                    <S.Name>{bread.name}</S.Name>
                  </S.TextContainer>
                </S.MenuBtn>
              </div>
            );
          })}
        </>
      ) : (
        ''
      )}

      {/* 빵을 고르면 소스를 고를 수 있습니다. */}
      {showSauceOrder && bread.length !== 0 && (
        <>
          <S.Caption>소스를 골라보세요.</S.Caption>
          {sauceList.map((sauce) => {
            return (
              <div style={{ display: 'inline-block' }}>
                <S.MenuBtn
                  key={sauce.id}
                  onClick={() => {
                    setSauce(sauce.name);
                    setShowSauceOrder(false);
                  }}
                >
                  <S.ImageContainer>
                    <img src={sauce.img} style={{ height: '90px' }} alt={sauce.name} />
                  </S.ImageContainer>
                  <S.TextContainer>
                    <S.Name>{sauce.name}</S.Name>
                  </S.TextContainer>
                </S.MenuBtn>
              </div>
            );
          })}
        </>
      )}

      {/* 소스를 고르면 치즈를 고를 수 있습니다. */}
      {showCheeseOrder && sauce.length !== 0 && (
        <>
          <S.Caption>치즈를 골라보세요.</S.Caption>
          {cheeseList.map((cheese) => {
            return (
              <div style={{ display: 'inline-block' }}>
                <S.MenuBtn
                  key={cheese.id}
                  onClick={() => {
                    setCheese(cheese.name);
                    setShowCheeseOrder(false);
                  }}
                >
                  <S.ImageContainer>
                    <img src={cheese.img} style={{ height: '90px' }} alt={cheese.name} />
                  </S.ImageContainer>
                  <S.TextContainer>
                    <S.Name>{cheese.name}</S.Name>
                  </S.TextContainer>
                </S.MenuBtn>
              </div>
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
    overflow: hidden;
    border-radius: 7px;
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
    line-height: 30px;
    background-color: #b73d52;
    height: 50px;
  `,
  TextContainerB: styled.div`
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

export default OrderCustom;
