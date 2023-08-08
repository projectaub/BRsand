import React from 'react';
import { Outlet } from 'react-router-dom';
import { styled } from 'styled-components';
import Header from '../../components/layout/Header';

const Mobile = () => {
  return (
    <S.Background>
      <S.MobileWrapper>
        <Header />
        <S.ContentArea>
          <Outlet />
        </S.ContentArea>
      </S.MobileWrapper>
    </S.Background>
  );
};

export default Mobile;

const S = {
  Background: styled.div`
    width: 100 vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  MobileWrapper: styled.div`
    width: 393px;
    height: 852px;
    border-radius: 20px;
    overflow: hidden;
    background-color: royalblue;
  `,
  ContentArea: styled.div`
    /* width: 100%; */
    margin: 0px 16px;
    padding-bottom: 16px;
    background-color: green;
    box-sizing: border-box;
  `
};
