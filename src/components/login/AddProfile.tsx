import { supabase } from '../../supabase';
import React, { useEffect, useState } from 'react';

const AddProfile = () => {
  const [user, setUser] = useState<{ id: string }>({ id: '' });
  const [isDbEmpty, setIsDbEmpty] = useState(false);

  const getUser = async () => {
    const {
      data: { user }
    } = await supabase.auth.getUser();
  };

  console.log(user);

  useEffect(() => {
    getUser();
  }, []);

  const checkDb = async () => {
    await supabase.from('users').select('id').eq('id', user.id);
    setIsDbEmpty(true);
  };
  const addUserProfiles = async () => {
    await supabase.from('users').insert(user.id);
  };
};

export default AddProfile;
