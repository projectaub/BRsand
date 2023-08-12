import React from 'react';
import { supabase } from '../../../supabase';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { styled } from 'styled-components';

interface FormValue {
  adminEmail: string;
  adminPw: string;
}

const AdminLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<FormValue>();
  const navigate = useNavigate();

  const adminLogin: SubmitHandler<FormValue> = async (data: FormValue) => {
    try {
      const { adminEmail, adminPw } = data;

      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('id')
        .eq('email', adminEmail)
        .single();

      if (userError) {
        setError('adminEmail', { type: 'manual', message: '등록되지 않은 메일' });
        return;
      }

      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: adminEmail,
        password: adminPw
      });
      console.log(data);

      if (error) {
        console.log(error);
        const errorDescription = (error as any).error_description || error.message;
        if (error.message.includes('Invalid login credentials')) {
          setError('adminPw', { type: 'manual', message: '잘못된 비밀번호' });
        } else {
          alert(errorDescription);
        }
      } else {
        alert('로그인');
      }

      const response = await supabase.from('admin').select().eq('email', adminEmail).single();
      if (response.data.storeId === 0) {
        navigate(`/statistics/${response.data.storeId}`);
      } else {
        navigate(`/orderstatus/${response.data.storeId}`);
      }
    } catch (error) {}
  };

  return (
    <S.Container>
      <S.ContentsArea>
        <S.Logo src="https://i.ibb.co/ZT0yLjj/02.png"></S.Logo>
        <S.Caption>관리자님 환영합니다.</S.Caption>
        <S.FormArea onSubmit={handleSubmit(adminLogin)}>
          <S.InputContainer>
            <div>
              <S.InputArea
                type="email"
                placeholder="어드민 아이디"
                {...register('adminEmail', {
                  required: true,
                  pattern: /^\S+@\S+$/i
                })}
              />
              {errors.adminEmail && errors.adminEmail.type === 'required' && <p>메일을 입력하세요</p>}
              {errors.adminEmail && errors.adminEmail.type === 'pattern' && <p>올바른 메일 형식이 아닙니다</p>}
              {errors.adminEmail && <p>{errors.adminEmail.message}</p>}
            </div>
            <div>
              <S.InputArea
                type="password"
                placeholder="비밀번호"
                {...register('adminPw', {
                  required: true,
                  minLength: 6
                })}
              />
              {errors.adminPw && errors.adminPw.type === 'required' && <p>비밀번호를 입력하세요</p>}
              {errors.adminPw && errors.adminPw.type === 'minLength' && <p>비밀번호는 최소 6자리 이상</p>}
              {errors.adminPw && <p>{errors.adminPw.message}</p>}
            </div>
            <S.SubmitButton type="submit">어드민 로그인</S.SubmitButton>
          </S.InputContainer>
        </S.FormArea>
      </S.ContentsArea>
    </S.Container>
  );
};

export default AdminLogin;

const S = {
  Container: styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #b73d52;
  `,
  ContentsArea: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  `,
  Logo: styled.img`
    width: 500px;
    margin-bottom: 10px;
  `,
  Caption: styled.p`
    font-size: 20px;
    color: white;
    margin-bottom: 30px;
  `,
  InputContainer: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 10px;
  `,
  SubmitButton: styled.button`
    width: 300px;
    box-sizing: border-box;
    font-size: 18px;
    padding: 20px;
    border-radius: 40px;
    outline: none;
    border: none;
    background-color: #ffd99b;
    color: #b73d52;
    font-weight: 700;
  `,
  InputArea: styled.input`
    width: 300px;
    height: 50px;
    padding: 20px;
    box-sizing: border-box;
    font-size: 18px;
    border-radius: 40px;
    outline: none;
    border: none;
  `,
  FormArea: styled.form``
};
