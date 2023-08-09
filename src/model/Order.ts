import { User } from './User';

export interface Order {
  id: string;
  dineIn: boolean;
  isActive: boolean;
  isDone: boolean;
  orderMenu: any;
  price: number;
  storeId: string;
  time: string;
  user: User;
}
