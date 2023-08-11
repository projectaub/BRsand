import React, { useState, useRef } from 'react';
import { supabase } from '../../supabase';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';

interface FormValue {
  email: string;
  password: string;
  confirmingPw: string;
}

const Join = () => {
  //유효성검사 👇🏿
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<FormValue>();

  const passwordRef = useRef<string | null>(null);
  passwordRef.current = watch('password');

  //// 👆🏿
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

  const joinHandler: SubmitHandler<FormValue> = async (formdata: FormValue) => {
    setLoading(true);
    const { email, password } = formdata;
    setEmail('');
    setPassword('');

    ///이메일 중복검사
    const { data: existingUser, error: existingUserError } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (existingUser) {
      alert('이미 가입된 메일입니다');
      setLoading(false);
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email: formdata.email,
      password: formdata.password
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
      <form onSubmit={handleSubmit(joinHandler)}>
        <div>
          <input
            type="email"
            placeholder="e-mail"
            {...register('email', {
              required: true,
              pattern: /^\S+@\S+$/i
            })}
          />
          {errors.email && errors.email.type === 'required' && <p>메일을 입력하세요</p>}
          {errors.email && errors.email.type === 'pattern' && <p>올바른 메일 형식이 아닙니다</p>}
        </div>
        <div>
          <input
            type="password"
            placeholder="비밀번호"
            {...register('password', {
              required: true,
              minLength: 6
            })}
          />
          {errors.password && errors.password.type === 'required' && <p>비밀번호를 입력하세요</p>}
          {errors.password && errors.password.type === 'minLength' && <p>비밀번호는 최소 6자리 이상</p>}
        </div>
        <div>
          <input
            type="password"
            placeholder="비밀번호확인"
            {...register('confirmingPw', {
              required: true,
              validate: (value) => value === passwordRef.current
            })}
          />
          {errors.confirmingPw && errors.confirmingPw.type === 'required' && (
            <p>설정하고자 하는 비밀번호를 입력하세요</p>
          )}
          {errors.confirmingPw && errors.confirmingPw.type === 'validate' && <p>설정하고자 하는 비밀번호와 불일치</p>}
        </div>
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
