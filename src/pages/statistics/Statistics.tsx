import React from 'react';
import { useEffect, useState } from 'react';
import { supabase } from '../../supabase';

const Statistics = () => {
  const [statistics, setStatistics] = useState<any>([]);
  console.log(statistics);
  let sum = 0;
  let sum2 = 0;
  let sum3 = 0;

  // 프라이빗 라우터 , graph
  const fetchData = async () => {
    const { data } = await supabase.from('orders').select();
    setStatistics(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div>
        {statistics.forEach((item: any) => {
          if (item.isDone === true) {
            return (sum += item.price);
          }
        })}
        <div>총매출액 :{sum}</div>
      </div>
      <div>
        {statistics.forEach((item: any) => {
          if (item.isDone === true && item.storeId === '1') {
            return (sum2 += item.price);
          }
        })}
        <div>스토어1 :{sum2}</div>
      </div>
      <div>
        {statistics.forEach((item: any) => {
          if (item.isDone === true && item.storeId === '2') {
            return (sum3 += item.price);
          }
        })}
        <div>스토어2 :{sum3}</div>
      </div>
    </>
  );
};

export default Statistics;
