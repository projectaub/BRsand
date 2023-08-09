import React from 'react';
import { styled } from 'styled-components';

const SelectProduct = ({ setBasicOrder }: any) => {
  return (
    <S.Container>
      <S.CaptionArea>
        <S.Caption>주문방식을 선택해주세요.</S.Caption>
      </S.CaptionArea>
      <S.BtnArea>
        <S.Btn
          onClick={() => {
            setBasicOrder('custom');
          }}
        >
          커스텀
        </S.Btn>
        <S.Btn
          onClick={() => {
            setBasicOrder('menu');
          }}
        >
          메뉴주문
        </S.Btn>
      </S.BtnArea>
    </S.Container>
  );
};

export default SelectProduct;
const S = {
  Container: styled.div`
    /* background-color: red; */
    margin-top: 30px;
  `,
  Title: styled.span`
    font-size: 24px;
  `,
  CaptionArea: styled.div`
    margin: 10px 0;
  `,
  Caption: styled.p`
    font-size: 18px;
    margin: 8px 0px;
    font-weight: 700;
    color: #226f54;
  `,
  Name: styled.span`
    font-weight: 700;
  `,
  BtnArea: styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;
    margin-top: 30px;
  `,
  Btn: styled.button`
    width: calc(361px / 2 - 8px);
    padding: 16px;
    outline: none;
    border: 1px solid #226f54;
    border-radius: 50px;
    background-color: white;
    font-size: 18px;
    color: #226f54;
  `
};
