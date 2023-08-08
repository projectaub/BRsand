import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import { User } from '../model/data';

const useGetOrder = () => {
  const [order, setOrder] = useState<string>('');

  const fetchOrderData = async () => {
    try {
      //로그인한 유저의 정보를 가져옵니다.
      const userData = await supabase.from('users').select().single();
      console.log(userData.data);
      //로그인한 유저의 정보를 가지고 주문목록에서 user라는 칼럼과 맞는 값의 주문 ID만 가지고 옵니다.
      //필터링 조건1 / 로그인된 유저 = 주문 목록의 유저
      //필터링 조건 1 / orderMenu null = 주문한 메뉴가 없는 주문
      const { data } = await supabase
        .from('orders')
        .select('id')
        .contains('user', userData.data)
        .is('orderMenu', null)
        .single();
      console.log(data, '서버랑 또 통신함');
      setOrder(data?.id);
    } catch (error) {}
  };

  useEffect(() => {
    fetchOrderData();
  }, []);

  return [order];
};

export default useGetOrder;
