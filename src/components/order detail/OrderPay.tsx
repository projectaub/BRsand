import React from 'react';

const OrderPay = ({ updateOrder, setPay }: any) => {
  // 결제시스템을 작동

  //

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
