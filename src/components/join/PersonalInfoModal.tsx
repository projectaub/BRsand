import React, { useState } from 'react';
import { supabase } from '../../supabase';

interface PersonalInfoModalProps {
  userData: any;
  closeModal: () => void;
}

const PersonalInfoModal: React.FC<PersonalInfoModalProps> = ({ userData, closeModal }) => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');

  const submitPersonalInfo = async () => {
    try {
      await supabase.from('users').update({ name, gender, age, grade: 'basic' }).eq('uid', userData.user!.id);
      alert('추가 정보입력이 완료되었습니다...');
      closeModal();
    } catch (error) {
      console.error('Error updating personal user Info:', error);
    }
  };

  // const closeModal = () => {
  //   setShowPersonalInfoModal(false);
  // };

  return (
    <div className="modal">
      <h2>개인 정보 입력</h2>
      <input placeholder="이름" value={name} onChange={(e) => setName(e.target.value)} />
      <input placeholder="성별" value={gender} onChange={(e) => setGender(e.target.value)} />
      <input placeholder="나이" value={age} onChange={(e) => setAge(e.target.value)} />
      <button onClick={submitPersonalInfo}>입력 완료</button>
      <button onClick={closeModal}>취소</button>
    </div>
  );
};

export default PersonalInfoModal;
