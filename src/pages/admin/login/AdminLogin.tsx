import React from 'react';
import { supabase } from '../../../supabase';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';

interface FormValue {
  adminEmail: string;
  adminPw: string;
}

const AdminLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValue>();
  const navigate = useNavigate();

  const adminLogin: SubmitHandler<FormValue> = async (data: FormValue) => {
    try {
      const { adminEmail, adminPw } = data;
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: adminEmail,
        password: adminPw
      });
      console.log(data);

      if (error) {
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
              required: true,
              pattern: /^\S+@\S+$/i
            })}
          />
          {errors.adminEmail && errors.adminEmail.type === 'required' && <p>메일을 입력하세요</p>}
          {errors.adminEmail && errors.adminEmail.type === 'pattern' && <p>올바른 메일 형식이 아닙니다</p>}
        </div>
        <div>
          <input
            type="password"
            placeholder="비밀번호"
            {...register('adminPw', {
              required: true,
              minLength: 6
            })}
          />
          {errors.adminPw && errors.adminPw.type === 'required' && <p>비밀번호를 입력하세요</p>}
          {errors.adminPw && errors.adminPw.type === 'minLength' && <p>비밀번호는 최소 6자리 이상</p>}
        </div>
        <button type="submit">어드민 로그인</button>
      </form>
    </>
  );
};

export default AdminLogin;
