import React from 'react';

const OrderPay = ({ updateOrder, setPay }: any) => {
  const submitPay = () => {
    setPay(false);
    updateOrder();
  };
  return (
    <>
      <button onClick={submitPay}>현금</button>
      <button onClick={submitPay}>카드</button>
    </>
  );
};

export default OrderPay;
