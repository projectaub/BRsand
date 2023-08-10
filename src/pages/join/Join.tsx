import React, { useState } from 'react';
import JoinForm from '../../components/join/JoinForm';
import PersonalInfoModal from '../../components/join/PersonalInfoModal';

const Join = () => {
  const [userData, setUserData] = useState<any>(null);
  const [showPersonalInfoModal, setShowPersonalInfoModal] = useState(false);

  const closeModal = () => {
    setShowPersonalInfoModal(false);
  };

  return (
    <div>
      <JoinForm setUserDataProp={setUserData} setShowPersonalInfoModalProp={setShowPersonalInfoModal} />
      {/* {showPersonalInfoModal && <PersonalInfoModal userData={userData} closeModal={closeModal} />} */}
    </div>
  );
};

export default Join;
