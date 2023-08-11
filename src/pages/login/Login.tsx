import React, { useState } from 'react';
import { supabase } from '../../supabase';
import { useNavigate } from 'react-router-dom';
import LoginBasic from '../../components/login/LoginBasic';
import LoginOTP from '../../components/login/LoginOTP';
import { styled } from 'styled-components';

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
    <StBack>
      {selectLogin ? <LoginBasic></LoginBasic> : <LoginOTP></LoginOTP>}
      <div>
        <StLogin onClick={selectLoginWay}>{selectLogin ? '간편로그인' : '기본로그인'}</StLogin>
      </div>

      <div>
        <StJoin onClick={moveJoinPage}>회원가입</StJoin>
      </div>
    </StBack>
  );
};

const StLogin = styled.button`
  width: 100px;
  height: 30px;
  background-color: #b73d52;
  border: none;
  color: white;
  border-radius: 5px;
  margin-left: 152px;
  margin-top: 10px;
  cursor: pointer;
  &:hover {
    box-shadow: 1px 1px 1px #a6a6a6;
  }
`;

const StJoin = styled.button`
  width: 100px;
  height: 30px;
  background-color: #facd83;
  border: none;
  color: white;
  border-radius: 5px;
  margin-left: 152px;
  margin-top: 10px;
  cursor: pointer;
  &:hover {
    box-shadow: 1px 1px 1px #a6a6a6;
  }
`;

const StBack = styled.div``;

export default Login;
