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
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fce3ba;
  `,
  MobileWrapper: styled.div`
    width: 393px;
    height: 852px;
    border-radius: 20px;
    overflow: hidden;
  `,
  ContentArea: styled.div`
    box-sizing: border-box;
    /* margin: 0px 16px; */
    width: 100%;
    height: 782px;
    padding-bottom: 16px;
    background-color: white;
    box-sizing: border-box;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  `
};
