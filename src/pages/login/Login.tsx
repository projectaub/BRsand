import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { supabase } from '../../supabase';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ email });

    if (error) {
      const errorDescription = (error as any).error_description || error.message;
      alert(errorDescription);
    } else {
      alert('Check your email for the login link!');
    }
    setLoading(false);
  };

  return (
    <div>
      Logo
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
        <div>
          <button disabled={loading}>{loading ? <span>Loading</span> : <span>이메일로 로그인!</span>}</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
