import { useEffect, useState } from 'react';
import { supabase } from '../../supabase';
import { useNavigate, useParams } from 'react-router-dom';
import PieAge from '../../components/chart/pieChartAge';
import PieTime from '../../components/chart/pieChartTime';
import { useCheckAdmin } from '../../hook/useCheckAdmin';
import { Order } from '../../model';

const Statistics = () => {
  const params = useParams();
  const [orderList, setOrderList] = useState<Order[]>([]);
  const [dataOn] = useCheckAdmin(String(params.id));
  const navigate = useNavigate();

  // arr 이라는 배열을 돌면서 배열안에 들어있는 object를 콘솔로 다찍어주는 for문을 만들어주세요
  const fetchData = async () => {
    if (params.id === '0') {
      const { data } = await supabase.from('orders').select().is('isDone', true);
      setOrderList(data!);
    } else {
      const { data } = await supabase.from('orders').select().eq('storeId', params.id).is('isDone', true);
      setOrderList(data!);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return <>{dataOn && <></>}</>;
};

export default Statistics;
