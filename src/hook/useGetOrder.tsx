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
        .is('orderMenu', null);
      setOrder(data![0].id);

      setOrder(data![0].id);
      //이것이 최신의 데이터
      setOrder(data![0].id);

      // 이런 로직을 짜야함
      //하나만 가져오게 해놓았음
      //만약에 이 데이터가 두개 이상이다?
      // order state에는 최근거로 세팅을하고 그럼 최근거로 일단 세팅을 하고
      // 그거 이에외 모든것들은 delete로삭제를 해주세요...
      // const { error } = await supabase.from('orders').delete().contains('user', { id: userId }).is('orderMenu', null);
      //얘를 마이페이지 들어갈때 쓴다면 ?

      if (data === null) {
        alert('주문정보가 없습니다. 퀵 오더 시작화면으로 이동합니다.');

        navigate('/orderpage');
        return;
      }
      // setOrder(data?.id);
    } catch (error) {}
  };

  useEffect(() => {
    fetchOrderData();
  }, []);

  return [order];
};

export default useGetOrder;
