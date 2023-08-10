import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import Stocks from './Stocks';

import OrderStateArea from '../../components/order status detail/OrderStateArea';

// ------------------------------------

// 이것 또한 나중에 따로 파일링
const store: Record<string, string> = {
  '1': '신정네거리역점',
  '2': '화곡역점'
};

// ------------------------------------
const Orderstatus = () => {
  return (
    <>
      <OrderStateArea></OrderStateArea>

      <Stocks />
    </>
  );
};

const OrderArea = styled.div`
  border: 1px solid black;
  width: 400px;
  margin: 20px;
  padding: 10px;
`;

export default Orderstatus;
