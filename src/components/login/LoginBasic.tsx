import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabase';
import { useForm, SubmitHandler } from 'react-hook-form';

interface FormValue {
  email: string;
  password: string;
}

const LoginBasic = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValue>();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const pwLogin: SubmitHandler<FormValue> = async (formdata: FormValue) => {
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      console.log(error);
      const errorDescription = (error as any).error_description || error.message;
      alert(errorDescription);
    } else {
      alert('로그인 되었읍니다.');
      navigate('/');
      setLoading(false);
    }
  };

  return (
    <>
      <Stform onSubmit={handleSubmit}>
        <StLogin>LOGIN</StLogin>
        <div>
          <StInput
            type="email"
            placeholder="메일주소를 입력하세요"
            {...register('email', {
              required: true,
              pattern: /^\S+@\S+$/i
            })}
          />
          {errors.email && errors.email.type === 'required' && <p>메일을 입력하세요</p>}
          {errors.email && errors.email.type === 'pattern' && <p>올바른 메일 형식이 아닙니다</p>}
        </div>

        {/* 테스트 */}
        <div>
          <StInput
            type="password"
            placeholder="비번을 입력하세요"
            {...register('password', {
              required: true,
              minLength: 6
            })}
          />
          {errors.password && errors.password.type === 'required' && <p>비밀번호를 입력하세요</p>}
          {errors.password && errors.password.type === 'minLength' && <p>비밀번호는 최소 6자리 이상</p>}
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
