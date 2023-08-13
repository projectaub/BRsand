import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabase';
import { styled } from 'styled-components';

const LoginOTP = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  const navigate = useNavigate();

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
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <StInput
            type="email"
            placeholder="메일주소를 입력하세요"
            value={email}
            required={true}
            onChange={(e: any) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <StBtn disabled={loading}>{loading ? <span>Loading</span> : <span>인증메일 발송</span>}</StBtn>
        </div>
      </form>
    </>
  );
};

const StInput = styled.input`
  margin: 0 auto;
  width: 200px;
  height: 50px;
  margin-top: 20px;
  border-radius: 10px;
  border: none;
  margin-bottom: 20px;
  padding: 0 10px 0 10px;
  background-color: #f0efef;
  outline: none;
  margin-left: 100px;
`;

const StBtn = styled.button`
  width: 100px;
  height: 30px;
  background-color: #939393;
  margin-bottom: 180px;
  border: none;
  color: white;
  border-radius: 5px;
  margin-left: 152px;
  cursor: pointer;
  &:hover {
    box-shadow: 1px 1px 1px #a6a6a6;
  }
`;

export default LoginOTP;
