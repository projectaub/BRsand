import React, { ChangeEvent, useState } from 'react';
import { supabase } from '../../../supabase';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const idInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };
  const passwordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const adminLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email: id, password });
      if (error) {
        return;
      }
      const response = await supabase.from('admin').select().eq('id', id).single();
      if (response.data.storeId === 0) {
        navigate(`/statistics/${response.data.storeId}`);
      } else {
        navigate(`/orderstatus/${response.data.storeId}`);
      }
    } catch (error) {}
  };

  return (
    <>
      <form onSubmit={adminLogin}>
        <input value={id} onChange={idInput}></input>
        <input type="password" value={password} onChange={passwordInput}></input>
        <button>어드민 로그인 </button>
      </form>
    </>
  );
};

export default AdminLogin;
