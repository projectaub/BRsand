import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, Autoplay } from 'swiper/modules';

import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import { supabase } from '../../supabase';

const Main = () => {
  const navigate = useNavigate();
  const currentUser = supabase.auth.getUser();
  return (
    <>
      <Swiper
        // install Swiper modules
        modules={[Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        pagination={{ clickable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
        autoplay={{ delay: 2000 }}
      >
        <SwiperSlide>
          <img src={'https://i.postimg.cc/J4vRdmZB/vegansand.jpg'} style={{ width: '360px' }} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={'https://i.postimg.cc/wBKNcX3n/marasand.jpg'} style={{ width: '360px' }} />
        </SwiperSlide>
      </Swiper>
      <Swiper
        // install Swiper modules
        modules={[Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        pagination={{ clickable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
        autoplay={{ delay: 1000 }}
      >
        <SwiperSlide>
          <MenuList>신 메뉴</MenuList>
        </SwiperSlide>
        <SwiperSlide>
          <div>신 메뉴</div>
        </SwiperSlide>
      </Swiper>
      <Swiper
        // install Swiper modules
        modules={[Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        pagination={{ clickable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
      >
        <SwiperSlide>
          <MenuList>인기 메뉴</MenuList>
        </SwiperSlide>
        <SwiperSlide>
          <div>신 메뉴</div>
        </SwiperSlide>
      </Swiper>
      <QuickOrder onClick={() => navigate('/login')}>로그인</QuickOrder>
      <QuickOrder onClick={() => navigate('/join')}>회원가입</QuickOrder>
      <QuickOrder onClick={() => navigate('/orderpage')}>퀵오더</QuickOrder>
    </>
  );
};

const QuickOrder = styled.button`
  width: 120px;
  height: 30px;
`;

const MenuList = styled.div`
  width: 360px;
  height: 150px;
`;
export default Main;
