import React, { useState } from 'react';
import { supabase } from '../../supabase';
import { useNavigate } from 'react-router-dom';
import LoginBasic from '../../components/login/LoginBasic';
import LoginOTP from '../../components/login/LoginOTP';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [selectLogin, setSelectLogin] = useState(true);

  const navigate = useNavigate();

  const moveJoinPage = async () => {
    navigate('/join');
  };

  const selectLoginWay = () => {
    setSelectLogin(!selectLogin);
  };

  return (
    <div>
      {selectLogin ? <LoginBasic></LoginBasic> : <LoginOTP></LoginOTP>}
      <div>
        <button onClick={selectLoginWay}>
          {selectLogin ? '이메일 인증으로 간편로그인 하기로 변경' : '아이디 패스워드로 로그인 하기로 변경'}
        </button>
      </div>

      <div>
        <button onClick={moveJoinPage}>회원가입하러 가기</button>
      </div>
    </div>
  );
};

export default Login;
