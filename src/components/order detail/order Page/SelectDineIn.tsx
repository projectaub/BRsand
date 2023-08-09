import React from 'react';
import { styled } from 'styled-components';

const SelectDineIn = ({ dineIn, setDineIn, userData }: any) => {
  return (
    <S.Container>
      <S.Title>
        <S.Name>{userData?.name}</S.Name>님
      </S.Title>
      <S.CaptionArea>
        <S.Caption>{dineIn === null ? '' : dineIn ? '매장' : '포장'}주문을 도와드릴게요.</S.Caption>
        <S.Caption style={{ fontWeight: 700, color: '#226f54' }}>
          {dineIn === null ? '매장 이용 여부를 선택하세요.' : ''}
        </S.Caption>
      </S.CaptionArea>
      <S.BtnArea>
        <S.Btn
          onClick={() => {
            setDineIn(true);
          }}
        >
          매장
        </S.Btn>
        <S.Btn
          onClick={() => {
            setDineIn(false);
          }}
        >
          포장
        </S.Btn>
      </S.BtnArea>
    </S.Container>
  );
};

export default SelectDineIn;

const S = {
  Container: styled.div`
    /* background-color: red; */
    margin: 30px 0;
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