import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabase';
import { StorePoint, User } from '../../model/Data';
import { useNavigate } from 'react-router-dom';
import SelectDineIn from '../../components/order detail/order Page/SelectDineIn';
import SelectStore from '../../components/order detail/order Page/SelectStore';
import SelectProduct from '../../components/order detail/order Page/SelectProduct';

const OrderPage = () => {
  const [dineIn, setDineIn] = useState<boolean | null>(null);
  const [userData, setUserData] = useState<User | null>();
  const [store, setStore] = useState<StorePoint>();
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const userData = await supabase.from('users_test').select().single();
      setUserData(userData.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const setBasicOrder = async (select: string) => {
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
      console.log(error);
      if (select === 'custom') {
        navigate('/order-custom');
      } else {
        navigate('/order-menu');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    //매장 이용여부 먼저 선택합니다.
    <>
      {/* 매장 포장 여부를 선택해야 매장 선택이 나타납니다. */}
      <SelectDineIn dineIn={dineIn} setDineIn={setDineIn} userData={userData}></SelectDineIn>
      {/* 매장을 선택하면 샌드위치를 커스텀할지 기성품을 살지 선택합니다. */}
      {dineIn !== null && <SelectStore setStore={setStore}></SelectStore>}

      {store && <SelectProduct setBasicOrder={setBasicOrder}></SelectProduct>}
    </>
  );
};

export default OrderPage;
