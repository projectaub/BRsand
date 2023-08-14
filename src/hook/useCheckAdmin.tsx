import { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import { useNavigate } from 'react-router-dom';
import useCheckLoginUserId from './useCheckLoginUserId';

export const useCheckAdmin = (params: string) => {
  const [dataOn, setDataOn] = useState(false);
  const navigate = useNavigate();
  const currentUrl = window.location.href;

  const test = async () => {
    const {
      data: { user }
    } = await supabase.auth.getUser();
    console.log(user);
    const response = await supabase.from('admin').select().eq('id', user!.id).single();
    if (response.error || response.data === null) {
      alert('관리자만 이용이 가능합니다.');
      navigate('/');
      return;
    }
    const id = response.data.storeId;
    //아이디가 0이 아니면서 params랑 다른 아이디면 타매장으로 취급
    //아이디가 0이면 최상위 관리자라서 조회 가능

    if (id !== 0 && currentUrl.includes('grade')) {
      alert('권한이 없습니다.');
      const baseUrl = currentUrl.split('/');
      navigate(`/orderstatus/${id}`);
    }
    if (id !== 0 && params !== String(id)) {
      alert('타 매장의 주문 정보는 불러올 수 없습니다.');

      //본인이 선택한 정보의 페이지로 이동..
      const baseUrl = currentUrl.split('/');
      navigate(`/${baseUrl[3]}/${id}`);
    }
    setDataOn(true);
  };

  useEffect(() => {
    test();
  }, []);

  return [dataOn];
};
