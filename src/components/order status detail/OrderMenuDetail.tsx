import React from 'react';
import { styled } from 'styled-components';
import { Order } from '../../model';

interface Props {
  order: Order;
}
const OrderMenuDetail = ({ order }: Props) => {
  const checkIsVegetable = (vege: any): boolean => {
    let vegetableRender = false;
    vege.forEach((item: any) => {
      if (!item.isAdd) {
        vegetableRender = true;
      }
    });
    return vegetableRender;
  };

  const priceChangeHandler = (price: any) => {
    price = String(price); // price를 문자열로 변환
    price = price.replace(/[^0-9]/g, '');
    const numValue = price.replaceAll(',', '');
    price = numValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return `${price}`; // 변환된 가격 값을 반환
  };

  return (
    <>
      <S.MenuArea>
        <S.Title>주문서</S.Title>
        <S.Line />
        {order.orderMenu.bread !== undefined ? (
          <S.OptionArea>
            <S.Sub> {order.orderMenu.base} 베이스</S.Sub>
            <S.Option>{order.orderMenu.bread} 빵</S.Option>
            <S.Option>{order.orderMenu.cheese} 치즈</S.Option>
            <S.Option>{order.orderMenu.sauce} 소스</S.Option>

            {order.orderMenu.vegetables && (
              <>
                {checkIsVegetable(order.orderMenu.vegetables) && (
                  <>
                    <S.Line />
                    <S.Title>채소 옵션</S.Title>
                    {order.orderMenu.vegetables
                      .filter((vege: any) => !vege.isAdd)
                      .map((vege: any) => (
                        <S.Caption key={vege.id}>{vege.name} (-)</S.Caption>
                      ))}
                  </>
                )}
              </>
            )}
          </S.OptionArea>
        ) : (
          <S.OptionArea>
            <S.Sub>{order.orderMenu.base} 세트</S.Sub>
          </S.OptionArea>
        )}
        <S.Line />
        <S.OptionArea>
          <S.Option>결제금액 {priceChangeHandler(order.price)}원</S.Option>
        </S.OptionArea>
        <S.Line />
      </S.MenuArea>
    </>
  );
};

export default OrderMenuDetail;

const S = {
  MenuArea: styled.div`
    /* background-color: orange; */
    margin: 20px;
    font-size: 18px;
  `,
  Title: styled.div`
    text-align: center;
    font-size: 26px;
    font-weight: 700;
  `,
  OptionArea: styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 0 20px;
  `,
  Sub: styled.div`
    font-size: 24px;
    font-weight: 700;
    /* width: 100%; */
    text-align: justify;
    text-align-last: justify;
    margin-top: 5px;
  `,
  Option: styled.div`
    text-align: justify;
    text-align-last: justify;
  `,
  Caption: styled.div`
    text-align: justify;
    text-align-last: justify;
  `,

  Line: styled.div`
    width: 100%;
    border: 0.5px solid rgba(0, 0, 0, 1);
    margin: 10px 0 10px 0;
  `
};
