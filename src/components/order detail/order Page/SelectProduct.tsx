import React from 'react';

const SelectProduct = ({ setBasicOrder }: any) => {
  return (
    <>
      <button
        onClick={() => {
          setBasicOrder('custom');
        }}
      >
        커스텀
      </button>
      <button
        onClick={() => {
          setBasicOrder('menu');
        }}
      >
        메뉴주문
      </button>
    </>
  );
};

export default SelectProduct;
