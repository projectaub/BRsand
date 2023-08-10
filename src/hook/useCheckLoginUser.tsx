import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import { User } from '../model';
import { useNavigate } from 'react-router-dom';

const useCheckLoginUser = () => {
  const [userId, setUserId] = useState<string>();
  const navigate = useNavigate();

  const fetchUserData = async () => {
    try {
      //로그인한 유저의 정보를 가져옵니다.
      const {
        data: { user }
      } = await supabase.auth.getUser();

      if (user === null) {
        alert('로그인 후 이용 가능합니다.');
        navigate('/');
        return;
      } else {
        setUserId(user.id);
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return [userId];
};

export default useCheckLoginUser;
