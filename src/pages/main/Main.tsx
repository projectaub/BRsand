import React, { useEffect } from 'react';
import { supabase } from '../../supabase';
import { log } from 'console';

const Main = () => {
  const getUser = async () => {
    const {
      data: { user }
    } = await supabase.auth.getUser();
    console.log(user);
    if (!user) {
    }
  };

  useEffect(() => {
    getUser();
  });

  const logOut = async () => {
    const { error } = await supabase.auth.signOut();
  };

  return (
    <>
      <button
        onClick={() => {
          logOut();
        }}
      >
        로그아웃
      </button>
      <div>Main</div>
    </>
  );
};

export default Main;
