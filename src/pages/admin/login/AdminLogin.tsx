import React, { ChangeEvent } from 'react';
import { supabase } from '../../../supabase';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

interface FormValue {
  adminEmail: string;
  adminPw: string;
}

const AdminLogin = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormValue>();
  const navigate = useNavigate();

  const adminLogin = async (data: FormValue) => {
    try {
      const { adminEmail, adminPw } = data;
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: adminEmail,
        password: adminPw
      });
      if (error) {
        setError('adminEmail', {
          type: 'manual',
          message: '유효한 이메일과 비밀번호를 입력하세요.'
        });
        setError('adminPw', {
          type: 'manual',
          message: '유효한 이메일과 비밀번호를 입력하세요.'
        });
        return;
      }
      const response = await supabase.from('admin').select().eq('id', adminEmail).single();
      if (response.data.storeId === 0) {
        navigate(`/statistics/${response.data.storeId}`);
      } else {
        navigate(`/orderstatus/${response.data.storeId}`);
      }
    } catch (error) {}
  };

  return (
    <>
      <form onSubmit={handleSubmit(adminLogin)}>
        <div>
          <input
            type="email"
            placeholder="이메일"
            {...register('adminEmail', {
              required: '이메일을 입력하세요.'
            })}
          />
          {errors.adminEmail && <p>{errors.adminEmail.message}</p>}
        </div>
        <div>
          <input
            type="password"
            placeholder="비밀번호"
            {...register('adminPw', {
              required: '비밀번호를 입력하세요.'
            })}
          />
          {errors.adminPw && <p>{errors.adminPw.message}</p>}
        </div>
        <button type="submit">어드민 로그인</button>
      </form>
    </>
  );
};

export default AdminLogin;
