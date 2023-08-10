import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import { useNavigate } from 'react-router-dom';
import useCheckLoginUser from './useCheckLoginUser';
import { User } from '../model';

const useGetOrder = () => {
  const [order, setOrder] = useState<string>('');
  const [userId] = useCheckLoginUser();
  // const [userData] = useCheck
  const navigate = useNavigate();

  const fetchOrderData = async () => {
    try {
      //로그인한 유저의 정보를 가져옵니다.

      //로그인한 유저의 정보를 가지고 주문목록에서 user라는 칼럼과 맞는 값의 주문 ID만 가지고 옵니다.
      //필터링 조건1 / 로그인된 유저 = 주문 목록의 유저
      //필터링 조건 1 / orderMenu null = 주문한 메뉴가 없는 주문
      const { data } = await supabase
        .from('orders')
        .select('id')
        .contains('user', { id: userId })
        .is('orderMenu', null)
        .single();

      console.log('orderdata', data);
      if (data === null) {
        alert('주문정보가 없습니다. 퀵 오더 시작화면으로 이동합니다.');
        navigate('/orderpage');
        return;
      }
      setOrder(data?.id);
    } catch (error) {}
  };

  useEffect(() => {
    fetchOrderData();
  }, []);

  return [order];
};

export default useGetOrder;
