import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabase';
import { StorePoint, User } from '../../model/data';

const SetOrder = () => {
  const [userData, setUserData] = useState<User | null>();
  const [storeData, setStoreData] = useState<StorePoint[] | null>();
  const [dineIn, setDineIn] = useState<Boolean | null>(null);
  const [storePoint, setStorePoint] = useState<string | number>('');
  const [menuType, setMenuType] = useState<string>('');

  const fetchData = async () => {
    try {
      const userData = await supabase.from('users').select().single();
      const storeData = await supabase.from('stores').select();
      setUserData(userData.data);
      setStoreData(storeData.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const orderHandler = async () => {
    const newOrderSet = {
      dineIn,
      storeId: storePoint,
      user: userData,
      isActive: false,
      isDone: false
    };
    try {
      const { data, error } = await supabase.from('orders').insert(newOrderSet).select();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
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

      <div>{storePoint}</div>
      <div>
        {storeData?.map((store) => {
          return (
            <button
              key={store.id}
              onClick={() => {
                setStorePoint(store.id);
              }}
            >
              {store.name}
            </button>
          );
        })}
      </div>

      <div>
        {menuType.length === 0 ? (
          <h1>커스텀 샌드위치 / 완제품을 선택해주세요.</h1>
        ) : (
          <h1>{menuType} 주문을 도와드리겠습니다.</h1>
        )}

        <button
          onClick={() => {
            setMenuType('커스텀');
          }}
        >
          커스텀
        </button>
        <button
          onClick={() => {
            setMenuType('완제품');
          }}
        >
          완제품
        </button>
      </div>

      <button onClick={orderHandler}>주문 시작하기</button>
    </div>
  );
};

export default SetOrder;
