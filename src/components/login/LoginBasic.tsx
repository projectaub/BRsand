//login 실패 시 1. email, password값 reset, login 버튼 활성화
import { styled } from 'styled-components';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabase';
import { useForm, SubmitHandler } from 'react-hook-form';

interface FormValue {
  userEmail: string;
  userPassword: string;
}

const LoginBasic = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValue>();

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const pwLogin: SubmitHandler<FormValue> = async (data: FormValue) => {
    setLoading(true);
    const { userEmail, userPassword } = data;
    const { data: loginData, error } = await supabase.auth.signInWithPassword({
      email: userEmail,
      password: userPassword
    });

    console.log(loginData);

    if (error) {
      console.log(error);
      const errorDescription = (error as any).error_description || error.message;
      alert(errorDescription);
      setLoading(false);
    } else {
      alert('로그인');
      navigate('/');
      setLoading(false);
    }
  };

  return (
    <>
      <Stform onSubmit={handleSubmit(pwLogin)}>
        <StLogin>LOGIN</StLogin>
        <div>
          <StInput
            type="email"
            placeholder="메일주소를 입력하세요"
            {...register('userEmail', {
              required: true,
              pattern: /^\S+@\S+$/i
            })}
          />
          {errors.userEmail && errors.userEmail.type === 'required' && <p>메일을 입력하세요</p>}
          {errors.userEmail && errors.userEmail.type === 'pattern' && <p>올바른 메일 형식이 아닙니다</p>}
        </div>

        <div>
          <StInput
            type="password"
            placeholder="비번을 입력하세요"
            {...register('userPassword', {
              required: true,
              minLength: 6
            })}
          />
          {errors.userPassword && errors.userPassword.type === 'required' && <p>비밀번호를 입력하세요</p>}
          {errors.userPassword && errors.userPassword.type === 'minLength' && <p>비밀번호는 최소 6자리 이상입니다</p>}
        </div>

        <LoginBtn disabled={loading}>{loading ? <span>Loading</span> : <span>로그인</span>}</LoginBtn>
      </Stform>
    </>
  );
};

const StLogin = styled.h1`
  text-align: center;
  font-size: 30px;
  color: #b73d52;
  font-weight: bold;
  margin-bottom: 10px;
`;

const LoginBtn = styled.button`
  width: 100px;
  height: 30px;
  background-color: #b73d52;
  border: none;
  color: white;
  border-radius: 5px;
  margin-left: 60px;
  cursor: pointer;
  &:hover {
    box-shadow: 1px 1px 1px #a6a6a6;
  }
`;

const Stform = styled.form`
  width: 210px;
  margin: 0 auto;
  margin-top: 250px;
`;

const StInput = styled.input`
  margin: 0 auto;
  width: 200px;
  height: 50px;
  border-radius: 10px;
  border: none;
  margin-bottom: 20px;
  padding: 0 10px 0 10px;
  background-color: #f0efef;
  outline: none;
`;

export default LoginBasic;
