import { supabase } from '../../supabase';

export const fetchData = async () => {
  const { data } = await supabase.from('orders').select(`isDone=${true}&price`);
  return data;
};
