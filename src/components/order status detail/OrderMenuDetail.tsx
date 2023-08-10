import React from 'react';
import { styled } from 'styled-components';
import { Order } from '../../model';

interface Props {
  order: Order;
}

const OrderMenuDetail = ({ order }: Props) => {
  return (
    <>
      <S.MenuArea>
        <S.Title>주문 옵션</S.Title>
        {order.orderMenu.bread !== undefined ? (
          <>
            <S.Sub> {order.orderMenu.base}</S.Sub>
            <S.Option>{order.orderMenu.bread}</S.Option>
            <S.Option>{order.orderMenu.cheese}</S.Option>
            <S.Option>{order.orderMenu.sauce}</S.Option>

            {order.orderMenu.vegetables && (
              <>
                <S.Title style={{ marginTop: '20px' }}>야채 옵션</S.Title>
                {order.orderMenu.vegetables
                  .filter((vege: any) => !vege.isAdd)
                  .map((vege: any) => (
                    <S.Caption key={vege.name}>(-){vege.name}</S.Caption>
                  ))}
              </>
            )}
          </>
        ) : (
          <S.Sub>{order.orderMenu.base}</S.Sub>
        )}
        <div></div>
      </S.MenuArea>
    </>
  );
};

export default OrderMenuDetail;

const S = {
  MenuArea: styled.div`
    padding: 20px;
    color: white;
    background-color: royalblue;
    border-radius: 10px;
    /* text-align: center; */
  `,
  Title: styled.div`
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 20px;
  `,
  Sub: styled.div`
    font-size: 16px;
    font-weight: 500;
  `,
  Option: styled.div`
    margin: 10px 0;
  `,
  Caption: styled.div``
};
