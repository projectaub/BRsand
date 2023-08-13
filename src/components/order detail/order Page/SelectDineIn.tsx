import React from 'react';
import { css, styled } from 'styled-components';

const SelectDineIn = ({ dineIn, setDineIn, userData }: any) => {
  return (
    <S.Container>
      <S.Title>
        <S.Name>{userData?.name}</S.Name>님
      </S.Title>
      <S.CaptionArea>
        <S.Caption>{dineIn === null ? '' : dineIn ? '매장' : '포장'}주문을 도와드릴게요.</S.Caption>
        <S.Caption style={{ fontWeight: 700, color: '#B73D52' }}>
          {dineIn === null ? ' 매장이용 여부를 선택하세요.' : ''}
        </S.Caption>
      </S.CaptionArea>
      <S.BtnArea>
        <S.Btn
          onClick={() => {
            setDineIn(true);
          }}
          $isSelected={dineIn}
          $active={true}
          //생겨날 요소에대한 key
        >
          매장
        </S.Btn>
        <S.Btn
          onClick={() => {
            setDineIn(false);
          }}
          $isSelected={dineIn}
          $active={false}
        >
          포장
        </S.Btn>
      </S.BtnArea>
    </S.Container>
  );
};

export default SelectDineIn;

type ButtonProps = {
  $isSelected: boolean;
  $active: boolean;
} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

const S = {
  Container: styled.div`
    /* background-color: red; */
    margin: 30px 0;
  `,
  Title: styled.span`
    font-size: 24px;
    margin-left: 15px;
  `,
  CaptionArea: styled.div`
    margin: 10px 0;
    margin-left: 15px;
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
  Btn: styled.button<ButtonProps>`
    width: calc(361px / 2 - 8px);
    padding: 16px;
    outline: none;
    border: 2px solid #ffd99b;
    border-radius: 50px;
    background-color: white;
    font-size: 18px;
    cursor: pointer;
    color: black;
    &:hover {
      background-color: #ffd99b;
      color: white;
    }
    &:active {
      transform: scale(1);
    }

    ${(props) =>
      props.$isSelected === props.$active &&
      css`
        background-color: #ffd99b;
        color: white;
      `};
  `
};
