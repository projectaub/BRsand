import React from 'react';
import { supabase } from '../../supabase';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

// Define the Provider type with valid options
type Provider =
  | 'github'
  | 'google'
  | 'gitlab'
  | 'bitbucket'
  | 'facebook'
  | 'apple'
  | 'twitter'
  | 'linkedin'
  | 'bitbucket'
  | 'twitch'
  | 'discord'
  | 'kakao'
  | 'slack';

const LoginSocial = () => {
  const navigate = useNavigate();

  const signInWithOAuthAndLog = async (provider: Provider) => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider
    });

    if (error) {
      console.log(`Error signing in with ${provider}:`, error);
    } else {
      console.log(`Successfully signed in with ${provider}:`, data);
      alert('로그인');
      navigate('/');
    }
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          signInWithOAuthAndLog('kakao');
        }}
      >
        <QuickOrder>kakao</QuickOrder>
      </form>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          signInWithOAuthAndLog('slack');
        }}
      >
        <QuickOrder>slack</QuickOrder>
      </form>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          signInWithOAuthAndLog('google');
        }}
      >
        <QuickOrder>google</QuickOrder>
      </form>
    </div>
  );
};

export default LoginSocial;

const QuickOrder = styled.button`
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
