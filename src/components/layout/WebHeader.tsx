import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { styled } from 'styled-components';

const WebHeader = () => {
  const params = useParams();
  const navigate = useNavigate();

  const adminPageChanger = () => {
    const currentUrl = window.location.href;
    let baseUrl = currentUrl.split('/');
    let url = '';

    if (params.id === '0') {
      if (baseUrl[3] === 'statistics') {
        url = 'grade'; // params.id가 0이면 회원 관리 페이지로 이동
      } else {
        url = 'statistics';
      }
    } else if (baseUrl[3] === 'statistics') {
      url = 'orderstatus';
    } else {
      url = 'statistics';
    }
    navigate(`/${url}/${params.id}`);
  };

  const textChanger = (): boolean => {
    const currentUrl = window.location.href;
    let baseUrl = currentUrl.split('/');
    let url = '';
    if (params.id === '0') {
      if (baseUrl[3] === 'statistics') {
        return true;
      } else {
        return false;
      }
    } else if (baseUrl[3] === 'statistics') {
      return true;
    } else {
      return false;
    }
  };

  return (
    <S.Area>
      {params.id === '0' ? (
        <>
          <S.LogoArea>
            <S.LogoImg src="https://i.ibb.co/ZT0yLjj/02.png"></S.LogoImg>
            <S.LogoArea>주문 | 회원 관리 시스템</S.LogoArea>
          </S.LogoArea>
          <S.Btn onClick={adminPageChanger}>{textChanger() ? '회원' : '매장'}관리로 이동</S.Btn>
        </>
      ) : (
        <>
          <S.LogoArea>
            <S.LogoImg src="https://i.ibb.co/ZT0yLjj/02.png"></S.LogoImg>
            <S.LogoArea>주문 | 매장 관리 시스템</S.LogoArea>
          </S.LogoArea>
          <S.Btn onClick={adminPageChanger}>{textChanger() ? '주문' : '매장'}관리로 이동</S.Btn>
        </>
      )}
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
  `,
  Btn: styled.button`
    position: absolute;
    right: 80px;
    color: white;
    background-color: transparent;
    outline: none;
    border: none;
    padding: 20px;
    border: 1px solid white;
    &:hover {
      color: #b73d52;
      background-color: white;
    }
  `
};
