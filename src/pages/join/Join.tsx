import React, { useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { supabase } from '../../supabase';

const Join = () => {
  useEffect(() => {
    const signUpUser = async () => {
      const { data, error } = await supabase.auth.signUp({
        email: 'example@email.com',
        password: 'example-password'
      });
      // 비동기 작업 완료 후 상태 업데이트 또는 추가 작업 수행
    };
    signUpUser();
  }, []);

  return <div>join</div>;
};

export default Join;
