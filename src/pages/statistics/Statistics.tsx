import { useEffect, useState } from 'react';
import { supabase } from '../../supabase';
import { useNavigate, useParams } from 'react-router-dom';
import PieAge from '../../components/chart/pieChartAge';
import PieTime from '../../components/chart/pieChartTime';
import { useCheckAdmin } from '../../hook/useCheckAdmin';
import { Order } from '../../model';
import Sales from '../../components/statistics/Sales';

const Statistics = () => {
  const color = ['#B73D52', '#C3575E', '#CF716A', '#DB8B77', '#E7A583', '#F3BF8F', '#FFD99B', '#FFD99B'];

  let sum: any = 0;
  let sum2: any = 0;
  let sum3: any = 0;
  const params = useParams();
  const [orderList, setOrderList] = useState<Order[]>([]);
  const [userAgeData, setUserAgeData] = useState<{ age: number }[]>([]);
  const [orderTime, setOrderTime] = useState<any>([]);
  const navigate = useNavigate();
  const [dataOn] = useCheckAdmin(String(params.id));

  // console.log('orderList==>', orderList);

  // const orderPmTiemFilter = orderTime.reduce((acc: any, item: any) => {
  //   const key = new Date(item.time).getHours();
  //   if (acc[key]) {
  //     acc[key] = acc[key] + 1;
  //   } else {
  //     acc[key] = 1;
  //   }
  //   return acc;
  // }, {});

  // // 아무것도 없는 오브젝트

  // const pieTiemData = Object.keys(orderPmTiemFilter);
  // const orderTimeArr = pieTiemData.map((key) => {
  //   const newTimeArr = {
  //     id: key,
  //     label: key,
  //     value: orderPmTiemFilter[key],
  //     color: color[Number(key)]
  //   };
  //   return newTimeArr;
  // });
  // const userAgeDataFilter = userAgeData.reduce((acc: any, age: any) => {
  //   const key = ~~(age.age / 10);
  //   if (acc[key]) {
  //     acc[key] = acc[key] + 1;
  //   } else {
  //     acc[key] = 1;
  //   }
  //   return acc;
  // }, {});

  // const userAgeArr = Object.keys(userAgeDataFilter).map((key) => {
  //   // console.log(color[Number(key)]);
  //   // console.log(key);
  //   const newPieArr = {
  //     id: key + 0,
  //     label: key + '0대',
  //     value: userAgeDataFilter[key],
  //     color: `{color[Number(key)]}`
  //   };
  //   console.log('파이 데이터', newPieArr);
  //   return newPieArr;
  // });

  useEffect(() => {
    fetchData();
  }, []);

  // arr 이라는 배열을 돌면서 배열안에 들어있는 object를 콘솔로 다찍어주는 for문을 만들어주세요
  const fetchData = async () => {
    if (params.id === '0') {
      //데이터를 가져옴 파람스가 0 이라면 최상위 어드민임
      const { data } = await supabase.from('orders').select().is('isDone', true);
      setOrderList(data!);
    } else {
      // 데이터를 가져옴 파람스가 0이 아니면 매장 관리자임
      const { data } = await supabase.from('orders').select().eq('storeId', params.id).is('isDone', true);
      console.log(data);
      setOrderList(data!);
    }
  };

  // const sales =
  const dataSorted = () => {
    //매출
    let sales = 0;
    //주문 건 수 변수
    let salesCount = orderList.length;
    // 커스텀 주문 건수
    let orderCustom = [];
    let orderCustomNum = orderCustom.length;
    //메뉴 주문 건수
    let orderMenu = [];
    let orderMenuNum = orderMenu.length;

    // 베이스 메뉴별 판매량
    const menuCount: { name: string; count: number }[] = [];
    const ageCount: { gen: string; count: number }[] = [];

    //한번의 순회 반복문으로 다양한 데이터를 걸러야함...
    let counts: { [key: string]: number } = {};
    let ageCounts: { [key: string]: number } = {};

    orderList.forEach((order) => {
      const base = order.orderMenu.base;
      counts[base] ? counts[base]++ : (counts[base] = 1);
      if (order.user.age) {
        const age = Math.floor(order.user.age / 10);
        ageCounts[age] ? ageCounts[age]++ : (ageCounts[age] = 1);
      }
      sales += order.price;
      order.orderMenu.bread ? orderCustom.push(order) : orderMenu.push(order);
    });

    Object.keys(counts).forEach((base) => {
      menuCount.push({ name: base, count: counts[base] });
    });
    Object.keys(ageCounts).forEach((age) => {
      ageCount.push({ gen: age, count: ageCounts[age] });
    });

    console.log(sales.toLocaleString('ko-KR'), '오늘 매출');
    console.log(salesCount, '총 주문건');
    console.log(orderCustomNum, '총 커스텀 주문건');
    console.log(orderMenuNum, '총 메뉴 주문건');
    console.log(menuCount, '베이스 메뉴별 판매량');
    console.log(ageCount, '나이대별 판매량');

    // 오늘의 매출
  };
  dataSorted();
  // const getUserAge = async () => {
  //   const { data } = await supabase.from('users').select('age').not('age', 'is', null);
  //   console.log(data);
  //   setUserAgeData(data!);
  // };

  // const getOrderTimeData = async () => {
  //   if (params.id === '0') {
  //     const { data } = await supabase
  //       .from('orders')
  //       .select()
  //       .gte('time', '2023-08-10T00:00:00.114748+00:00')
  //       .lte('time', '2023-08-10T14:00:00.114748+00:00');
  //     setOrderTime(data);
  //   } else {
  //     const { data } = await supabase
  //       .from('orders')
  //       .select()
  //       .eq('storeId', params.id)
  //       .gte('time', '2023-08-10T00:00:00.114748+00:00')
  //       .lte('time', '2023-08-10T14:00:00.114748+00:00');
  //     setOrderTime(data);
  //   }
  // };

  return (
    <>
      {dataOn && (
        <>
          {/* <Sales id={params.id} ></Sales> */}
          <div className="what">
            {/* {orderList.forEach((item: Order): => {
              if (item.isDone === true) {
                return (sum += item.price);
              }
            })} */}
            {/* {params.id === '0' && <div>총매출액 :{sum}</div>} */}
          </div>

          <div>
            {/* {orderList.forEach((item: any) => {
              if (item.isDone === true && item.storeId === 1) {
                return (sum2 += item.price);
              }
            })} */}
            {/* {(params.id === '0' || params.id === '1') && <div>스토어1 :{sum2}</div>} */}
          </div>
          <div>
            {/* {orderList.forEach((item: any) => {
              if (item.isDone === true && item.storeId === 2) {
                return (sum3 += item.price);
              }
            })} */}
            {/* {(params.id === '0' || params.id === '2') && <div>스토어2 :{sum3}</div>} */}
            {/* <div style={{ height: '300px', display: 'flex' }}> */}
            {/* <PieAge data={userAgeArr} /> */}
            {/* <PieTime data={orderTimeArr} /> */}
          </div>
        </>
      )}
    </>
  );
};

export default Statistics;
