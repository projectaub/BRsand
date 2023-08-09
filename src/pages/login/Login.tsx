import React, { useState } from 'react';
import { supabase } from '../../supabase';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ email });

    if (error) {
      console.log(error);
      const errorDescription = (error as any).error_description || error.message;
      alert(errorDescription);
    } else {
      alert('입력하신 메일에 접속하여 링크를 확인하세요!');
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
