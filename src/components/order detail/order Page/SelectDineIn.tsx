import React from 'react';

const SelectDineIn = ({ dineIn, setDineIn, userData }: any) => {
  console.log(userData);
  return (
    <div>
      <h1>{userData?.name} 님 반가워요!</h1>
      <h1>{dineIn === null ? '' : dineIn ? '매장' : '포장'}주문을 도와드릴게요.</h1>
      <h1>{dineIn === null ? '매장 이용 여부를 선택하세요.' : '이용하실 매장을 선택해 주세요.'}</h1>
      <button
        onClick={() => {
          setDineIn(true);
        }}
      >
        매장
      </button>
      <button
        onClick={() => {
          setDineIn(false);
        }}
      >
        포장
      </button>
    </div>
  );
};

export default SelectDineIn;
