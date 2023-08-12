import React from 'react';
import { supabase } from '../../supabase';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

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
      console.log(data);
      // navigate('/');
      // await addProfiles(data.id);
    }
  };

  const addProfiles = async (userId: string) => {
    try {
      const { data: dbData } = await supabase.from('users').select('id').eq('id', userId);
      const isDbEmpty = !dbData || dbData.length === 0;

      if (isDbEmpty) {
        await supabase.from('users').insert([{ id: userId }]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={kakaoLogin}>
        <QuickOrder>카카오로그인</QuickOrder>
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
