import React from 'react';
// import   from '../../static/LogoImg.png';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  return (
    <S.Area>
      <S.LogoArea>
        <S.LogoImg src="https://i.ibb.co/ZT0yLjj/02.png" onClick={() => navigate('/')}></S.LogoImg>
      </S.LogoArea>
    </S.Area>
  );
};

export default Header;

const S = {
  Area: styled.div`
    width: 100%;
    height: 70px;
    background-color: #b73d52;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
  `,
  LogoArea: styled.div``,
  LogoImg: styled.img`
    width: 130px;
    cursor: pointer;
  `
};
