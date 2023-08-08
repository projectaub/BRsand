import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabase';
import { StorePoint, User } from '../../model/data';
import SetOrder from '../../components/orderDetail/SetOrder';
import { useNavigate } from 'react-router-dom';

const OrderPage = () => {
  const [dineIn, setDineIn] = useState<boolean | null>(null);
  const [userData, setUserData] = useState<User | null>();
  const [storeData, setStoreData] = useState<StorePoint[] | null>();
  const [store, setStore] = useState<StorePoint>();
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const userData = await supabase.from('users').select().single();
      const storeData = await supabase.from('stores').select();
      // console.log(storeData.data);
      setUserData(userData.data);
      setStoreData(storeData.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const setBasicOrder = async () => {
    const newOrderSet = {
      dineIn,
      storeId: store?.id,
      user: userData,
      isActive: false,
      isDone: false
    };
    console.log(newOrderSet);

    try {
      const { data, error } = await supabase.from('orders').insert(newOrderSet).select();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    //매장 이용여부 먼저 선택합니다.
    <>
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
      </div>

      {/* 매장 포장 여부를 선택해야 매장 선택이 나타납니다. */}
      {dineIn !== null && (
        <div>
          {storeData?.map((store) => {
            return (
              <button
                key={store.id}
                onClick={() => {
                  // 선택한 매장을 store 상태에 담습니다.
                  setStore(store);
                }}
              >
                {store.name}
              </button>
            );
          })}
        </div>
      )}

      {/* 매장을 선택하면 샌드위치를 커스텀할지 기성품을 살지 선택합니다. */}
      {store && (
        <>
          <button
            onClick={() => {
              setBasicOrder();
              navigate('/order-custom');
            }}
          >
            커스텀
          </button>
          <button
            onClick={() => {
              setBasicOrder();
              navigate('/order-menu');
            }}
          >
            메뉴주문
          </button>
        </>
      )}
    </>
  );
};

export default OrderPage;
