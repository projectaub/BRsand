import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabase';
import { useNavigate } from 'react-router-dom';

const Join = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState<any>(null);
  const [showPersonalInfoAlert, setShowPersonalInfoAlert] = useState(false);
  const [showPersonalInfoModal, setShowPersonalInfoModal] = useState(false);
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const navigate = useNavigate();
  //주석...
  useEffect(() => {
    if (userData) {
      setShowPersonalInfoAlert(true);
    }
  }, [userData]);

  const joinHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setEmail('');
    setPassword('');
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    });
    // console.log(error);
    console.log('가입 잘 되?', data.user!.email);

    if (error) {
      console.log(error);
      const errorDescription = (error as any).error_description || error.message;
      alert(errorDescription);
    } else {
      alert('가입완료!');
      //자동로그인
      const { data, error: loginError } = await supabase.auth.signInWithPassword({ email, password });

      console.log('로그인 잘 되?', email);
      console.log(data);
      if (loginError) {
        console.error('로그인에러:', loginError);
      } else {
        alert('로그인');
        setUserData(data);
        postUid(data.user!.id);
        emailUpdater(data);
        //함수 합치기
        const condition = window.confirm('로그인이 완료되었습니다. 추가 정보를 입력하시겠습니까?');

        if (condition) {
          setShowPersonalInfoModal(true);
        } else {
          navigate('/');
        }
      }

      // setShowPersonalInfoAlert(true);
    }
    setLoading(false);
  };
  const handlePersonalInfoAlert = () => {
    setShowPersonalInfoAlert(false);
    setShowPersonalInfoModal(true);
  };
  const emailUpdater = async (userData: any) => {
    await supabase.from('users').update({ email: userData.user!.email, grade: 'basic' }).eq('id', userData.user!.id);
  };
  const submitPersonalInfo = async () => {
    try {
      await supabase.from('users').update({ name, gender, age, grade: 'basic' }).eq('id', userData.user!.id);
      alert('입력완료되었다. 즐거운 이용 하시길 바람...');
      navigate('/');
    } catch (error) {
      console.error('Error updating personal user Info:', error);
    }
  };
  const closeModal = () => {
    setShowPersonalInfoModal(false);
  };
  const postUid = async (id: string) => {
    try {
      await supabase.from('users').insert({ id });
    } catch (error) {
      console.error('Error updating user ID:', error);
    }
  };
  return (
    <div>
      <h1>회원가입</h1>
      <form onSubmit={joinHandler}>
        <input placeholder="e-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input placeholder="pw" value={password} onChange={(e) => setPassword(e.target.value)} />
        <div>
          <button>가입하기</button>
        </div>
      </form>
      {showPersonalInfoAlert && (
        <div className="alert">
          <h2>내 정보 업데이트 하러가기</h2>
          <button onClick={handlePersonalInfoAlert}>수락</button>
          <button onClick={() => setShowPersonalInfoAlert(false)}>다음에하기</button>
        </div>
      )}
      {showPersonalInfoModal && (
        <div className="modal">
          <h2>개인 정보 입력</h2>
          <input placeholder="이름" value={name} onChange={(e) => setName(e.target.value)} />
          <input placeholder="성별" value={gender} onChange={(e) => setGender(e.target.value)} />
          <input placeholder="나이" value={age} onChange={(e) => setAge(e.target.value)} />
          <button onClick={submitPersonalInfo}>입력 완료</button>
          <button onClick={closeModal}>취소</button>
        </div>
      )}
    </div>
  );
};

export default Join;
