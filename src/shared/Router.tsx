import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from '../pages/main/Main';
import Join from '../pages/join/Join';
import Login from '../pages/login/Login';
import Mypage from '../pages/mypage/Mypage';
import Orderpage from '../pages/orderpage/Orderpage';
import Orderstatus from '../pages/order status/Orderstatus';
import SalesStatus from '../pages/sales status/SalesStatus';
import InventoryStatus from '../pages/Inventory status/InventoryStatus';
import Statistics from '../pages/statistics/Statistics';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/join" element={<Join />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/orderpage" element={<Orderpage />} />
        <Route path="/orderstatus" element={<Orderstatus />} />
        <Route path="/salesStatus" element={<SalesStatus />} />
        <Route path="/inventorystatus" element={<InventoryStatus />} />
        <Route path="/statistics" element={<Statistics />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
