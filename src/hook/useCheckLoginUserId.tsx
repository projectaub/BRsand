import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import { User } from '../model';
import { useNavigate } from 'react-router-dom';

const useCheckLoginUserId = () => {
  const [userId, setUserId] = useState<string>();
  const navigate = useNavigate();

  const fetchUserData = async () => {
    try {
      const {
        data: { user }
      } = await supabase.auth.getUser();

      console.log('로그인한 유저', user);

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

export default useCheckLoginUserId;
