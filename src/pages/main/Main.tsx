import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useEffect, useState } from 'react';
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
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const getUser = async () => {
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
      setUser(false);
    } else {
      setUser(user);
      console.log(user.id);
      console.log(user.user_metadata);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const logOut = async () => {
    setUser(false);
    alert('로그아웃 되었습니다.');
    const { error } = await supabase.auth.signOut();
  };

  return (
    <>
      <Swiper
        // install Swiper modules
        modules={[Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        pagination={{ clickable: true }}
        // onSwiper={(swiper) => console.log(swiper)}
        // onSlideChange={() => console.log('slide change')}
        autoplay={{ delay: 2000 }}
      >
        <SwiperSlide>
          <img src={'https://i.postimg.cc/mZ3qdZLh/croissant.png'} style={{ width: '100%' }} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={'https://i.postimg.cc/PfMZ39Bd/marabeef.png'} style={{ width: '100%' }} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={'https://i.postimg.cc/J4vRdmZB/vegansand.jpg'} style={{ width: '100%' }} />
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
          <Event>
            EVENT
            <img src={'https://i.postimg.cc/YCHX90m7/event.png'} style={{ width: '100%' }} />
          </Event>
        </SwiperSlide>
      </Swiper>

      {user ? (
        <>
          <QuickOrder onClick={() => logOut()}>로그아웃</QuickOrder>
          <QuickOrder onClick={() => navigate('/mypage')}>마이페이지</QuickOrder>
        </>
      ) : (
        <>
          <QuickOrder onClick={() => navigate('/login')}>로그인</QuickOrder>
          <QuickOrder onClick={() => navigate('/join')}>회원가입</QuickOrder>
        </>
      )}
      <QuickOrder
        onClick={() => {
          navigate('/orderpage');
        }}
      >
        퀵오더
      </QuickOrder>
    </>
  );
};

const QuickOrder = styled.button`
  width: 120px;
  height: 35px;
  display: block;
  font-size: 17px;
  background-color: #b73d52;
  border: none;
  color: white;
  border-radius: 5px;
  margin: 0 auto;
  margin-top: 15px;
  cursor: pointer;
  &:hover {
    background-color: #ffcd7c;
    color: white;
  }
`;

const Event = styled.div`
  align-items: center;
  margin: 0 auto;
  width: 360px;
  margin-top: 10px;
  font-size: 17px;
  font-weight: bold;
`;
export default Main;
