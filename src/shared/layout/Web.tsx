import React from 'react';
import { Outlet } from 'react-router-dom';
import { styled } from 'styled-components';
import WebHeader from '../../components/layout/WebHeader';

const Web = () => {
  return (
    <S.Background>
      <S.WebWrapper>
        <WebHeader></WebHeader>
        <S.ContentArea>
          <Outlet />
        </S.ContentArea>
      </S.WebWrapper>
    </S.Background>
  );
};

export default Web;

const S = {
  Background: styled.div`
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  `,
  WebWrapper: styled.div`
    /* width: 393px; */
    /* height: 852px; */
    /* border-radius: 20px; */
    /* border: 1px solid black; */
  `,
  ContentArea: styled.div`
    background-color: white;
    /* overflow-y: scroll; */
    /* &::-webkit-scrollbar {
      display: none;
    } */
  `
};
