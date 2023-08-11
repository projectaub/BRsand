import { useEffect, useState } from 'react';
import { supabase } from '../../supabase';
import { useParams } from 'react-router-dom';
import PieAge from '../../component/chart/pieChartAge';
import PieTime from '../../component/chart/pieChartTime';

const Statistics = () => {
  let sum: any = 0;
  let sum2: any = 0;
  let sum3: any = 0;
  const params = useParams();
  const [statistics, setStatistics] = useState<any>([]);
  const [userAgeData, setUserAgeData] = useState<any>([]);
  const [orderTime, setOrderTime] = useState<any>([]);

  console.log('statistics==>', statistics);
  const userAgeDataFilter = userAgeData.reduce((acc: any, age: any) => {
    const key = ~~(age.age / 10);
    if (acc[key]) {
      acc[key] = acc[key] + 1;
    } else {
      acc[key] = 1;
    }
    return acc;
  }, {});

  const orderPmTiemFilter = orderTime.reduce((acc: any, item: any) => {
    const key = new Date(item.time).getHours();
    if (acc[key]) {
      acc[key] = acc[key] + 1;
    } else {
      acc[key] = 1;
    }
    return acc;
  }, {});

  // 아무것도 없는 오브젝트

  const pieTiemData = Object.keys(orderPmTiemFilter);
  const pieAgeData = Object.keys(userAgeDataFilter);
  const orderTimeArr = pieTiemData.map((key) => {
    const newTimeArr = {
      id: key,
      label: key,
      value: orderPmTiemFilter[key],
      color: `rgb(255,${key}0,255);`
    };
    return newTimeArr;
  });

  const userAgeArr = pieAgeData.map((key) => {
    const newPieArr = {
      id: key + 0,
      label: key + 0,
      value: userAgeDataFilter[key],
      color: `rgb(255,${key}0,255);`
    };
    return newPieArr;
  });

  // arr 이라는 배열을 돌면서 배열안에 들어있는 object를 콘솔로 다찍어주는 for문을 만들어주세요
  const fetchData = async () => {
    if (params.id === '0') {
      const { data } = await supabase.from('orders').select();
      setStatistics(data);
    } else {
      const { data } = await supabase.from('orders').select().eq('storeId', params.id);
      setStatistics(data);
    }
    const { data } = await supabase.from('orders').select().filter('isDone', 'in', '(true)');
    setStatistics(data);
  };
  const getUserAge = async () => {
    const { data } = await supabase.from('users').select('age');
    setUserAgeData(data);
  };

  const getOderTime = async () => {
    if (params.id === '0') {
      const { data } = await supabase
        .from('orders')
        .select()
        .gte('time', '2023-08-10T00:00:00.114748+00:00')
        .lte('time', '2023-08-10T14:00:00.114748+00:00');
      setOrderTime(data);
    } else {
      const { data } = await supabase
        .from('orders')
        .select()
        .eq('storeId', params.id)
        .gte('time', '2023-08-10T00:00:00.114748+00:00')
        .lte('time', '2023-08-10T14:00:00.114748+00:00');
      setOrderTime(data);
    }
  };

  useEffect(() => {
    fetchData();
    getUserAge();
    getOderTime();
  }, []);

  return (
    <>
      <div>
        {statistics.forEach((item: any) => {
          if (item.isDone === true) {
            return (sum += item.price);
          }
        })}
        {params.id === '0' && <div>총매출액 :{sum}</div>}
      </div>

      <div>
        {statistics.forEach((item: any) => {
          if (item.isDone === true && item.storeId === 1) {
            return (sum2 += item.price);
          }
        })}
        {(params.id === '0' || params.id === '1') && <div>스토어1 :{sum2}</div>}
      </div>
      <div>
        {statistics.forEach((item: any) => {
          if (item.isDone === true && item.storeId === 2) {
            return (sum3 += item.price);
          }
        })}
        {(params.id === '0' || params.id === '2') && <div>스토어2 :{sum3}</div>}
        <div style={{ height: '300px', display: 'flex' }}>
          <PieAge data={userAgeArr} />
          <PieTime data={orderTimeArr} />
        </div>
      </div>
    </>
  );
};

export default Statistics;
