import React, { useState } from 'react';
import { supabase } from '../../supabase';

const Profile = () => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [grade, setGrade] = useState('');
  const [email, setEmail] = useState('');

  const profileHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const test = await supabase.auth;
    console.log(test);
    const { data } = await supabase.auth.getSession();
    console.log(data);

    const newProfile = {
      name,
      gender,
      age,
      grade: 'basic'
    };
    console.log(newProfile);
    try {
      const { data, error } = await supabase.from('users').insert(newProfile);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      Profile
      <form onSubmit={profileHandler}>
        <input placeholder="닉네임" value={name} onChange={(e) => setName(e.target.value)} />
        <input placeholder="성별" value={gender} onChange={(e) => setGender(e.target.value)} />
        <input placeholder="나이" value={age} onChange={(e) => setAge(e.target.value)} />
        <div>
          <button>입력완료</button>
        </div>
      </form>
    </div>
  );
};

export default Profile;

//user
//id, created_at, name, gender, age, email, grade
