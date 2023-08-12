import React from 'react';
import { supabase } from '../../supabase';
import { useNavigate } from 'react-router-dom';

const LoginSocial = () => {
  const navigate = useNavigate();

  const kakaoLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao'
    });

    if (error) {
      console.log(error);
    } else {
      alert('로그인');
      navigate('/');
    }
  };

  return (
    <div>
      <form onSubmit={kakaoLogin}>
        <button>카카오로그인</button>
      </form>
    </div>
  );
};

export default LoginSocial;
