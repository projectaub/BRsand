import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabase';

interface JoinFormProps {
  setUserDataProp: React.Dispatch<React.SetStateAction<any>>;
  setShowPersonalInfoModalProp: React.Dispatch<React.SetStateAction<boolean>>;
}

const JoinForm: React.FC<JoinFormProps> = ({ setUserDataProp, setShowPersonalInfoModalProp }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState<any>(null);
  const [showPersonalInfoModal, setShowPersonalInfoModal] = useState(false);
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [isJoin, setIsJoin] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  const joinHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setEmail('');
    setPassword('');
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    });

    console.log('가입 잘 되?', data.user!.email);

    if (error) {
      console.log(error);
      const errorDescription = (error as any).error_description || error.message;
      alert(errorDescription);
    } else {
      alert('가입완료!');
      setIsJoin(true);

      //자동로그인
      const { data, error: loginError } = await supabase.auth.signInWithPassword({ email, password });

      console.log('로그인 잘 되?', email);

      if (loginError) {
        console.error('로그인에러:', loginError);
      } else {
        setIsLogin(true);
        setUserData(data);
        userInfoUpdater(data);

        const condition = window.confirm('로그인이 완료되었습니다. 추가 정보를 입력하시겠습니까?');
        if (condition) {
          setShowPersonalInfoModal(true);
        } else {
          navigate('/');
        }
      }
    }
    setLoading(false);
  };

  // 회원가입시 기본으로 알 수 있는 값 db에 업데이트(UID, grade, email)
  const userInfoUpdater = async (userData: any) => {
    await supabase.from('users').insert({ uid: userData.user!.id });
    //uid column값을 새로 만들지 말고 기존에 존재하는 id을 uid로 설정!
    await supabase.from('users').update({ email: userData.user!.email, grade: 'basic' }).eq('uid', userData.user!.id);
  };

  const submitPersonalInfo = async () => {
    try {
      await supabase.from('users').update({ name, gender, age, grade: 'basic' }).eq('uid', userData.user!.id);
      alert('추가 정보입력이 완료되었습니다...');
      navigate('/');
    } catch (error) {
      console.error('Error updating personal user Info:', error);
    }
  };

  const closeModal = () => {
    setShowPersonalInfoModal(false);
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

export default JoinForm;
