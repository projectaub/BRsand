import { useEffect, useState } from 'react';
import { supabase } from '../../supabase';
import { useNavigate, useParams } from 'react-router-dom';
import PieAge from '../../components/chart/pieChartAge';
import { useCheckAdmin } from '../../hook/useCheckAdmin';
import { Order } from '../../model';
import { dataSorted } from './feature/dataSort';
import { styled } from 'styled-components';

const Statistics = () => {
  const color = ['#B73D52', '#C3575E', '#CF716A', '#DB8B77', '#E7A583', '#F3BF8F', '#FFD99B', '#FFD99B'];
  const params = useParams();
  const [orderList, setOrderList] = useState<Order[]>([]);
  const [userAgeData, setUserAgeData] = useState<{ age: number }[]>([]);
  const [orderTime, setOrderTime] = useState<any>([]);
  const [dataOn] = useCheckAdmin(String(params.id));
  const navigate = useNavigate();

  const userAgeDataFilter = userAgeData.reduce((acc: any, age: any) => {
    const key = ~~(age.age / 10);
    if (acc[key]) {
      acc[key] = acc[key] + 1;
    } else {
      acc[key] = 1;
    }
    return acc;
  }, {});

  const userAgeArr = Object.keys(userAgeDataFilter).map((key) => {
    const newPieArr = {
      id: key + '0대',
      label: key + '0대',
      value: userAgeDataFilter[key],
      color: `${color[Number(key)]}`
    };
    return newPieArr;
  });

  // arr 이라는 배열을 돌면서 배열안에 들어있는 object를 콘솔로 다찍어주는 for문을 만들어주세요
  const fetchData = async () => {
    if (params.id === '0') {
      //데이터를 가져옴 파람스가 0 이라면 최상위 어드민임
      const { data } = await supabase.from('orders').select().is('isDone', true);
      setOrderList(data!);
    } else {
      // 데이터를 가져옴 파람스가 0이 아니면 매장 관리자임
      const { data } = await supabase.from('orders').select().eq('storeId', params.id).is('isDone', true);
      setOrderList(data!);
    }
  };

  const sortedData = dataSorted(orderList);
  const getUserAge = async () => {
    const { data } = await supabase.from('users').select('age').not('age', 'is', null);
    setUserAgeData(data!);
  };

  useEffect(() => {
    fetchData();
    getUserAge();
  }, []);

  console.log(sortedData.menuCount);
  return (
    <S.View>
      {/* <S.PageTitle>매장관리</S.PageTitle> */}
      {dataOn && (
        <>
          <S.InnerTitle>요약</S.InnerTitle>
          <S.Container>
            <S.ContentBox>
              <S.Title>매출</S.Title>
              <S.Content>{sortedData.sales}</S.Content>
            </S.ContentBox>
            <S.ContentBox>
              <S.Title>총 주문 건</S.Title>
              <S.Content>{sortedData.salesCount}</S.Content>
            </S.ContentBox>
            <S.ContentBox>
              <S.Title>커스텀메뉴 주문</S.Title>
              <S.Content>{sortedData.orderMenuNum}</S.Content>
            </S.ContentBox>
            <S.ContentBox>
              <S.Title>세트메뉴 주문</S.Title>
              <S.Content>{sortedData.orderCustomNum}</S.Content>
            </S.ContentBox>
          </S.Container>
          <S.Container>
            <S.ContentArea>
              <S.InnerTitle>연령대별 판매 추이</S.InnerTitle>
              <S.Container>
                <S.ChartArea>
                  <PieAge data={userAgeArr} />
                </S.ChartArea>
                {/* <S.ChartArea>
              <PieTime data={orderTimeArr} />
            </S.ChartArea> */}
              </S.Container>
            </S.ContentArea>
            <S.ContentArea>
              <S.InnerTitle>메뉴 판매 순위</S.InnerTitle>
              <S.MenuContentBox>
                {sortedData.menuCount
                  .sort((a, b) => {
                    return b.count - a.count;
                  })
                  .map((item, index) => {
                    return (
                      <div key={index}>
                        <S.ContentBox>
                          <S.Title>{index + 1}위</S.Title>
                          <S.Title>{item.name}</S.Title>
                          <S.Content>{item.count}개</S.Content>
                        </S.ContentBox>
                      </div>
                    );
                  })}
              </S.MenuContentBox>
            </S.ContentArea>
          </S.Container>
        </>
      )}
      <div style={{ width: '100px', height: '100px' }}></div>
    </S.View>
  );
};

export default Statistics;

const S = {
  View: styled.div`
    overflow-y: scroll;
    width: 100vw;
    height: calc(100vh - 100px);
    /* background-color: royalblue; */
  `,
  Container: styled.div`
    display: flex;
    gap: 20px;
    justify-content: center;
    margin-top: 30px;
  `,
  PageTitle: styled.div`
    /* margin-top: 80px; */
    font-size: 30px;
    font-weight: 700;
    text-align: center;
  `,
  InnerTitle: styled.div`
    /* margin: 30px; */
    margin-top: 80px;
    font-size: 30px;
    font-weight: 700;
    text-align: center;
  `,
  ContentBox: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 10px;
    width: 200px;
    height: 120px;
    background-color: #b73d52;
    border-radius: 20px;
  `,
  MenuContentBox: styled.div`
    margin-top: 30px;

    padding-top: 30px;
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    width: 100%;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 20px;
  `,
  Title: styled.div`
    font-size: 18px;
    color: white;
  `,
  Content: styled.div`
    font-size: 22px;
    color: #ffff00;
  `,
  ChartArea: styled.div`
    width: 600px;
    height: 500px;
    /* background-color: royalblue; */
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 20px;
  `,
  ContentArea: styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 30px;
  `
};
