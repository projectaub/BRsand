import React from 'react';
import { styled } from 'styled-components';

const Header = () => {
  return <S.Area>LOGO</S.Area>;
};

export default Header;

const S = {
  Area: styled.div`
    width: 100%;
    height: 70px;
    background-color: orange;
    display: flex;
    justify-content: center;
    align-items: center;
  `
};
