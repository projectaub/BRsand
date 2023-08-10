import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabase';

const LoginBasic = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectLogin, setSelectLogin] = useState(true);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    // const { error } = await supabase.auth.signInWithOtp({ email });

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
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            placeholder="메일주소를 입력하세요"
            value={email}
            required={true}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* 테스트 */}
        <div>
          <input
            type="password"
            placeholder="비번을 입력하세요"
            value={password}
            required={true}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <button disabled={loading}>{loading ? <span>Loading</span> : <span>로그인</span>}</button>
        </div>
      </form>
    </>
  );
};

export default LoginBasic;
