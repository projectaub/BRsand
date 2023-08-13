import React, { useState, useEffect } from 'react';
import useGetOrder from '../../hook/useGetOrder';
import { supabase } from '../../supabase';
import { User } from '../../model/data';
import OrderPay from '../../components/order detail/OrderPay';
import { useNavigate } from 'react-router-dom';
import { css, styled } from 'styled-components';

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
  img: string;
}

interface Menu {
  name: string;
  price: number;
  id: number;
}

type ButtonProps = {
  $isSelected: boolean;
  $active: boolean;
} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

const OrderCustom = () => {
  const navigate = useNavigate();
  const vegetableList = [
    { name: '토마토', id: 1, isAdd: true, img: 'https://i.ibb.co/NmGkBGn/image.png' },
    { name: '오이', id: 2, isAdd: true, img: 'https://i.ibb.co/kB9drLZ/removebg-preview.png' },
    { name: '양상추', id: 3, isAdd: true, img: 'https://i.ibb.co/FHgxYyW/removebg-preview.png' },
    {
      name: '올리브',
      id: 4,
      isAdd: true,
      img: 'https://i.ibb.co/K6Y37rP/removebg-preview.pnghttps://i.ibb.co/K6Y37rP/removebg-preview.png'
    },
    { name: '아보카도', id: 5, isAdd: true, img: 'https://i.ibb.co/wYYwBVj/image.png' },
    { name: '양파', id: 6, isAdd: true, img: 'https://i.ibb.co/M56vV57/image.png' },
    { name: '할라피뇨', id: 7, isAdd: true, img: 'https://i.ibb.co/nQPD6xs/removebg-preview.png' },
    { name: '파프리카', id: 8, isAdd: true, img: 'https://i.ibb.co/5kHjN6v/image.png' }
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
  const [showVegeOrder, setShowVegeOrder] = useState(true);

  const [pay, setPay] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data, error } = await supabase.from('custom').select();
    const baseData = data?.filter((data) => data.type === '베이스');
    const breadData = data?.filter((data) => data.type === '빵');
    const sauceData = data?.filter((data) => data.type === '소스');
    const cheeseData = data?.filter((data) => data.type === '치즈');
    const vegeData = data?.filter((data) => data.type === '야채');
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
    alert('결제가 완료되었습니다.');
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
                    <S.Price> {base.price.toLocaleString('ko-KR')}</S.Price>
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
          <S.Caption>소스를 골라주세요.</S.Caption>
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
          <S.Caption>치즈를 골라주세요.</S.Caption>
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
      {showVegeOrder && cheese.length !== 0 && (
        <>
          <S.Caption>빼고싶은 야채를 골라주세요.</S.Caption>
          {vegetables.map((vege, index) => {
            return (
              <div style={{ display: 'inline-block' }}>
                <S.VegeMenuBtn
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
                  $isSelected={vege.isAdd}
                >
                  <S.ImageContainer>
                    <img src={vege.img} style={{ height: '90px' }} alt={vege.name} />
                  </S.ImageContainer>
                  <S.TextContainer>
                    <S.Name>{vege.name}</S.Name>
                  </S.TextContainer>
                </S.VegeMenuBtn>
              </div>
            );
          })}
        </>
      )}

      {/* 이제 드디어 주문 할 수 있습니다. */}
      <>
        {showVegeOrder && cheese.length !== 0 && (
          <S.OrderBtn
            onClick={() => {
              setPay(!pay);
              setShowVegeOrder(false);
            }}
          >
            주문하기
          </S.OrderBtn>
        )}
      </>
    </>
  );
};

type VegeButtonProps = {
  $isSelected: boolean;
} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

const S = {
  Caption: styled.p`
    font-size: 18px;
    margin: 8px 0px;
    font-weight: 700;
    margin-left: 15px;
    color: #000000;
  `,
  VegeMenuBtn: styled.div<VegeButtonProps>`
    position: relative;
    width: 180px;
    margin: 7px;
    height: 180px;
    cursor: pointer;
    overflow: hidden;
    border-radius: 7px;
    background-color: #ffe8c4;
    &:hover {
      background-color: #ffe8c4;
    }
    ${(props) =>
      props.$isSelected &&
      css`
        background-color: white;
      `}
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
  `,
  OrderBtn: styled.button`
    width: 130px;
    height: 40px;
    background-color: #b73d52;
    border: none;
    border-radius: 5px;
    color: white;
    cursor: pointer;
    margin-top: 20px;
    margin-left: 130px;
    font-size: 17px;
    &:hover {
      background-color: #ffcd7c;
    }
  `
};

export default OrderCustom;
