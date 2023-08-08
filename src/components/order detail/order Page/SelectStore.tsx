import React, { useEffect, useState } from 'react';
import { supabase } from '../../../supabase';
import { StorePoint } from '../../../model/data';

const SelectStore = ({ dineIn, setStore }: any) => {
  const [storeData, setStoreData] = useState<StorePoint[] | null>();

  const fetchData = async () => {
    try {
      const storeData = await supabase.from('stores').select();
      setStoreData(storeData.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {storeData?.map((store) => {
        return (
          <button
            key={store.id}
            onClick={() => {
              // 선택한 매장을 store 상태에 담습니다.
              setStore(store);
            }}
          >
            {store.name}
          </button>
        );
      })}
    </>
  );
};

export default SelectStore;
