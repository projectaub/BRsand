import React from 'react';
import { styled } from 'styled-components';

const WebHeader = () => {
  return (
    <S.Area>
      <S.LogoArea>
        <S.LogoImg src="https://i.ibb.co/ZT0yLjj/02.png"></S.LogoImg>
        <S.LogoArea>주문 | 매장 관리 시스템</S.LogoArea>
      </S.LogoArea>
    </S.Area>
  );
};

export default WebHeader;

const S = {
  Area: styled.div`
    width: 100%;
    height: 100px;
    background-color: #b73d52;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
  `,
  LogoArea: styled.div`
    text-align: center;
  `,
  LogoImg: styled.img`
    width: 130px;
  `
};
