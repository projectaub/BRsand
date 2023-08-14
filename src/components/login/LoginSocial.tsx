import React, { useState } from 'react';
import { supabase } from '../../supabase';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { User } from '@supabase/supabase-js';

type Provider = 'google' | 'kakao' | 'slack';

const LoginSocial = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  const signInWithOAuthAndLog = async (provider: Provider) => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider
    });

    if (error) {
      console.log(`Error signing in with ${provider}:`, error);
    } else {
      console.log(`Successfully signed in with ${provider}:`, data);
      alert('로그인');
      getUser();
      getUserInfo();
      navigate('/');
    }
  };

  const getUser = async () => {
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
      setUser(null);
    } else {
      setUser(user);
      console.log(user.id);
      console.log(user.user_metadata);
    }
  };

  const getUserInfo = async () => {
    const { data: userInfo } = await supabase.from('users').select('id').single();
    if (userInfo) {
      console.log('유저정보등록되어있음');
      return;
    } else {
      updateUserInfo();
    }
  };

  const updateUserInfo = async () => {
    await supabase
      .from('users')
      .insert({ id: user!.id, email: user!.user_metadata['email'], grade: 'basic', name: user!.user_metadata['name'] });
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          signInWithOAuthAndLog('kakao');
        }}
      >
        <SocialLogin>kakao</SocialLogin>
      </form>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          signInWithOAuthAndLog('slack');
        }}
      >
        <SocialLogin>slack</SocialLogin>
      </form>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          signInWithOAuthAndLog('google');
        }}
      >
        <SocialLogin>google</SocialLogin>
      </form>
    </div>
  );
};

export default LoginSocial;

const SocialLogin = styled.button`
  width: 120px;
  height: 35px;
  display: block;
  font-size: 17px;
  background-color: #fce8c7;
  border: none;
  color: #222222;
  border-radius: 5px;
  margin: 0 auto;
  margin-top: 15px;
  cursor: pointer;
  &:hover {
    background-color: #facd83;
    color: white;
  }
`;
