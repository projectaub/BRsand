export interface User {
  id: number;
  name: string;
  gender: string;
  age: number;
  email: string;
  grade: string;
}
export interface Vegetables {
  tomato: boolean;
  cucumber: boolean;
  lettuce: boolean;
  olive: boolean;
  avocado: boolean;
  onion: boolean;
  jalapenos: boolean;
  paprika: boolean;
}
export interface Sandwich {
  base: Base;
  bread: Bread;
  cheese: Cheese;
  vegetable: Vegetables;
  sauce: Sauce;
}
export enum Cheese {
  mozzarella,
  cheddar,
  gorgonzola
}
export enum Bread {
  white,
  croissant,
  bagel,
  bun
}
export enum Sauce {
  barbecue,
  hotChili,
  Ranch,
  Mara,
  sweetOnion
}
export enum Base {
  chicken,
  vegetableMeat,
  eggMayo,
  beef,
  ham
}
export interface Order {
  id: number;
  StoreId: number;
  dining: boolean; // 매장 / 포장
  user: User;
  time: string;
  orderMenu: OrderMenu;
  isActive: boolean;
  isDone: boolean;
  price: number;
}
export enum OrderMenu {
  Sandwich,
  Menu
}
export enum Menu {
  barbecueChicken,
  ranchVegetable,
  maraBeef,
  sweetOnionHam,
  hotChiliEggMayo
}
//  / //도 셋팅해야됨
// 매장 데이터
export interface StorePoint {
  id: number;
  address: string;
  businessHours: string;
  stock: Stocks;
  isOpen: boolean;
  managerID: string;
  name: string;
  call: string;
}
// stocks
export interface Stocks {
  menuStocks: MenuStocks;
  vegetableStocks: VegetableStocks;
  breadStocks: BreadStocks;
  cheeseStocks: CheeseStocks;
  baseStocks: BaseStocks;
}
export interface MenuStocks {
  barbecueChicken: number;
  ranchVegetable: Number;
  maraBeef: number;
  sweetOnionHam: number;
  hotChiliEggMayo: number;
}
export interface VegetableStocks {
  tomato: number;
  cucumber: number;
  lettuce: number;
  olive: number;
  avocado: number;
  onion: number;
  jalapenos: number;
  paprika: number;
}
export interface BreadStocks {
  white: number;
  croissant: number;
  bagel: number;
  bun: number;
}
export interface CheeseStocks {
  mozzarella: number;
  cheddar: number;
  gorgonzola: number;
}
export interface BaseStocks {
  chicken: number;
  vegetableMeat: number;
  eggMayo: number;
  beef: number;
  ham: number;
}
export interface A {
  name: string;
  image: string;
  price: number;
}
export interface B {
  name: string;
  image: string;
}
