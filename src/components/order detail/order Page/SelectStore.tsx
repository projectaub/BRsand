import React, { useEffect, useState } from 'react';
import { supabase } from '../../../supabase';
import { StorePoint } from '../../../model/data';
import { styled } from 'styled-components';

const SelectStore = ({ store, setStore }: any) => {
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
      {/* 이용하실 매장을 선택해 주세요. */}

      <S.CaptionArea>
        <S.Caption> {store ? `` : '이용하실 매장을 선택해 주세요.'}</S.Caption>
      </S.CaptionArea>

      {storeData?.map((store) => {
        return (
          <S.BtnArea
            key={store.id}
            onClick={() => {
              // 선택한 매장을 store 상태에 담습니다.
              setStore(store);
            }}
          >
            <S.Name>{store.name}</S.Name>
            <S.Address>{store.address}</S.Address>
          </S.BtnArea>
        );
      })}
    </>
  );
};

export default SelectStore;

const S = {
  Container: styled.div`
    /* margin-top: 16px; */
    display: flex;
    flex-direction: column;
    gap: 10px;
  `,
  CaptionArea: styled.div`
    margin-top: 30px;
  `,
  Caption: styled.p`
    font-size: 18px;
    margin: 8px 0px 0px 15px;
    font-weight: 700;

    color: #b73d52;
  `,
  BtnArea: styled.div`
    /* background-color: royalblue; */
    height: 80px;
    /* margin: 0px 10px; */
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 8px;
    border-bottom: 1px solid black;
    margin-left: 15px;
    margin-right: 15px;
  `,
  Name: styled.div`
    font-weight: 500;
    font-size: 24px;
  `,
  Address: styled.div`
    font-size: 18px;
  `,

  Btn: styled.button`
    width: calc(361px / 2 - 8px);
    padding: 8px;
    outline: none;
    border: 1px solid #226f54;
    border-radius: 50px;
    background-color: white;
    font-size: 18px;
    color: #226f54;
  `
};
